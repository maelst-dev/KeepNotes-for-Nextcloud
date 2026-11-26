package com.keepnc.ui.notes

import com.keepnc.data.auth.TokenStorage
import com.keepnc.data.local.NoteDao
import com.keepnc.data.local.NoteEntity
import com.keepnc.data.local.SyncStatus
import com.keepnc.data.remote.NotesApi
import com.keepnc.data.remote.dto.NoteCreateRequest
import com.keepnc.data.remote.dto.NoteDto
import com.keepnc.data.remote.dto.NoteUpdateRequest
import com.keepnc.data.repository.NotesRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class NotesViewModelTest {

    private val testDispatcher = StandardTestDispatcher()
    private lateinit var fakeDao: FakeNoteDao
    private lateinit var fakeApi: FakeNotesApi
    private lateinit var repository: NotesRepository
    private lateinit var viewModel: NotesViewModel

    @Before
    fun setUp() {
        Dispatchers.setMain(testDispatcher)
        fakeDao = FakeNoteDao()
        fakeApi = FakeNotesApi()

        val unsafeClass = Class.forName("sun.misc.Unsafe")
        val unsafeField = unsafeClass.getDeclaredField("theUnsafe")
        unsafeField.isAccessible = true
        val unsafe = unsafeField.get(null)
        val allocateMethod = unsafeClass.getMethod("allocateInstance", Class::class.java)
        val dummyTokenStorage = allocateMethod.invoke(unsafe, TokenStorage::class.java) as TokenStorage

        repository = NotesRepository(fakeDao, fakeApi, dummyTokenStorage).apply {
            ioDispatcher = testDispatcher
        }
        viewModel = NotesViewModel(repository)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `toggleSelection adds and removes note IDs`() = runTest {
        assertTrue(viewModel.selectedNoteIds.value.isEmpty())

        viewModel.toggleSelection(1L)
        assertEquals(setOf(1L), viewModel.selectedNoteIds.value)

        viewModel.toggleSelection(2L)
        assertEquals(setOf(1L, 2L), viewModel.selectedNoteIds.value)

        viewModel.toggleSelection(1L)
        assertEquals(setOf(2L), viewModel.selectedNoteIds.value)

        viewModel.clearSelection()
        assertTrue(viewModel.selectedNoteIds.value.isEmpty())
    }

    @Test
    fun `deleteSelectedNotes deletes all selected notes and clears selection`() = runTest {
        fakeDao.notes[1L] = NoteEntity(id = 1L, serverId = 101L, title = "N1", content = "C1", syncStatus = SyncStatus.SYNCED)
        fakeDao.notes[2L] = NoteEntity(id = 2L, serverId = 102L, title = "N2", content = "C2", syncStatus = SyncStatus.SYNCED)
        fakeDao.notes[3L] = NoteEntity(id = 3L, serverId = 103L, title = "N3", content = "C3", syncStatus = SyncStatus.SYNCED)

        viewModel.toggleSelection(1L)
        viewModel.toggleSelection(3L)
        assertEquals(setOf(1L, 3L), viewModel.selectedNoteIds.value)

        viewModel.deleteSelectedNotes()
        assertTrue(viewModel.selectedNoteIds.value.isEmpty())

        advanceUntilIdle()

        assertFalse(fakeDao.notes.containsKey(1L))
        assertTrue(fakeDao.notes.containsKey(2L))
        assertFalse(fakeDao.notes.containsKey(3L))
    }

    private class FakeNoteDao : NoteDao {
        val notes = mutableMapOf<Long, NoteEntity>()

        override fun getAllNotes(): Flow<List<NoteEntity>> = flowOf(notes.values.toList())
        override fun getNotesByCategory(category: String): Flow<List<NoteEntity>> = flowOf(notes.values.filter { it.category == category })
        override fun getFavorites(): Flow<List<NoteEntity>> = flowOf(notes.values.filter { it.favorite })
        override fun searchNotes(query: String): Flow<List<NoteEntity>> = flowOf(notes.values.filter { it.title.contains(query) || it.content.contains(query) })
        override fun getCategories(): Flow<List<String>> = flowOf(notes.values.map { it.category }.distinct())
        override suspend fun getNotesByServerId(serverId: Long): List<NoteEntity> = notes.values.filter { it.serverId == serverId }
        override suspend fun getNoteByServerId(serverId: Long): NoteEntity? = notes.values.find { it.serverId == serverId }
        override suspend fun getNoteById(id: Long): NoteEntity? = notes[id]
        override suspend fun getDirtyNotes(): List<NoteEntity> = notes.values.filter { it.syncStatus == SyncStatus.DIRTY }
        override suspend fun getPendingDeleteNotes(): List<NoteEntity> = notes.values.filter { it.syncStatus == SyncStatus.PENDING_DELETE }
        override suspend fun insert(note: NoteEntity): Long {
            val newId = (notes.keys.maxOrNull() ?: 0L) + 1L
            notes[newId] = note.copy(id = newId)
            return newId
        }
        override suspend fun update(note: NoteEntity) { notes[note.id] = note }
        override suspend fun delete(note: NoteEntity) { notes.remove(note.id) }
        override suspend fun deleteById(id: Long) { notes.remove(id) }
        override suspend fun deletePureLocalPendingDeletes() {}
        override suspend fun deleteSyncedNotesNotIn(serverIds: List<Long>) {}
        override suspend fun deleteAllSynced() {}
        override suspend fun clearAll() { notes.clear() }
    }

    private class FakeNotesApi : NotesApi {
        override suspend fun getNotes(): List<NoteDto> = emptyList()
        override suspend fun getNote(id: Long): NoteDto = NoteDto(id = id)
        override suspend fun createNote(note: NoteCreateRequest): NoteDto = NoteDto(id = 999L)
        override suspend fun updateNote(id: Long, note: NoteUpdateRequest): NoteDto = NoteDto(id = id)
        override suspend fun deleteNote(id: Long) {}
    }
}
