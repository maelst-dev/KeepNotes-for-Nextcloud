package com.keepnc.ui.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.net.toUri
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.google.android.material.snackbar.Snackbar
import com.keepnc.R
import com.keepnc.databinding.ActivityLoginBinding
import com.keepnc.ui.MainActivity
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

/**
 * Entry point for authentication.
 *
 * If the user is already logged in, skip straight to [MainActivity].
 * Otherwise, show a server URL field and launch Login Flow v2 in a Custom Tab.
 *
 * Features:
 * - Active background polling that survives temporary network drop or app hiding
 * - Instant poll wake-up on [onResume] when returning from the browser
 * - Nextcloud deep link handling (`nc://login/...`)
 * - Manual fallback buttons (Check authorization, Reopen browser, Cancel)
 */
@AndroidEntryPoint
class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private val viewModel: LoginViewModel by viewModels()

    /** Tracks the last opened URL to prevent re-opening Custom Tabs on every lifecycle resume. */
    private var lastLaunchedLoginUrl: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // If already authenticated, go directly to the main screen
        if (viewModel.isLoggedIn()) {
            startMainActivity()
            return
        }

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupClickListeners()
        observeLoginState()

        handleDeepLinkIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleDeepLinkIntent(intent)
    }

    override fun onResume() {
        super.onResume()
        viewModel.onActivityResumed()
    }

    private fun handleDeepLinkIntent(intent: Intent?) {
        val dataString = intent?.dataString
        if (!dataString.isNullOrBlank() && dataString.startsWith("nc://login", ignoreCase = true)) {
            viewModel.handleDeepLink(dataString)
        }
    }

    private fun setupClickListeners() {
        binding.btnLogin.setOnClickListener {
            val url = binding.etServerUrl.text?.toString()?.trim() ?: ""
            viewModel.startLoginFlow(url)
        }

        binding.btnCheckAuth.setOnClickListener {
            viewModel.checkAuthorizationNow()
        }

        binding.btnReopenBrowser.setOnClickListener {
            lastLaunchedLoginUrl?.let { url ->
                openInCustomTab(url)
            }
        }

        binding.btnCancelLogin.setOnClickListener {
            lastLaunchedLoginUrl = null
            viewModel.cancelLoginFlow()
        }
    }

    private fun observeLoginState() {
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.loginState.collect { state ->
                    handleLoginState(state)
                }
            }
        }
    }

    private fun handleLoginState(state: LoginState) {
        // Reset visibility to base defaults
        binding.progressBar.visibility = View.GONE
        binding.tvStatus.visibility = View.GONE
        binding.layoutWaitingActions.visibility = View.GONE
        binding.tilServerUrl.isEnabled = true
        binding.btnLogin.visibility = View.VISIBLE
        binding.btnLogin.isEnabled = true

        when (state) {
            is LoginState.Idle -> {
                lastLaunchedLoginUrl = null
            }

            is LoginState.Loading -> {
                binding.progressBar.visibility = View.VISIBLE
                binding.tilServerUrl.isEnabled = false
                binding.btnLogin.isEnabled = false
            }

            is LoginState.WaitingForAuthorization -> {
                binding.tvStatus.visibility = View.VISIBLE
                binding.tvStatus.text = getString(R.string.login_waiting)
                binding.progressBar.visibility = View.VISIBLE
                binding.layoutWaitingActions.visibility = View.VISIBLE
                binding.tilServerUrl.isEnabled = false
                binding.btnLogin.visibility = View.GONE

                // Only launch Custom Tab once per URL to avoid re-opening on every resume
                if (lastLaunchedLoginUrl != state.loginUrl) {
                    lastLaunchedLoginUrl = state.loginUrl
                    openInCustomTab(state.loginUrl)
                }
            }

            is LoginState.Success -> {
                lastLaunchedLoginUrl = null
                startMainActivity()
            }

            is LoginState.Error -> {
                lastLaunchedLoginUrl = null
                val text = if (state.messageRes != null) {
                    getString(state.messageRes)
                } else {
                    state.message ?: getString(R.string.error_generic)
                }
                Snackbar.make(binding.root, text, Snackbar.LENGTH_LONG).show()
            }
        }
    }

    private fun openInCustomTab(url: String) {
        CustomTabsIntent.Builder()
            .setShowTitle(true)
            .build()
            .launchUrl(this, url.toUri())
    }

    private fun startMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
