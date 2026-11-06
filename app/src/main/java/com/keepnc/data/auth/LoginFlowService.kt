package com.keepnc.data.auth

import androidx.annotation.Keep
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException
import java.util.concurrent.TimeoutException
import javax.inject.Inject

// ---------------------------------------------------------------------------
// DTOs for Login Flow v2
// ---------------------------------------------------------------------------

/**
 * Response from POST /index.php/login/v2.
 * [login] — URL to open in the browser so the user can authorise the app.
 * [poll]  — polling info: keep POSTing to [poll.endpoint] with [poll.token]
 *            until credentials arrive.
 */
@Keep
data class LoginFlowInitResponse(
    @SerializedName("poll") val poll: PollData = PollData(),
    @SerializedName("login") val login: String = ""
)

@Keep
data class PollData(
    @SerializedName("token") val token: String = "",
    @SerializedName("endpoint") val endpoint: String = ""
)

/**
 * Credential payload returned after the user approves the app in the browser.
 * [server]      — Nextcloud server URL
 * [loginName]   — username
 * [appPassword] — app-specific password (NOT the user's main password)
 */
@Keep
data class LoginFlowCredentialsResponse(
    @SerializedName("server") val server: String = "",
    @SerializedName("loginName") val loginName: String = "",
    @SerializedName("appPassword") val appPassword: String = ""
)

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Implements Nextcloud Login Flow v2.
 *
 * How it works:
 * 1. POST to {serverUrl}/index.php/login/v2 → get a browser URL + poll info
 * 2. Open the browser URL (handled by LoginActivity via Custom Tab)
 * 3. Keep POSTing to poll.endpoint every 2 seconds until the user approves
 * 4. On approval: receive {server, loginName, appPassword} → save to TokenStorage
 *
 * This service uses an UNAUTHENTICATED OkHttpClient — it doesn't attach any
 * auth headers because we don't have credentials yet at this stage.
 *
 * Reference: https://docs.nextcloud.com/server/latest/developer_manual/client_apis/LoginFlow/index.html
 */
open class LoginFlowService(
    private val httpClient: OkHttpClient,
    private val gson: Gson
) {
    /**
     * Step 1: Initiate the login flow.
     *
     * POSTs to the server and returns the browser URL + polling data.
     * Throws an exception if the server is unreachable or returns an error.
     */
    open suspend fun initiateLoginFlow(serverUrl: String): LoginFlowInitResponse =
        withContext(Dispatchers.IO) {
            val cleanUrl = com.keepnc.data.remote.ServerUrlUtils.normalizeServerUrl(serverUrl)
            val url = "$cleanUrl/index.php/login/v2"
            // POST with empty body — the server only needs the endpoint hit
            val request = Request.Builder()
                .url(url)
                .post(FormBody.Builder().build())
                .build()

            val responseBody = httpClient.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    throw IllegalStateException("Server returned ${response.code}: ${response.message}")
                }
                response.body?.string() ?: throw IllegalStateException("Empty response from server")
            }

            gson.fromJson(responseBody, LoginFlowInitResponse::class.java)
        }

    /**
     * Step 3: Poll for credentials.
     *
     * Keeps POSTing to [endpoint] with the [token] in the form body.
     * - 200 → credentials ready, validate and return
     * - 404 → user hasn't approved yet, wait [pollIntervalMs] and retry
     * - 429 → rate limited, backoff for 5s and retry
     * - 5xx → temporary gateway/server hiccup, backoff for 3s and retry
     * - [IOException] → network dropped or background app network throttled (GrapheneOS/AOSP), retry without aborting
     * - [pollTriggerChannel] → optional signal to immediately wake up and query without waiting
     * - 5-minute timeout → throw [TimeoutException]
     */
    open suspend fun pollForCredentials(
        endpoint: String,
        token: String,
        pollTriggerChannel: Channel<Unit>? = null,
        timeoutMs: Long = 5 * 60 * 1000L,
        pollIntervalMs: Long = 2000L
    ): LoginFlowCredentialsResponse {
        val formBody = FormBody.Builder()
            .add("token", token)
            .build()

        val startTime = System.currentTimeMillis()

        while (currentCoroutineContext().isActive) {
            if (System.currentTimeMillis() - startTime > timeoutMs) {
                throw TimeoutException("Login timed out after ${timeoutMs / 1000} seconds")
            }

            val request = Request.Builder()
                .url(endpoint)
                .post(formBody)
                .build()

            var code: Int? = null
            var body: String? = null
            var networkException: IOException? = null

            try {
                // Each HTTP call is blocking — switch to IO for the duration of execute()
                withContext(Dispatchers.IO) {
                    httpClient.newCall(request).execute().use { response ->
                        code = response.code
                        body = response.body?.string()
                    }
                }
            } catch (e: IOException) {
                networkException = e
            }

            when {
                networkException != null -> {
                    // Do not abort loop on temporary network loss. Wait and retry.
                    waitForNextPoll(pollTriggerChannel, pollIntervalMs)
                }
                code == 200 && !body.isNullOrBlank() -> {
                    val creds = try {
                        gson.fromJson(body, LoginFlowCredentialsResponse::class.java)
                    } catch (e: Exception) {
                        null
                    }
                    if (creds != null && creds.loginName.isNotBlank() && creds.appPassword.isNotBlank()) {
                        return creds
                    } else {
                        // Received 200 but payload is not yet full credentials; wait and retry
                        waitForNextPoll(pollTriggerChannel, pollIntervalMs)
                    }
                }
                code == 404 -> {
                    // User hasn't approved yet — wait interval and retry
                    waitForNextPoll(pollTriggerChannel, pollIntervalMs)
                }
                code == 429 -> {
                    // Rate limited: backoff for 5s
                    waitForNextPoll(pollTriggerChannel, 5000L)
                }
                code != null && code in 500..599 -> {
                    // Gateway or server temporary hiccup: retry after 3s
                    waitForNextPoll(pollTriggerChannel, 3000L)
                }
                else -> {
                    throw IllegalStateException("Unexpected poll response: $code")
                }
            }
        }

        throw CancellationException("Polling cancelled")
    }

    private suspend fun waitForNextPoll(
        trigger: Channel<Unit>?,
        delayMs: Long
    ) {
        if (trigger != null) {
            // Wait up to delayMs, or resume immediately if trigger was signaled
            withTimeoutOrNull(delayMs) {
                trigger.receive()
            }
        } else {
            delay(delayMs)
        }
    }
}
