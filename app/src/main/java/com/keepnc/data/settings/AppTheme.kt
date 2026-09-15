package com.keepnc.data.settings

import androidx.annotation.StringRes
import androidx.appcompat.app.AppCompatDelegate
import com.keepnc.R

/**
 * Theme mode options for the application.
 *
 * Supports system default (auto-switch based on OS / time), fixed light, and fixed dark modes.
 *
 * @param key Unique key stored in SharedPreferences.
 * @param nightMode Corresponding [AppCompatDelegate] night mode integer.
 * @param labelRes Localized string resource describing the theme.
 */
enum class AppTheme(
    val key: String,
    val nightMode: Int,
    @StringRes val labelRes: Int
) {
    SYSTEM(
        key = "system",
        nightMode = AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM,
        labelRes = R.string.theme_system
    ),
    LIGHT(
        key = "light",
        nightMode = AppCompatDelegate.MODE_NIGHT_NO,
        labelRes = R.string.theme_light
    ),
    DARK(
        key = "dark",
        nightMode = AppCompatDelegate.MODE_NIGHT_YES,
        labelRes = R.string.theme_dark
    );

    companion object {
        val DEFAULT = SYSTEM

        /** Finds [AppTheme] matching the given key, falling back to [DEFAULT]. */
        fun fromKey(key: String?): AppTheme =
            entries.firstOrNull { it.key == key } ?: DEFAULT

        /** Applies the specified theme via [AppCompatDelegate.setDefaultNightMode]. */
        fun apply(theme: AppTheme) {
            AppCompatDelegate.setDefaultNightMode(theme.nightMode)
        }
    }
}
