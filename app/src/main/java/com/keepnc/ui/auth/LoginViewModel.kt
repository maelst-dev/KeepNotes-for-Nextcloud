package com.keepnc.ui.auth

import android.net.Uri
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.keepnc.data.auth.Credentials
import com.keepnc.data.auth.LoginDeepLinkParser
import com.keepnc.data.auth.LoginFlowService
import com.keepnc.data.auth.TokenStorage
import com.keepnc.data.remote.ServerUrlUtils
import com.keepnc.data.repository.NotesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.concurrent.TimeoutException
import javax.inject.Inject

/**
 * ViewModel for [LoginActivity].
 *
 * Survives configuration changes (screen rotations) and process death via [SavedStateHandle] —
 * if the user switches to the browser and the system frees background memory, polling state
 * is safely restored upon return.
 */
@HiltViewModel
class LoginViewModel @Inject constructor(
    private val loginFlowService: LoginFlowService,
    private val tokenStorage: TokenStorage,
    private val repository: NotesRepository,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val _loginState = MutableStateFlow<LoginState>(LoginState.Idle)
    val loginState: StateFlow<LoginState> = _loginState.asStateFlow()

    private var loginFlowJob: Job? = null
    private var pollingJob: Job? = null
    private val pollTriggerChannel = Channel<Unit>(Channel.CONFLATED)

    init {
        val isPolling = savedStateHandle.get<Boolean>(KEY_IS_POLLING) == true
        val loginUrl = savedStateHandle.get<String>(KEY_LOGIN_URL)
        val serverUrl = savedStateHandle.get<String>(KEY_CURRENT_SERVER_URL)
        val endpoint = savedStateHandle.get<String>(KEY_POLL_ENDPOINT)
        val token = savedStateHandle.get<String>(KEY_POLL_TOKEN)

        if (isPolling && !loginUrl.isNullOrBlank() && !serverUrl.isNullOrBlank() && !endpoint.isNullOrBlank() && !token.isNullOrBlank()) {
            _loginState.value = LoginState.WaitingForAuthorization(loginUrl)
            startPolling(serverUrl, endpoint, token)
        }
    }

    fun isLoggedIn(): Boolean = tokenStorage.isLoggedIn()

    /**
     * Kicks off the Login Flow v2 sequence.
     */
    fun startLoginFlow(rawUrl: String) {
        val serverUrl = ServerUrlUtils.normalizeServerUrl(rawUrl)
        if (serverUrl.isBlank()) {
            _loginState.value = LoginState.Error(messageRes = com.keepnc.R.string.login_error_empty_url)
            return
        }
        if (!serverUrl.startsWith("http://") && !serverUrl.startsWith("https://")) {
            _loginState.value = LoginState.Error(messageRes = com.keepnc.R.string.login_error_invalid_url)
            return
        }

        loginFlowJob?.cancel()
        pollingJob?.cancel()
        clearPollingState()

        loginFlowJob = viewModelScope.launch {
            try {
                _loginState.value = LoginState.Loading

                // Step 1: Ask the server to start the flow
                val flowResponse = loginFlowService.initiateLoginFlow(serverUrl)

                // Reconcile URLs to preserve subpaths and scheme
                val reconciledLoginUrl = ServerUrlUtils.reconcileUrl(serverUrl, flowResponse.login)
                val reconciledPollEndpoint = ServerUrlUtils.reconcileUrl(serverUrl, flowResponse.poll.endpoint)

                // Save parameters in SavedStateHandle for process restoration
                savedStateHandle[KEY_CURRENT_SERVER_URL] = serverUrl
                savedStateHandle[KEY_LOGIN_URL] = reconciledLoginUrl
                savedStateHandle[KEY_POLL_ENDPOINT] = reconciledPollEndpoint
                savedStateHandle[KEY_POLL_TOKEN] = flowResponse.poll.token
                savedStateHandle[KEY_IS_POLLING] = true

                // Step 2: Signal the UI to open browser & wait for approval
                _loginState.value = LoginState.WaitingForAuthorization(reconciledLoginUrl)

                // Step 3: Start polling in background
                startPolling(serverUrl, reconciledPollEndpoint, flowResponse.poll.token)

            } catch (e: CancellationException) {
                // Job was cancelled by user
            } catch (e: Exception) {
                clearPollingState()
                _loginState.value = LoginState.Error(message = e.message)
            }
        }
    }

    private fun startPolling(serverUrl: String, endpoint: String, token: String) {
        pollingJob?.cancel()
        pollingJob = viewModelScope.launch {
            try {
                val creds = loginFlowService.pollForCredentials(
                    endpoint = endpoint,
                    token = token,
                    pollTriggerChannel = pollTriggerChannel
                )

                completeLogin(
                    trustedServerUrl = serverUrl,
                    returnedServerUrl = creds.server,
                    loginName = creds.loginName,
                    appPassword = creds.appPassword
                )
            } catch (e: TimeoutException) {
                clearPollingState()
                _loginState.value = LoginState.Error(messageRes = com.keepnc.R.string.login_error_timeout)
            } catch (e: CancellationException) {
                // Expected when job cancelled or deep link intercepted
            } catch (e: Exception) {
                clearPollingState()
                _loginState.value = LoginState.Error(message = e.message)
            }
        }
    }

    private suspend fun completeLogin(
        trustedServerUrl: String,
        returnedServerUrl: String,
        loginName: String,
        appPassword: String
    ) {
        // Reconcile server URLs to prevent subpath loss behind reverse proxies
        val finalServerUrl = ServerUrlUtils.reconcileUrl(trustedServerUrl, returnedServerUrl)
        val saved = tokenStorage.saveCredentials(
            Credentials(
                serverUrl = finalServerUrl,
                loginName = loginName,
                appPassword = appPassword
            )
        )
        if (!saved) {
            clearPollingState()
            _loginState.value = LoginState.Error(messageRes = com.keepnc.R.string.login_error_save_credentials)
            return
        }

        // Clean slate for the new session before initial sync
        repository.clearAllLocalNotes()

        clearPollingState()
        _loginState.value = LoginState.Success
    }

    /**
     * Called when [LoginActivity] resumes (user returns from browser).
     * Wakes up the polling loop immediately so credentials can be received without delay.
     */
    fun onActivityResumed() {
        val isPolling = savedStateHandle.get<Boolean>(KEY_IS_POLLING) == true
        if (isPolling) {
            if (pollingJob?.isActive != true) {
                val serverUrl = savedStateHandle.get<String>(KEY_CURRENT_SERVER_URL)
                val endpoint = savedStateHandle.get<String>(KEY_POLL_ENDPOINT)
                val token = savedStateHandle.get<String>(KEY_POLL_TOKEN)
                if (!serverUrl.isNullOrBlank() && !endpoint.isNullOrBlank() && !token.isNullOrBlank()) {
                    startPolling(serverUrl, endpoint, token)
                }
            } else {
                pollTriggerChannel.trySend(Unit)
            }
        }
    }

    /**
     * Manually triggers an immediate poll attempt.
     */
    fun checkAuthorizationNow() {
        pollTriggerChannel.trySend(Unit)
    }

    /**
     * Attempts to handle credentials from a deep link string (e.g. `nc://login/...`).
     * Returns true if deep link contained valid credentials and login succeeded.
     */
    fun handleDeepLink(uriString: String?): Boolean {
        val creds = LoginDeepLinkParser.parse(uriString) ?: return false
        val trustedUrl = savedStateHandle.get<String>(KEY_CURRENT_SERVER_URL) ?: creds.serverUrl

        loginFlowJob?.cancel()
        pollingJob?.cancel()
        viewModelScope.launch {
            try {
                completeLogin(
                    trustedServerUrl = trustedUrl,
                    returnedServerUrl = creds.serverUrl,
                    loginName = creds.loginName,
                    appPassword = creds.appPassword
                )
            } catch (e: CancellationException) {
                // Expected when job cancelled
            } catch (e: Exception) {
                clearPollingState()
                _loginState.value = LoginState.Error(message = e.message)
            }
        }
        return true
    }

    /**
     * Overload for Android [Uri] instances.
     */
    fun handleDeepLink(uri: Uri?): Boolean = handleDeepLink(uri?.toString())

    /**
     * Cancels the active login flow and returns to idle.
     */
    fun cancelLoginFlow() {
        loginFlowJob?.cancel()
        pollingJob?.cancel()
        clearPollingState()
        _loginState.value = LoginState.Idle
    }

    private fun clearPollingState() {
        savedStateHandle[KEY_IS_POLLING] = false
        savedStateHandle[KEY_CURRENT_SERVER_URL] = null
        savedStateHandle[KEY_LOGIN_URL] = null
        savedStateHandle[KEY_POLL_ENDPOINT] = null
        savedStateHandle[KEY_POLL_TOKEN] = null
    }

    override fun onCleared() {
        super.onCleared()
        loginFlowJob?.cancel()
        pollingJob?.cancel()
        pollTriggerChannel.close()
    }

    companion object {
        private const val KEY_CURRENT_SERVER_URL = "login_current_server_url"
        private const val KEY_LOGIN_URL = "login_url"
        private const val KEY_POLL_ENDPOINT = "login_poll_endpoint"
        private const val KEY_POLL_TOKEN = "login_poll_token"
        private const val KEY_IS_POLLING = "login_is_polling"
    }
}
