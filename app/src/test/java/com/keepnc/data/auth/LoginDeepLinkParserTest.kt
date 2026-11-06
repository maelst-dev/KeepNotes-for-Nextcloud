package com.keepnc.data.auth

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Test

class LoginDeepLinkParserTest {

    @Test
    fun `parse path format with URL encoded server`() {
        val uri = "nc://login/server:https%3A%2F%2Fcloud.example.com&user:john_doe&password:secret_token_123"
        val creds = LoginDeepLinkParser.parse(uri)

        assertNotNull(creds)
        assertEquals("https://cloud.example.com", creds?.serverUrl)
        assertEquals("john_doe", creds?.loginName)
        assertEquals("secret_token_123", creds?.appPassword)
    }

    @Test
    fun `parse path format with unencoded server and subfolder`() {
        val uri = "nc://login/server:https://cloud.example.com/nextcloud&user:alice&password:app-pass-456"
        val creds = LoginDeepLinkParser.parse(uri)

        assertNotNull(creds)
        assertEquals("https://cloud.example.com/nextcloud", creds?.serverUrl)
        assertEquals("alice", creds?.loginName)
        assertEquals("app-pass-456", creds?.appPassword)
    }

    @Test
    fun `parse query parameters format`() {
        val uri = "nc://login?server=https%3A%2F%2Fcloud.example.com&user=bob&password=pass789"
        val creds = LoginDeepLinkParser.parse(uri)

        assertNotNull(creds)
        assertEquals("https://cloud.example.com", creds?.serverUrl)
        assertEquals("bob", creds?.loginName)
        assertEquals("pass789", creds?.appPassword)
    }

    @Test
    fun `parse returns null for invalid scheme or host`() {
        assertNull(LoginDeepLinkParser.parse("https://cloud.example.com/login"))
        assertNull(LoginDeepLinkParser.parse("nc://other/server:https://cloud.example.com"))
        assertNull(LoginDeepLinkParser.parse(""))
        assertNull(LoginDeepLinkParser.parse(null as String?))
    }

    @Test
    fun `parse returns null when required fields are missing`() {
        assertNull(LoginDeepLinkParser.parse("nc://login/server:https://cloud.example.com&user:john"))
        assertNull(LoginDeepLinkParser.parse("nc://login/user:john&password:pass"))
        assertNull(LoginDeepLinkParser.parse("nc://login/server:https://cloud.example.com&password:pass"))
    }
}
