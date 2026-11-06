package com.keepnc.data.remote

import okhttp3.HttpUrl.Companion.toHttpUrlOrNull

/**
 * Utility functions for normalizing Nextcloud server URLs and reconciling
 * endpoint URLs returned by the server during authentication and API calls.
 */
object ServerUrlUtils {

    /**
     * Normalizes a server URL entered by the user or stored in preferences.
     * - Trims whitespace and trailing slashes.
     * - Removes redundant suffixes like `/index.php`, `/apps/notes...`, or `/login/v2`.
     *
     * Examples:
     * - "https://example.com/nextcloud/" -> "https://example.com/nextcloud"
     * - "https://example.com/nextcloud/index.php" -> "https://example.com/nextcloud"
     * - "https://example.com/nextcloud/index.php/apps/notes" -> "https://example.com/nextcloud"
     * - "https://example.com/" -> "https://example.com"
     */
    fun normalizeServerUrl(rawUrl: String): String {
        var url = rawUrl.trim().trimEnd('/')

        val indexPhpPos = url.indexOf("/index.php")
        if (indexPhpPos != -1) {
            url = url.substring(0, indexPhpPos).trimEnd('/')
        } else {
            val appsPos = url.indexOf("/apps/")
            if (appsPos != -1) {
                url = url.substring(0, appsPos).trimEnd('/')
            }
        }
        return url.trimEnd('/')
    }

    /**
     * Reconciles a URL returned by Nextcloud (e.g. login URL, poll endpoint, or server URL in credentials)
     * against the trusted [baseServerUrl] entered by the user.
     *
     * Solves issues with Nextcloud instances behind reverse proxies or in subfolders where:
     * - Nextcloud generates URLs omitting the subfolder (e.g. `https://example.com/login/v2/poll`
     *   instead of `https://example.com/nextcloud/login/v2/poll`).
     * - Nextcloud generates `http://` instead of `https://` due to SSL-terminating reverse proxies.
     * - Nextcloud returns internal Docker/container hostnames that Android cannot resolve.
     * - Nextcloud returns relative paths (e.g. `/index.php/login/v2/poll`).
     */
    fun reconcileUrl(baseServerUrl: String, returnedUrl: String): String {
        val cleanBase = normalizeServerUrl(baseServerUrl)
        if (returnedUrl.isBlank()) return cleanBase

        val trimmedReturned = returnedUrl.trim()
        val baseHttpUrl = cleanBase.toHttpUrlOrNull() ?: return trimmedReturned

        val serverSubpathSegments = baseHttpUrl.pathSegments.filter { it.isNotEmpty() }

        // Case 1: returnedUrl is a relative path (e.g. "/index.php/login/v2/poll" or "login/v2/poll")
        if (!trimmedReturned.startsWith("http://", ignoreCase = true) &&
            !trimmedReturned.startsWith("https://", ignoreCase = true)
        ) {
            val relativePath = trimmedReturned.trimStart('/')
            val subpathString = serverSubpathSegments.joinToString("/")
            return if (subpathString.isNotEmpty() && relativePath.startsWith(subpathString)) {
                val origin = "${baseHttpUrl.scheme}://${baseHttpUrl.host}${if (baseHttpUrl.port != 80 && baseHttpUrl.port != 443) ":${baseHttpUrl.port}" else ""}"
                "$origin/$relativePath"
            } else {
                "$cleanBase/$relativePath"
            }
        }

        // Case 2: returnedUrl is an absolute URL
        val returnedHttpUrl = trimmedReturned.toHttpUrlOrNull() ?: return trimmedReturned

        val targetBuilder = baseHttpUrl.newBuilder()

        // Match scheme from base if base is HTTPS (prevent SSL downgrade from reverse proxy)
        if (baseHttpUrl.isHttps && !returnedHttpUrl.isHttps) {
            targetBuilder.scheme("https")
        }

        // Use base host and port so we don't attempt to connect to internal/unresolvable server names
        targetBuilder.host(baseHttpUrl.host)
        targetBuilder.port(baseHttpUrl.port)

        val returnedSegments = returnedHttpUrl.pathSegments.filter { it.isNotEmpty() }

        // Check if returned segments already begin with serverSubpathSegments
        val alreadyHasSubpath = serverSubpathSegments.isNotEmpty() &&
            returnedSegments.size >= serverSubpathSegments.size &&
            returnedSegments.subList(0, serverSubpathSegments.size) == serverSubpathSegments

        val finalSegments = if (alreadyHasSubpath) {
            returnedSegments
        } else {
            serverSubpathSegments + returnedSegments
        }

        val finalPath = if (finalSegments.isEmpty()) {
            "/"
        } else {
            "/" + finalSegments.joinToString("/")
        }
        targetBuilder.encodedPath(finalPath)

        returnedHttpUrl.encodedQuery?.let { targetBuilder.encodedQuery(it) }

        return targetBuilder.build().toString().trimEnd('/')
    }
}
