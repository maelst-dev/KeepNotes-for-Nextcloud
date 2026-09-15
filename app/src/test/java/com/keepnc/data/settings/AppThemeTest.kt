package com.keepnc.data.settings

import androidx.appcompat.app.AppCompatDelegate
import org.junit.Assert.assertEquals
import org.junit.Test

class AppThemeTest {

    @Test
    fun `fromKey returns DEFAULT for empty or null or unknown keys`() {
        assertEquals(AppTheme.SYSTEM, AppTheme.fromKey(null))
        assertEquals(AppTheme.SYSTEM, AppTheme.fromKey(""))
        assertEquals(AppTheme.SYSTEM, AppTheme.fromKey("unknown"))
    }

    @Test
    fun `fromKey returns matching theme`() {
        assertEquals(AppTheme.SYSTEM, AppTheme.fromKey("system"))
        assertEquals(AppTheme.LIGHT, AppTheme.fromKey("light"))
        assertEquals(AppTheme.DARK, AppTheme.fromKey("dark"))
    }

    @Test
    fun `nightMode constants map correctly`() {
        assertEquals(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM, AppTheme.SYSTEM.nightMode)
        assertEquals(AppCompatDelegate.MODE_NIGHT_NO, AppTheme.LIGHT.nightMode)
        assertEquals(AppCompatDelegate.MODE_NIGHT_YES, AppTheme.DARK.nightMode)
    }
}
