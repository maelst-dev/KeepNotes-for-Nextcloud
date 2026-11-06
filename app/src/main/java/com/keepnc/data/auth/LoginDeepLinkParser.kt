package com.keepnc.data.auth

import android.net.Uri
import com.keepnc.data.remote.ServerUrlUtils
import java.net.URLDecoder

/**
 * Parses Nextcloud Login Flow deep links (custom URI scheme `nc://login/...`).
 *
 * Nextcloud clients (v1 and v2) handle web callback redirects using this scheme:
 * 1. Path format: `nc://login/server:<server>&user:<loginname>&password:<password>`
 * 2. Query format: `nc://login?server=<server>&user=<user>&password=<password>`
 */
object LoginDeepLinkParser {

    /**
     * Parses an Android [Uri] for Nextcloud login credentials.
     */
    fun parse(uri: Uri?): Credentials? {
        if (uri == null) return null
        return parse(uri.toString())
    }

    /**
     * Parses a string representation of a deep link URI.
     * Pure Kotlin implementation that runs identically on JVM unit tests and Android runtime.
     */
    fun parse(rawUri: String?): Credentials? {
        if (rawUri.isNullOrBlank()) return null
        val trimmed = rawUri.trim()

        // Verify scheme and host
        if (!trimmed.startsWith("nc://login", ignoreCase = true)) {
            return null
        }

        var serverUrl: String? = null
        var loginName: String? = null
        var appPassword: String? = null

        val afterHost = trimmed.substring("nc://login".length)

        // 1. Check query parameters (?server=...&user=...&password=...)
        if (afterHost.startsWith("?") || afterHost.contains("?")) {
            val queryString = afterHost.substringAfter("?")
            val params = queryString.split('&')
            for (param in params) {
                val eqIdx = param.indexOf('=')
                if (eqIdx != -1) {
                    val key = param.substring(0, eqIdx).trim()
                    val value = safeDecode(param.substring(eqIdx + 1))
                    when (key.lowercase()) {
                        "server" -> serverUrl = value
                        "user" -> loginName = value
                        "password" -> appPassword = value
                    }
                }
            }
        }

        // 2. If not found in query params, check path format: /server:<server>&user:<user>&password:<pass>
        if (serverUrl.isNullOrBlank() || loginName.isNullOrBlank() || appPassword.isNullOrBlank()) {
            val pathPayload = afterHost.substringBefore("?").trimStart('/')
            val parts = pathPayload.split('&')
            for (part in parts) {
                when {
                    part.startsWith("server:", ignoreCase = true) -> {
                        serverUrl = safeDecode(part.substring("server:".length))
                    }
                    part.startsWith("user:", ignoreCase = true) -> {
                        loginName = safeDecode(part.substring("user:".length))
                    }
                    part.startsWith("password:", ignoreCase = true) -> {
                        appPassword = safeDecode(part.substring("password:".length))
                    }
                }
            }
        }

        if (serverUrl.isNullOrBlank() || loginName.isNullOrBlank() || appPassword.isNullOrBlank()) {
            return null
        }

        return Credentials(
            serverUrl = ServerUrlUtils.normalizeServerUrl(serverUrl),
            loginName = loginName.trim(),
            appPassword = appPassword.trim()
        )
    }

    private fun safeDecode(value: String): String {
        return try {
            URLDecoder.decode(value, "UTF-8")
        } catch (e: Exception) {
            value
        }
    }
}
