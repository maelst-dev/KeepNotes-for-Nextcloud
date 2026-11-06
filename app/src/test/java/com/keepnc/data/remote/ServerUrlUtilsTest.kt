package com.keepnc.data.remote

import org.junit.Assert.assertEquals
import org.junit.Test

class ServerUrlUtilsTest {

    @Test
    fun `normalizeServerUrl handles standard root domain`() {
        assertEquals("https://example.com", ServerUrlUtils.normalizeServerUrl("https://example.com"))
        assertEquals("https://example.com", ServerUrlUtils.normalizeServerUrl("https://example.com/"))
        assertEquals("https://example.com", ServerUrlUtils.normalizeServerUrl("  https://example.com/  "))
    }

    @Test
    fun `normalizeServerUrl handles subfolders and trailing slashes`() {
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud"))
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud/"))
        assertEquals("https://example.com/sub/nc", ServerUrlUtils.normalizeServerUrl("https://example.com/sub/nc/"))
    }

    @Test
    fun `normalizeServerUrl removes redundant index php and app paths`() {
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud/index.php"))
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud/index.php/"))
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud/index.php/apps/notes"))
        assertEquals("https://example.com/nextcloud", ServerUrlUtils.normalizeServerUrl("https://example.com/nextcloud/apps/notes"))
        assertEquals("https://example.com", ServerUrlUtils.normalizeServerUrl("https://example.com/index.php"))
    }

    @Test
    fun `reconcileUrl preserves subpath when Nextcloud strips it from poll endpoint`() {
        val base = "https://domain.name/folder"
        val returnedEndpoint = "https://domain.name/index.php/login/v2/poll"

        val result = ServerUrlUtils.reconcileUrl(base, returnedEndpoint)
        assertEquals("https://domain.name/folder/index.php/login/v2/poll", result)
    }

    @Test
    fun `reconcileUrl does not duplicate subpath when already present in returned endpoint`() {
        val base = "https://domain.name/folder"
        val returnedEndpoint = "https://domain.name/folder/index.php/login/v2/poll"

        val result = ServerUrlUtils.reconcileUrl(base, returnedEndpoint)
        assertEquals("https://domain.name/folder/index.php/login/v2/poll", result)
    }

    @Test
    fun `reconcileUrl upgrades HTTP to HTTPS if base is HTTPS`() {
        val base = "https://domain.name/folder"
        val returnedEndpoint = "http://domain.name/index.php/login/v2/poll"

        val result = ServerUrlUtils.reconcileUrl(base, returnedEndpoint)
        assertEquals("https://domain.name/folder/index.php/login/v2/poll", result)
    }

    @Test
    fun `reconcileUrl replaces internal docker host with trusted base host`() {
        val base = "https://domain.name/folder"
        val returnedEndpoint = "http://nextcloud-backend:80/index.php/login/v2/poll"

        val result = ServerUrlUtils.reconcileUrl(base, returnedEndpoint)
        assertEquals("https://domain.name/folder/index.php/login/v2/poll", result)
    }

    @Test
    fun `reconcileUrl resolves relative endpoint without duplicate subpath`() {
        val base = "https://domain.name/folder"
        val relative1 = "/index.php/login/v2/poll"
        val relative2 = "/folder/index.php/login/v2/poll"

        assertEquals("https://domain.name/folder/index.php/login/v2/poll", ServerUrlUtils.reconcileUrl(base, relative1))
        assertEquals("https://domain.name/folder/index.php/login/v2/poll", ServerUrlUtils.reconcileUrl(base, relative2))
    }

    @Test
    fun `reconcileUrl restores subpath in creds server response`() {
        val base = "https://domain.name/folder"
        val returnedServer = "https://domain.name"

        val result = ServerUrlUtils.reconcileUrl(base, returnedServer)
        assertEquals("https://domain.name/folder", result)
    }

    @Test
    fun `reconcileUrl works cleanly with standard root domains`() {
        val base = "https://example.com"
        val returnedEndpoint = "https://example.com/index.php/login/v2/poll"
        val returnedServer = "https://example.com"

        assertEquals("https://example.com/index.php/login/v2/poll", ServerUrlUtils.reconcileUrl(base, returnedEndpoint))
        assertEquals("https://example.com", ServerUrlUtils.reconcileUrl(base, returnedServer))
    }
}
