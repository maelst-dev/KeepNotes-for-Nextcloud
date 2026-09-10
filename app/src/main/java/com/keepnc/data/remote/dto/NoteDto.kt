package com.keepnc.data.remote.dto

import androidx.annotation.Keep
import com.google.gson.annotations.SerializedName

/**
 * Mirrors the note object returned by Nextcloud Notes API v1.
 * See: https://github.com/nextcloud/notes/blob/main/docs/api/v1.md
 *
 * [id]       — server-side note ID
 * [etag]     — used for conditional requests / conflict detection
 * [readonly] — true if the note is from a shared read-only source
 * [modified] — Unix timestamp (seconds) of last modification on the server
 * [title]    — note title (server may auto-generate from content first line)
 * [category] — string category / label; empty string means uncategorized
 * [content]  — full note body (Markdown)
 * [favorite] — pinned flag
 */
@Keep
data class NoteDto(
    @SerializedName("id") val id: Long = 0L,
    @SerializedName("etag") val etag: String? = null,
    @SerializedName("readonly") val readonly: Boolean = false,
    @SerializedName("modified") val modified: Long = 0L,
    @SerializedName("title") val title: String? = "",
    @SerializedName("category") val category: String? = "",
    @SerializedName("content") val content: String? = "",
    @SerializedName("favorite") val favorite: Boolean = false
)

/**
 * Request body for POST /notes — create a new note.
 */
@Keep
data class NoteCreateRequest(
    @SerializedName("title") val title: String = "",
    @SerializedName("content") val content: String = "",
    @SerializedName("category") val category: String = "",
    @SerializedName("favorite") val favorite: Boolean = false
)

/**
 * Request body for PUT /notes/{id} — update an existing note.
 */
@Keep
data class NoteUpdateRequest(
    @SerializedName("title") val title: String = "",
    @SerializedName("content") val content: String = "",
    @SerializedName("category") val category: String = "",
    @SerializedName("favorite") val favorite: Boolean = false
)
