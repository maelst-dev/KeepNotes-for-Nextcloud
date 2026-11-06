package com.keepnc.data.remote

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import org.w3c.dom.Element
import java.io.File
import javax.xml.parsers.DocumentBuilderFactory

class NetworkSecurityConfigTest {

    @Test
    fun `network security config exists and has valid structure`() {
        val configFile = listOf(
            File("app/src/main/res/xml/network_security_config.xml"),
            File("src/main/res/xml/network_security_config.xml")
        ).firstOrNull { it.exists() }

        assertNotNull("network_security_config.xml must exist", configFile)

        val factory = DocumentBuilderFactory.newInstance()
        val builder = factory.newDocumentBuilder()
        val doc = builder.parse(configFile!!)

        val root = doc.documentElement
        assertEquals("network-security-config", root.nodeName)

        val baseConfigList = root.getElementsByTagName("base-config")
        assertEquals("Must have exactly one base-config", 1, baseConfigList.length)

        val baseConfig = baseConfigList.item(0) as Element
        assertEquals(
            "cleartextTrafficPermitted must be false for F-Droid compliance and transport security",
            "false",
            baseConfig.getAttribute("cleartextTrafficPermitted")
        )

        val trustAnchorsList = baseConfig.getElementsByTagName("trust-anchors")
        assertEquals("Must have trust-anchors inside base-config", 1, trustAnchorsList.length)

        val trustAnchors = trustAnchorsList.item(0) as Element
        val certs = trustAnchors.getElementsByTagName("certificates")
        assertTrue("Must specify trust certificates", certs.length >= 2)

        val sources = mutableListOf<String>()
        for (i in 0 until certs.length) {
            val certElement = certs.item(i) as Element
            sources.add(certElement.getAttribute("src"))
        }

        assertTrue("Must trust system certificates", sources.contains("system"))
        assertTrue("Must trust user-installed certificates for self-signed CAs (Issue #6)", sources.contains("user"))
    }

    @Test
    fun `manifest configures network security config`() {
        val manifestFile = listOf(
            File("app/src/main/AndroidManifest.xml"),
            File("src/main/AndroidManifest.xml")
        ).firstOrNull { it.exists() }

        assertNotNull("AndroidManifest.xml must exist", manifestFile)

        val content = manifestFile!!.readText()
        assertTrue(
            "AndroidManifest.xml must reference networkSecurityConfig",
            content.contains("android:networkSecurityConfig=\"@xml/network_security_config\"")
        )
    }
}
