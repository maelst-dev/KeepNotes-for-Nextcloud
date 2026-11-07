package com.keepnc.ui.auth

import androidx.lifecycle.SavedStateHandle
import com.google.gson.Gson
import com.keepnc.R
import com.keepnc.data.auth.Credentials
import com.keepnc.data.auth.LoginFlowCredentialsResponse
import com.keepnc.data.auth.LoginFlowInitResponse
import com.keepnc.data.auth.LoginFlowService
import com.keepnc.data.auth.PollData
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
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import okhttp3.OkHttpClient
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class LoginViewModelTest {

    private val testDispatcher = StandardTestDispatcher()
    private lateinit var fakeTokenStorage: FakeTokenStorage
    private lateinit var fakeDao: FakeNoteDao
    private lateinit var fakeApi: FakeNotesApi
    private lateinit var repository: NotesRepository

    @Before
    fun setUp() {
        Dispatchers.setMain(testDispatcher)
        fakeTokenStorage = FakeTokenStorage()
        fakeDao = FakeNoteDao()
        fakeApi = FakeNotesApi()
        repository = NotesRepository(fakeDao, fakeApi, fakeTokenStorage).apply {
            ioDispatcher = testDispatcher
        }
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    private class FakeTokenStorage : TokenStorage() {
        var savedCredentials: Credentials? = null
        var shouldFailSave: Boolean = false
        override fun saveCredentials(credentials: Credentials): Boolean {
            if (shouldFailSave) return false
            savedCredentials = credentials
            return true
        }
        override fun getCredentials(): Credentials? = savedCredentials
        override fun getServerUrl(): String? = savedCredentials?.serverUrl
        override fun isLoggedIn(): Boolean = savedCredentials != null
        override fun clearCredentials(): Boolean {
            savedCredentials = null
            return true
        }
    }

    private class FakeLoginFlowService(
        val initResponse: LoginFlowInitResponse = LoginFlowInitResponse(
            poll = PollData(token = "test-token", endpoint = "https://cloud.example.com/poll"),
            login = "https://cloud.example.com/login/flow"
        ),
        val credsResponse: LoginFlowCredentialsResponse = LoginFlowCredentialsResponse(
            server = "https://cloud.example.com",
            loginName = "john_doe",
            appPassword = "secret-token"
        )
    ) : LoginFlowService(OkHttpClient(), Gson()) {

        var initiateCalled = false
        var pollCalled = false
        var lastTriggerChannel: Channel<Unit>? = null

        override suspend fun initiateLoginFlow(serverUrl: String): LoginFlowInitResponse {
            initiateCalled = true
            return initResponse
        }

        override suspend fun pollForCredentials(
            endpoint: String,
            token: String,
            pollTriggerChannel: Channel<Unit>?,
            timeoutMs: Long,
            pollIntervalMs: Long
        ): LoginFlowCredentialsResponse {
            pollCalled = true
            lastTriggerChannel = pollTriggerChannel
            return credsResponse
        }
    }

    @Test
    fun `startLoginFlow with empty URL sets error state`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())

        viewModel.startLoginFlow("")

        assertTrue(viewModel.loginState.value is LoginState.Error)
        assertEquals(R.string.login_error_empty_url, (viewModel.loginState.value as LoginState.Error).messageRes)
        assertFalse(fakeService.initiateCalled)
    }

    @Test
    fun `startLoginFlow with invalid protocol sets error state`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())

        viewModel.startLoginFlow("ftp://cloud.example.com")

        assertTrue(viewModel.loginState.value is LoginState.Error)
        assertEquals(R.string.login_error_invalid_url, (viewModel.loginState.value as LoginState.Error).messageRes)
        assertFalse(fakeService.initiateCalled)
    }

    @Test
    fun `startLoginFlow happy path transitions to WaitingForAuthorization then Success`() = runTest {
        val fakeService = FakeLoginFlowService()
        val savedStateHandle = SavedStateHandle()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, savedStateHandle)

        viewModel.startLoginFlow("https://cloud.example.com")
        advanceUntilIdle()

        assertTrue(fakeService.initiateCalled)
        assertTrue(fakeService.pollCalled)
        assertEquals(LoginState.Success, viewModel.loginState.value)
        assertNotNull(fakeTokenStorage.savedCredentials)
        assertEquals("https://cloud.example.com", fakeTokenStorage.savedCredentials?.serverUrl)
        assertEquals("john_doe", fakeTokenStorage.savedCredentials?.loginName)
        assertEquals("secret-token", fakeTokenStorage.savedCredentials?.appPassword)
    }

    @Test
    fun `handleDeepLink with valid credentials saves credentials and emits Success`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())

        val uriString = "nc://login/server:https%3A%2F%2Fcloud.example.com&user:alice&password:app-pass-789"
        val handled = viewModel.handleDeepLink(uriString)
        advanceUntilIdle()

        assertTrue(handled)
        assertEquals(LoginState.Success, viewModel.loginState.value)
        assertEquals("alice", fakeTokenStorage.savedCredentials?.loginName)
        assertEquals("app-pass-789", fakeTokenStorage.savedCredentials?.appPassword)
    }

    @Test
    fun `handleDeepLink with invalid URI returns false without changing state`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())

        val handled = viewModel.handleDeepLink("https://invalid.com")
        advanceUntilIdle()

        assertFalse(handled)
        assertEquals(LoginState.Idle, viewModel.loginState.value)
        assertNull(fakeTokenStorage.savedCredentials)
    }

    @Test
    fun `cancelLoginFlow cancels active polling and returns to Idle`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())

        viewModel.startLoginFlow("https://cloud.example.com")
        viewModel.cancelLoginFlow()
        advanceUntilIdle()

        assertEquals(LoginState.Idle, viewModel.loginState.value)
    }

    @Test
    fun `process restoration from SavedStateHandle restores WaitingForAuthorization and resumes polling`() = runTest {
        val fakeService = FakeLoginFlowService()
        val savedState = SavedStateHandle(
            mapOf(
                "login_is_polling" to true,
                "login_url" to "https://cloud.example.com/flow",
                "login_current_server_url" to "https://cloud.example.com",
                "login_poll_endpoint" to "https://cloud.example.com/poll",
                "login_poll_token" to "token-xyz"
            )
        )

        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, savedState)
        advanceUntilIdle()

        assertTrue(fakeService.pollCalled)
        assertEquals(LoginState.Success, viewModel.loginState.value)
        assertEquals("john_doe", fakeTokenStorage.savedCredentials?.loginName)
    }

    @Test
    fun `when saveCredentials fails during login, loginState transitions to Error`() = runTest {
        val fakeService = FakeLoginFlowService()
        val viewModel = LoginViewModel(fakeService, fakeTokenStorage, repository, SavedStateHandle())
        fakeTokenStorage.shouldFailSave = true

        viewModel.startLoginFlow("https://cloud.example.com")
        advanceUntilIdle()

        assertTrue(viewModel.loginState.value is LoginState.Error)
        val errorState = viewModel.loginState.value as LoginState.Error
        assertEquals(R.string.login_error_save_credentials, errorState.messageRes)
        assertFalse(viewModel.isLoggedIn())
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
        override suspend fun insert(note: NoteEntity): Long = 1L
        override suspend fun update(note: NoteEntity) {}
        override suspend fun delete(note: NoteEntity) {}
        override suspend fun deleteById(id: Long) {}
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
