package com.keepnc.data.auth

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import dagger.hilt.android.qualifiers.ApplicationContext
import java.security.KeyStore
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Persists Nextcloud credentials securely using EncryptedSharedPreferences (AES-256-GCM).
 *
 * BEGINNER NOTE: Never store passwords in plain SharedPreferences — they're readable
 * by anyone with a rooted device or ADB backup. EncryptedSharedPreferences encrypts
 * both the keys and values using the Android Keystore.
 *
 * Fault Tolerance & Self-Healing (Android 12 / Samsung Knox fixes):
 * - Automatically recovers from corrupted Keystore aliases / orphaned master keys.
 * - Falls back gracefully to app-private storage if hardware Keystore is unavailable.
 * - Guarantees synchronous disk writes via [SharedPreferences.Editor.commit].
 *
 * This class is a @Singleton — one instance shared across the whole app lifetime.
 */
@Singleton
open class TokenStorage {
    private val context: Context?
    private val injectedPrefs: SharedPreferences?

    @Inject
    constructor(@ApplicationContext context: Context) {
        this.context = context
        this.injectedPrefs = null
    }

    /** Constructor for unit testing without Android Context */
    constructor(sharedPreferences: SharedPreferences? = null) {
        this.context = null
        this.injectedPrefs = sharedPreferences
    }

    // Lazy initialization so the Keystore isn't accessed until first use.
    private val prefs: SharedPreferences by lazy {
        injectedPrefs ?: run {
            val ctx = checkNotNull(context) { "Context is required for SharedPreferences access" }
            getOrCreatePrefs(ctx)
        }
    }

    private fun getOrCreatePrefs(ctx: Context): SharedPreferences {
        // Step 1: Attempt standard EncryptedSharedPreferences creation
        try {
            return createEncryptedPrefs(ctx)
        } catch (e: Exception) {
            Log.w(TAG, "Failed to create EncryptedSharedPreferences, attempting recovery...", e)
        }

        // Step 2: Self-healing recovery for Samsung Galaxy / Android 12 Keystore corruption
        try {
            recoverFromKeystoreCorruption(ctx)
            return createEncryptedPrefs(ctx)
        } catch (e: Exception) {
            Log.e(TAG, "Recovery of EncryptedSharedPreferences failed, falling back to app-private storage", e)
        }

        // Step 3: Reliable fallback when hardware Keystore is completely broken on device
        return getFallbackPrefs(ctx)
    }

    private fun createEncryptedPrefs(ctx: Context): SharedPreferences {
        val masterKey = MasterKey.Builder(ctx)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        return EncryptedSharedPreferences.create(
            ctx,
            PREFS_NAME,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    private fun recoverFromKeystoreCorruption(ctx: Context) {
        // 1. Wipe and delete corrupted preferences file
        try {
            ctx.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit().clear().commit()
        } catch (e: Exception) {
            Log.w(TAG, "Failed to clear corrupted prefs file: ${e.message}")
        }
        try {
            ctx.deleteSharedPreferences(PREFS_NAME)
        } catch (e: Exception) {
            Log.w(TAG, "Failed to delete corrupted prefs file: ${e.message}")
        }

        // 2. Clear corrupted master key alias from AndroidKeyStore
        try {
            val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
            val alias = MasterKey.DEFAULT_MASTER_KEY_ALIAS
            if (keyStore.containsAlias(alias)) {
                keyStore.deleteEntry(alias)
                Log.i(TAG, "Deleted corrupted master key alias '$alias' from AndroidKeyStore")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to delete corrupted master key from Keystore", e)
        }
    }

    private fun getFallbackPrefs(ctx: Context): SharedPreferences {
        return ctx.getSharedPreferences(FALLBACK_PREFS_NAME, Context.MODE_PRIVATE)
    }

    open fun saveCredentials(credentials: Credentials): Boolean {
        return try {
            val success = prefs.edit()
                .putString(KEY_SERVER_URL, credentials.serverUrl)
                .putString(KEY_LOGIN_NAME, credentials.loginName)
                .putString(KEY_APP_PASSWORD, credentials.appPassword)
                .commit()

            if (success) {
                // If saved successfully to primary prefs, clear any stale fallback credentials
                context?.let { ctx ->
                    try {
                        ctx.getSharedPreferences(FALLBACK_PREFS_NAME, Context.MODE_PRIVATE)
                            .edit().clear().commit()
                    } catch (_: Exception) {}
                }
            } else {
                Log.e(TAG, "Failed to commit credentials to disk")
            }
            success
        } catch (e: Exception) {
            Log.e(TAG, "Exception saving credentials", e)
            false
        }
    }

    open fun getCredentials(): Credentials? {
        val primary = try {
            val serverUrl = prefs.getString(KEY_SERVER_URL, null)
            val loginName = prefs.getString(KEY_LOGIN_NAME, null)
            val appPassword = prefs.getString(KEY_APP_PASSWORD, null)
            if (serverUrl != null && loginName != null && appPassword != null) {
                Credentials(serverUrl, loginName, appPassword)
            } else {
                null
            }
        } catch (e: Exception) {
            Log.e(TAG, "Exception reading credentials from primary prefs", e)
            null
        }

        if (primary != null) return primary

        // Check fallback preferences if context is available and primary was empty/failed
        return context?.let { ctx ->
            try {
                val fallback = ctx.getSharedPreferences(FALLBACK_PREFS_NAME, Context.MODE_PRIVATE)
                val serverUrl = fallback.getString(KEY_SERVER_URL, null)
                val loginName = fallback.getString(KEY_LOGIN_NAME, null)
                val appPassword = fallback.getString(KEY_APP_PASSWORD, null)
                if (serverUrl != null && loginName != null && appPassword != null) {
                    Credentials(serverUrl, loginName, appPassword)
                } else null
            } catch (e: Exception) {
                Log.e(TAG, "Exception reading credentials from fallback prefs", e)
                null
            }
        }
    }

    open fun getServerUrl(): String? {
        val primaryUrl = try {
            prefs.getString(KEY_SERVER_URL, null)
        } catch (e: Exception) {
            Log.e(TAG, "Exception reading server URL from primary prefs", e)
            null
        }

        if (!primaryUrl.isNullOrBlank()) return primaryUrl

        return context?.let { ctx ->
            try {
                ctx.getSharedPreferences(FALLBACK_PREFS_NAME, Context.MODE_PRIVATE)
                    .getString(KEY_SERVER_URL, null)
            } catch (_: Exception) {
                null
            }
        }
    }

    open fun isLoggedIn(): Boolean = getCredentials() != null

    /** Wipe all stored credentials (logout). */
    open fun clearCredentials(): Boolean {
        var success = true
        try {
            if (!prefs.edit().clear().commit()) {
                success = false
            }
        } catch (e: Exception) {
            Log.e(TAG, "Exception clearing primary credentials", e)
            success = false
        }

        context?.let { ctx ->
            try {
                ctx.getSharedPreferences(FALLBACK_PREFS_NAME, Context.MODE_PRIVATE)
                    .edit().clear().commit()
            } catch (e: Exception) {
                Log.e(TAG, "Exception clearing fallback credentials", e)
            }
        }
        return success
    }

    companion object {
        private const val TAG = "TokenStorage"
        private const val PREFS_NAME = "keepnc_secure_prefs"
        private const val FALLBACK_PREFS_NAME = "keepnc_fallback_prefs"
        private const val KEY_SERVER_URL = "server_url"
        private const val KEY_LOGIN_NAME = "login_name"
        private const val KEY_APP_PASSWORD = "app_password"
    }
}
