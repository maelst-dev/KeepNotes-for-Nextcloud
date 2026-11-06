package com.keepnc.data.auth

import com.google.gson.Gson
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Protocol
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.fail
import org.junit.Test
import java.io.IOException
import java.util.concurrent.TimeoutException
import java.util.concurrent.atomic.AtomicInteger

@OptIn(ExperimentalCoroutinesApi::class)
class LoginFlowServiceTest {

    private val gson = Gson()
    private val testDispatcher = StandardTestDispatcher()

    private fun createMockClient(handler: (requestCount: Int) -> Response): OkHttpClient {
        val count = AtomicInteger(0)
        val interceptor = Interceptor { chain ->
            val reqNumber = count.incrementAndGet()
            handler(reqNumber)
        }
        return OkHttpClient.Builder()
            .addInterceptor(interceptor)
            .build()
    }

    private fun jsonResponse(chain: Interceptor.Chain, code: Int, json: String): Response {
        return Response.Builder()
            .request(chain.request())
            .protocol(Protocol.HTTP_1_1)
            .code(code)
            .message("Status $code")
            .body(json.toResponseBody("application/json".toMediaType()))
            .build()
    }

    @Test
    fun `pollForCredentials returns credentials on 200 OK`() = runTest {
        val interceptor = Interceptor { chain ->
            jsonResponse(
                chain,
                200,
                """{"server":"https://cloud.example.com","loginName":"alice","appPassword":"token-123"}"""
            )
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        val creds = service.pollForCredentials("https://cloud.example.com/poll", "test-token")

        assertNotNull(creds)
        assertEquals("https://cloud.example.com", creds.server)
        assertEquals("alice", creds.loginName)
        assertEquals("token-123", creds.appPassword)
    }

    @Test
    fun `pollForCredentials survives IOException and recovers on next attempt`() = runTest {
        val attempts = AtomicInteger(0)
        val interceptor = Interceptor { chain ->
            val count = attempts.incrementAndGet()
            if (count == 1) {
                // Simulate background network disconnection on GrapheneOS/AOSP
                throw IOException("Network is unreachable")
            } else {
                jsonResponse(
                    chain,
                    200,
                    """{"server":"https://cloud.example.com","loginName":"bob","appPassword":"token-456"}"""
                )
            }
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        val creds = service.pollForCredentials(
            endpoint = "https://cloud.example.com/poll",
            token = "test-token",
            pollIntervalMs = 100L
        )

        assertEquals("bob", creds.loginName)
        assertEquals(2, attempts.get())
    }

    @Test
    fun `pollForCredentials handles 404 pending status and returns when approved`() = runTest {
        val attempts = AtomicInteger(0)
        val interceptor = Interceptor { chain ->
            val count = attempts.incrementAndGet()
            if (count <= 2) {
                jsonResponse(chain, 404, "")
            } else {
                jsonResponse(
                    chain,
                    200,
                    """{"server":"https://cloud.example.com","loginName":"carol","appPassword":"token-789"}"""
                )
            }
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        val creds = service.pollForCredentials(
            endpoint = "https://cloud.example.com/poll",
            token = "test-token",
            pollIntervalMs = 50L
        )

        assertEquals("carol", creds.loginName)
        assertEquals(3, attempts.get())
    }

    @Test
    fun `pollForCredentials handles 429 and 503 without terminating`() = runTest {
        val attempts = AtomicInteger(0)
        val interceptor = Interceptor { chain ->
            when (attempts.incrementAndGet()) {
                1 -> jsonResponse(chain, 429, "") // Rate limited
                2 -> jsonResponse(chain, 503, "") // Server hiccup
                else -> jsonResponse(
                    chain,
                    200,
                    """{"server":"https://cloud.example.com","loginName":"dave","appPassword":"token-000"}"""
                )
            }
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        val creds = service.pollForCredentials(
            endpoint = "https://cloud.example.com/poll",
            token = "test-token",
            pollIntervalMs = 50L
        )

        assertEquals("dave", creds.loginName)
        assertEquals(3, attempts.get())
    }

    @Test
    fun `pollForCredentials wakes up immediately when pollTriggerChannel is signaled`() = runTest {
        val trigger = Channel<Unit>(Channel.CONFLATED)
        val attempts = AtomicInteger(0)
        val interceptor = Interceptor { chain ->
            val count = attempts.incrementAndGet()
            if (count == 1) {
                jsonResponse(chain, 404, "")
            } else {
                jsonResponse(
                    chain,
                    200,
                    """{"server":"https://cloud.example.com","loginName":"eve","appPassword":"pass"}"""
                )
            }
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        // Poll interval set to 1 hour (3600_000ms), but trigger should wake it up in 0ms
        val job = launch {
            service.pollForCredentials(
                endpoint = "https://cloud.example.com/poll",
                token = "test-token",
                pollTriggerChannel = trigger,
                pollIntervalMs = 3600_000L
            )
        }

        // Trigger onResume-style signal
        trigger.trySend(Unit)
        job.join()

        assertEquals(2, attempts.get())
    }

    @Test
    fun `pollForCredentials throws TimeoutException when timeout exceeded`() = runTest {
        val interceptor = Interceptor { chain ->
            jsonResponse(chain, 404, "")
        }
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()
        val service = LoginFlowService(client, gson)

        try {
            service.pollForCredentials(
                endpoint = "https://cloud.example.com/poll",
                token = "test-token",
                timeoutMs = 100L,
                pollIntervalMs = 50L
            )
            fail("Expected TimeoutException")
        } catch (e: TimeoutException) {
            // Expected
        }
    }
}
