package com.keepnc.data.auth

import android.content.SharedPreferences
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class TokenStorageTest {

    private lateinit var fakePrefs: FakeSharedPreferences
    private lateinit var tokenStorage: TokenStorage

    @Before
    fun setUp() {
        fakePrefs = FakeSharedPreferences()
        tokenStorage = TokenStorage(fakePrefs)
    }

    @Test
    fun `saveCredentials persists credentials synchronously with commit and returns true`() {
        val creds = Credentials(
            serverUrl = "https://cloud.example.com",
            loginName = "user_test",
            appPassword = "password_123"
        )

        val result = tokenStorage.saveCredentials(creds)

        assertTrue(result)
        assertEquals("https://cloud.example.com", fakePrefs.getString("server_url", null))
        assertEquals("user_test", fakePrefs.getString("login_name", null))
        assertEquals("password_123", fakePrefs.getString("app_password", null))
        assertTrue(fakePrefs.lastEditorCommitCalled)
    }

    @Test
    fun `getCredentials returns correct Credentials when all fields exist`() {
        fakePrefs.putString("server_url", "https://cloud.example.com")
        fakePrefs.putString("login_name", "user_test")
        fakePrefs.putString("app_password", "password_123")

        val creds = tokenStorage.getCredentials()

        assertNotNull(creds)
        assertEquals("https://cloud.example.com", creds?.serverUrl)
        assertEquals("user_test", creds?.loginName)
        assertEquals("password_123", creds?.appPassword)
    }

    @Test
    fun `getCredentials returns null when any required field is missing`() {
        // Missing app_password
        fakePrefs.putString("server_url", "https://cloud.example.com")
        fakePrefs.putString("login_name", "user_test")
        assertNull(tokenStorage.getCredentials())

        // Missing login_name
        fakePrefs.clear()
        fakePrefs.putString("server_url", "https://cloud.example.com")
        fakePrefs.putString("app_password", "password_123")
        assertNull(tokenStorage.getCredentials())

        // Missing server_url
        fakePrefs.clear()
        fakePrefs.putString("login_name", "user_test")
        fakePrefs.putString("app_password", "password_123")
        assertNull(tokenStorage.getCredentials())
    }

    @Test
    fun `isLoggedIn returns true only when full credentials exist`() {
        assertFalse(tokenStorage.isLoggedIn())

        tokenStorage.saveCredentials(
            Credentials("https://cloud.example.com", "user", "pass")
        )
        assertTrue(tokenStorage.isLoggedIn())

        fakePrefs.remove("app_password")
        assertFalse(tokenStorage.isLoggedIn())
    }

    @Test
    fun `getServerUrl returns server URL or null`() {
        assertNull(tokenStorage.getServerUrl())

        tokenStorage.saveCredentials(
            Credentials("https://cloud.example.com/subfolder", "user", "pass")
        )
        assertEquals("https://cloud.example.com/subfolder", tokenStorage.getServerUrl())
    }

    @Test
    fun `clearCredentials removes all stored data and returns true`() {
        tokenStorage.saveCredentials(
            Credentials("https://cloud.example.com", "user", "pass")
        )
        assertTrue(tokenStorage.isLoggedIn())

        val result = tokenStorage.clearCredentials()

        assertTrue(result)
        assertFalse(tokenStorage.isLoggedIn())
        assertNull(tokenStorage.getCredentials())
        assertNull(tokenStorage.getServerUrl())
        assertTrue(fakePrefs.getAll().isEmpty())
    }

    @Test
    fun `saveCredentials handles exception gracefully and returns false`() {
        fakePrefs.throwOnCommit = RuntimeException("Keystore encryption failure")

        val result = tokenStorage.saveCredentials(
            Credentials("https://cloud.example.com", "user", "pass")
        )

        assertFalse(result)
    }

    @Test
    fun `getCredentials handles exception gracefully and returns null`() {
        fakePrefs.throwOnGetString = SecurityException("UnrecoverableKeyException / AEADBadTagException")

        val creds = tokenStorage.getCredentials()

        assertNull(creds)
        assertFalse(tokenStorage.isLoggedIn())
    }

    @Test
    fun `getServerUrl handles exception gracefully and returns null`() {
        fakePrefs.throwOnGetString = SecurityException("Keystore key corrupted")

        val url = tokenStorage.getServerUrl()

        assertNull(url)
    }

    @Test
    fun `clearCredentials handles exception gracefully and returns false`() {
        fakePrefs.throwOnCommit = RuntimeException("Disk write error")

        val result = tokenStorage.clearCredentials()

        assertFalse(result)
    }

    private class FakeSharedPreferences : SharedPreferences {
        private val values = mutableMapOf<String, Any?>()
        var throwOnGetString: RuntimeException? = null
        var throwOnCommit: RuntimeException? = null
        var lastEditorCommitCalled = false

        fun putString(key: String, value: String) {
            values[key] = value
        }

        fun remove(key: String) {
            values.remove(key)
        }

        fun clear() {
            values.clear()
        }

        override fun getAll(): Map<String, *> = values

        override fun getString(key: String, defValue: String?): String? {
            throwOnGetString?.let { throw it }
            return values[key] as? String ?: defValue
        }

        @Suppress("UNCHECKED_CAST")
        override fun getStringSet(key: String, defValues: Set<String>?): Set<String>? =
            values[key] as? Set<String> ?: defValues

        override fun getInt(key: String, defValue: Int): Int = values[key] as? Int ?: defValue
        override fun getLong(key: String, defValue: Long): Long = values[key] as? Long ?: defValue
        override fun getFloat(key: String, defValue: Float): Float = values[key] as? Float ?: defValue
        override fun getBoolean(key: String, defValue: Boolean): Boolean = values[key] as? Boolean ?: defValue
        override fun contains(key: String): Boolean = values.containsKey(key)

        override fun edit(): SharedPreferences.Editor = FakeEditor(values, this)

        override fun registerOnSharedPreferenceChangeListener(listener: SharedPreferences.OnSharedPreferenceChangeListener) {}
        override fun unregisterOnSharedPreferenceChangeListener(listener: SharedPreferences.OnSharedPreferenceChangeListener) {}

        private class FakeEditor(
            private val target: MutableMap<String, Any?>,
            private val parent: FakeSharedPreferences
        ) : SharedPreferences.Editor {
            private val pending = mutableMapOf<String, Any?>()
            private var clearFlag = false

            override fun putString(key: String, value: String?): SharedPreferences.Editor =
                apply { pending[key] = value }

            override fun putStringSet(key: String, values: Set<String>?): SharedPreferences.Editor =
                apply { pending[key] = values }

            override fun putInt(key: String, value: Int): SharedPreferences.Editor =
                apply { pending[key] = value }

            override fun putLong(key: String, value: Long): SharedPreferences.Editor =
                apply { pending[key] = value }

            override fun putFloat(key: String, value: Float): SharedPreferences.Editor =
                apply { pending[key] = value }

            override fun putBoolean(key: String, value: Boolean): SharedPreferences.Editor =
                apply { pending[key] = value }

            override fun remove(key: String): SharedPreferences.Editor = apply { pending[key] = this }
            override fun clear(): SharedPreferences.Editor = apply { clearFlag = true }

            override fun commit(): Boolean {
                parent.lastEditorCommitCalled = true
                parent.throwOnCommit?.let { throw it }
                apply()
                return true
            }

            override fun apply() {
                if (clearFlag) target.clear()
                pending.forEach { (k, v) ->
                    if (v === this) target.remove(k) else target[k] = v
                }
                pending.clear()
            }
        }
    }
}
