package com.keepnc.data.auth

import com.google.gson.Gson
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test

class LoginFlowDtoTest {

    private val gson = Gson()

    @Test
    fun testLoginFlowInitResponseDeserialization() {
        val json = """
            {
                "poll": {
                    "token": "test-token-12345",
                    "endpoint": "https://cloud.example.com/index.php/login/v2/poll"
                },
                "login": "https://cloud.example.com/index.php/login/v2/flow/abcde"
            }
        """.trimIndent()

        val response = gson.fromJson(json, LoginFlowInitResponse::class.java)

        assertNotNull(response)
        assertEquals("https://cloud.example.com/index.php/login/v2/flow/abcde", response.login)
        assertNotNull(response.poll)
        assertEquals("test-token-12345", response.poll.token)
        assertEquals("https://cloud.example.com/index.php/login/v2/poll", response.poll.endpoint)
    }

    @Test
    fun testLoginFlowCredentialsResponseDeserialization() {
        val json = """
            {
                "server": "https://cloud.example.com",
                "loginName": "john_doe",
                "appPassword": "secret-app-password"
            }
        """.trimIndent()

        val response = gson.fromJson(json, LoginFlowCredentialsResponse::class.java)

        assertNotNull(response)
        assertEquals("https://cloud.example.com", response.server)
        assertEquals("john_doe", response.loginName)
        assertEquals("secret-app-password", response.appPassword)
    }

    @Test
    fun testEmptyJsonUsesDefaultValuesWithoutCrashing() {
        val response = gson.fromJson("{}", LoginFlowInitResponse::class.java)
        assertNotNull(response)
        assertEquals("", response.login)
    }
}
