package com.keepnc.ui.editor

import android.content.Context
import android.os.Bundle
import android.text.Editable
import android.text.Selection
import android.text.Spannable
import android.text.Spanned
import android.text.style.ClickableSpan
import android.text.style.LeadingMarginSpan
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.MotionEvent
import android.view.View
import android.view.ViewConfiguration
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.activity.OnBackPressedCallback
import androidx.core.view.MenuProvider
import androidx.core.widget.addTextChangedListener
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.navigation.fragment.findNavController
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.keepnc.R
import com.keepnc.data.settings.SettingsStorage
import com.keepnc.databinding.FragmentEditorBinding
import com.keepnc.ui.MarkwonFactory
import dagger.hilt.android.AndroidEntryPoint
import io.noties.markwon.ext.tasklist.TaskListSpan
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Note editor screen.
 *
 * ## Toolbar items
 * - **←** back arrow — saves and returns to notes list
 * - **★** star — toggles favorite / pinned state
 * - **👁 / ✏** eye / pencil — toggles Preview ↔ Edit mode
 *
 * ## Modes
 * - **Edit** (default for new notes): title input + content visible, category chip editable.
 * - **Preview** (default for existing notes): Markdown rendered in `tv_preview`,
 *   title input hidden (title shown in toolbar), category chip read-only.
 *
 * ## Checklist features
 * - **Large checkboxes** (22 dp) rendered via [LargeTaskCheckboxSpan].
 * - **Tap to toggle** in Preview mode: tapping a checkbox updates `- [ ]` ↔ `- [x]` in
 *   `et_content` immediately so the state is persisted on save.
 * - **Auto-continue** in Edit mode: pressing Enter on a task-list line (`- [ ] …` or `- [x] …`)
 *   automatically inserts `- [ ] ` on the new line.
 */
@AndroidEntryPoint
class EditorFragment : Fragment() {

    private var _binding: FragmentEditorBinding? = null
    private val binding get() = _binding!!

    private val viewModel: EditorViewModel by viewModels()

    @Inject
    lateinit var settingsStorage: SettingsStorage

    private var fieldsPopulated = false
    private var isPreviewMode = false

    /** Prevents the task-list auto-complete TextWatcher from triggering itself recursively. */
    private var isInsertingTaskPrefix = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentEditorBinding.inflate(inflater, container, false)
        if (savedInstanceState != null) {
            isPreviewMode = savedInstanceState.getBoolean(KEY_PREVIEW_MODE, false)
        } else {
            val noteId = arguments?.getLong("note_id", -1L) ?: -1L
            isPreviewMode = (noteId != -1L)
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val noteId = arguments?.getLong("note_id", -1L) ?: -1L
        viewModel.loadNote(noteId.takeIf { it != -1L })

        setupToolbar()
        setupFabs()
        setupCategoryChip()
        setupTaskListAutoComplete()
        observeUiState()
        observeCategory()
        observeFavorite()
        observeDraftRestored()
        observeFieldsOnce()
        setupBackHandler()
        applyFontSize()
    }

    // =========================================================================
    // Toolbar
    // =========================================================================

    private fun setupToolbar() {
        requireActivity().addMenuProvider(object : MenuProvider {
            override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {
                menuInflater.inflate(R.menu.toolbar_editor_menu, menu)
            }

            override fun onPrepareMenu(menu: Menu) {
                menu.findItem(R.id.action_save)?.isVisible = !isPreviewMode
            }

            override fun onMenuItemSelected(menuItem: MenuItem): Boolean = when (menuItem.itemId) {
                android.R.id.home -> {
                    handleExitAttempt()
                    true
                }
                R.id.action_save -> {
                    saveInPlace()
                    true
                }
                else -> false
            }
        }, viewLifecycleOwner, Lifecycle.State.RESUMED)
    }

    /** Saves the note locally and triggers server sync without closing the editor. */
    private fun saveInPlace() {
        val currentTitle = binding.etTitle.text?.toString() ?: ""
        val rawContent = binding.etContent.text?.toString() ?: ""
        val currentContent = cleanEmptyTaskLines(rawContent)
        if (currentContent != rawContent) {
            binding.etContent.setText(currentContent)
            binding.etContent.setSelection(currentContent.length)
        }
        val currentCategory = viewModel.category.value
        val currentFavorite = viewModel.isFavorite.value

        if (currentTitle.isBlank() && currentContent.isBlank()) {
            return
        }

        viewModel.autoSave(currentTitle, currentContent, currentCategory, currentFavorite)
        Snackbar.make(binding.root, R.string.editor_note_saved, Snackbar.LENGTH_SHORT).show()
    }

    /** Live-update the ActionBar title as the user types in et_title. */
    private fun setupTitleInToolbar() {
        val appCompatActivity = requireActivity() as? androidx.appcompat.app.AppCompatActivity
        val updateTitle: (String?) -> Unit = { text ->
            appCompatActivity?.supportActionBar?.title =
                text?.trim()?.ifBlank { getString(R.string.editor_title_hint) }
        }
        // Initial value
        updateTitle(binding.etTitle.text?.toString())
        // Track edits
        binding.etTitle.addTextChangedListener { editable ->
            updateTitle(editable?.toString())
        }
    }

    // =========================================================================
    // Material 3 FABs
    // =========================================================================

    private fun setupFabs() {
        // Bottom-Left: Favorite Toggle
        binding.fabFavorite.setOnClickListener {
            viewModel.toggleFavorite()
        }

        // Bottom-Right: Preview/Edit Mode Toggle
        binding.fabMode.setOnClickListener {
            togglePreviewMode()
        }

        // Bottom-Right: Overflow Actions Menu (3 dots)
        binding.fabMore.setOnClickListener {
            showActionsBottomSheet()
        }
    }

    private fun observeFavorite() {
        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.isFavorite.collect { isFav ->
                    binding.fabFavorite.setImageResource(
                        if (isFav) R.drawable.ic_star_filled
                        else R.drawable.ic_star_outline
                    )
                }
            }
        }
    }

    private fun observeDraftRestored() {
        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.hasRestoredDraft.collect { restored ->
                    if (restored) {
                        Snackbar.make(binding.root, R.string.editor_draft_restored, Snackbar.LENGTH_LONG)
                            .setAction(R.string.action_discard) {
                                viewModel.discardDraft()
                                binding.etTitle.setText(viewModel.title.value)
                                binding.etContent.setText(viewModel.content.value)
                                if (isPreviewMode) {
                                    applyMode(true)
                                }
                            }
                            .show()
                    }
                }
            }
        }
    }

    private fun showActionsBottomSheet() {
        val currentContent = binding.etContent.text?.toString() ?: ""
        val sheet = EditorActionsBottomSheet.newInstance(isFullChecklist(currentContent))
        sheet.onToggleCheckboxesListener = {
            toggleChecklistMode()
        }
        sheet.onCategoryClickListener = {
            CategoryPickerBottomSheet
                .newInstance(viewModel.category.value)
                .show(childFragmentManager, CategoryPickerBottomSheet.TAG)
        }
        sheet.onDeleteClickListener = {
            showDeleteConfirmationDialog()
        }
        sheet.show(childFragmentManager, EditorActionsBottomSheet.TAG)
    }

    // =========================================================================
    // Checklist Conversion & Delete Actions
    // =========================================================================

    private fun isFullChecklist(text: String): Boolean {
        val nonBlankLines = text.lines().filter { it.isNotBlank() }
        if (nonBlankLines.isEmpty()) return false
        return nonBlankLines.all { it.matches(Regex("""^\s*[-*]\s*\[[ xX]?\].*""")) }
    }

    /**
     * Toggles the entire note content between checklist format and plain text.
     */
    private fun toggleChecklistMode() {
        val currentContent = binding.etContent.text?.toString() ?: ""
        val newContent = if (isFullChecklist(currentContent)) {
            // Convert checklist ➔ plain text (strip checkboxes and strikethroughs)
            currentContent.lines().joinToString("\n") { line ->
                val withoutPrefix = line.replace(Regex("""^\s*[-*]\s*\[[ xX]?\]\s*"""), "")
                if (withoutPrefix.startsWith("~~") && withoutPrefix.endsWith("~~") && withoutPrefix.length >= 4) {
                    withoutPrefix.substring(2, withoutPrefix.length - 2)
                } else {
                    withoutPrefix
                }
            }
        } else {
            // Convert plain text ➔ checklist (add "- [ ] " to each non-empty line)
            currentContent.lines().joinToString("\n") { line ->
                if (line.isBlank()) {
                    line
                } else if (line.matches(Regex("""^\s*[-*]\s*\[[ xX]?\].*"""))) {
                    line
                } else {
                    "- [ ] $line"
                }
            }
        }

        binding.etContent.setText(newContent)

        if (isPreviewMode) {
            val title = binding.etTitle.text?.toString()?.trim() ?: ""
            val contentToRender = if (title.isNotBlank()) {
                val firstLine = newContent.substringBefore('\n').trim()
                if (firstLine == title) {
                    newContent.substringAfter('\n', missingDelimiterValue = "").trimStart('\n')
                } else {
                    newContent
                }
            } else {
                newContent
            }
            renderMarkdownWithLargeCheckboxes(contentToRender)
        }
    }

    private fun showDeleteConfirmationDialog() {
        if (settingsStorage.isConfirmDeleteNote()) {
            MaterialAlertDialogBuilder(requireContext())
                .setTitle(R.string.delete_note_title)
                .setMessage(R.string.delete_note_message)
                .setPositiveButton(R.string.action_delete) { _, _ ->
                    viewModel.deleteNote()
                }
                .setNegativeButton(R.string.cancel, null)
                .show()
        } else {
            viewModel.deleteNote()
        }
    }

    // =========================================================================
    // Category Chip
    // =========================================================================

    private fun setupCategoryChip() {
        binding.chipCategory.setOnClickListener {
            if (!isPreviewMode) {
                CategoryPickerBottomSheet
                    .newInstance(viewModel.category.value)
                    .show(childFragmentManager, CategoryPickerBottomSheet.TAG)
            }
        }
    }

    private fun observeCategory() {
        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.category.collect { category ->
                    updateCategoryChip(category)
                }
            }
        }
    }

    private fun updateCategoryChip(category: String) {
        if (category.isBlank()) {
            if (isPreviewMode) {
                binding.rowCategory.visibility = View.GONE
            } else {
                binding.rowCategory.visibility = View.VISIBLE
                binding.chipCategory.text = getString(R.string.editor_add_category)
                binding.chipCategory.isClickable = true
            }
        } else {
            binding.rowCategory.visibility = View.VISIBLE
            binding.chipCategory.text = category
            binding.chipCategory.isClickable = !isPreviewMode
        }
    }

    // =========================================================================
    // Preview / Edit toggle
    // =========================================================================

    private fun togglePreviewMode() {
        val nextMode = !isPreviewMode
        if (nextMode) {
            val currentTitle = binding.etTitle.text?.toString() ?: ""
            val rawContent = binding.etContent.text?.toString() ?: ""
            val currentContent = cleanEmptyTaskLines(rawContent)
            val currentCategory = viewModel.category.value
            val currentFavorite = viewModel.isFavorite.value

            if (viewModel.hasChanges(currentTitle, currentContent, currentCategory, currentFavorite)) {
                if (!settingsStorage.isConfirmSaveOnExit()) {
                    viewModel.autoSave(currentTitle, currentContent, currentCategory, currentFavorite)
                } else {
                    viewModel.saveDraft(currentTitle, currentContent, currentCategory, currentFavorite)
                }
            }
        }
        applyMode(nextMode)
    }

    private fun applyMode(preview: Boolean) {
        isPreviewMode = preview
        if (isPreviewMode) {
            // --- Switch to Preview ---
            // Clean empty checklist lines when switching to Preview mode
            val rawContent = binding.etContent.text?.toString() ?: ""
            val cleanedContent = cleanEmptyTaskLines(rawContent)
            if (cleanedContent != rawContent) {
                binding.etContent.setText(cleanedContent)
            }

            val title = binding.etTitle.text?.toString()?.trim() ?: ""
            val contentToRender = if (title.isNotBlank()) {
                val firstLine = cleanedContent.substringBefore('\n').trim()
                if (firstLine == title) {
                    cleanedContent.substringAfter('\n', missingDelimiterValue = "").trimStart('\n')
                } else {
                    cleanedContent
                }
            } else {
                cleanedContent
            }

            renderMarkdownWithLargeCheckboxes(contentToRender)

            binding.titleContainer.visibility = View.GONE    // title is in toolbar
            binding.scrollContent.visibility  = View.GONE
            binding.scrollPreview.visibility  = View.VISIBLE
            binding.fabMode.setImageResource(R.drawable.ic_edit)
            updateCategoryChip(viewModel.category.value)
            hideKeyboard()
        } else {
            // --- Switch to Edit ---
            binding.scrollPreview.visibility  = View.GONE
            binding.titleContainer.visibility = View.VISIBLE
            binding.scrollContent.visibility  = View.VISIBLE
            binding.fabMode.setImageResource(R.drawable.ic_preview)
            updateCategoryChip(viewModel.category.value)
        }
        requireActivity().invalidateOptionsMenu()
    }

    // =========================================================================
    // Markdown rendering with interactive checkboxes
    // =========================================================================

    private var touchDownX = 0f
    private var touchDownY = 0f

    private fun applyFontSize() {
        val fontSize = settingsStorage.getEditorFontSize()
        binding.etContent.setTextSize(TypedValue.COMPLEX_UNIT_SP, fontSize.editorContentSp)
        binding.tvPreview.setTextSize(TypedValue.COMPLEX_UNIT_SP, fontSize.editorContentSp)
    }

    private fun renderMarkdownWithLargeCheckboxes(content: String) {
        val formattedContent = MarkwonFactory.formatChecklistStrikethrough(content)
        val fontSize = settingsStorage.getEditorFontSize()

        val markwon = MarkwonFactory.createForEditor(requireContext(), fontSize.editorCheckboxDp)
        markwon.setMarkdown(binding.tvPreview, formattedContent)

        val touchSlop = ViewConfiguration.get(requireContext()).scaledTouchSlop

        binding.tvPreview.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    touchDownX = event.x
                    touchDownY = event.y
                    false
                }
                MotionEvent.ACTION_UP -> {
                    val deltaX = Math.abs(event.x - touchDownX)
                    val deltaY = Math.abs(event.y - touchDownY)
                    if (deltaX < touchSlop && deltaY < touchSlop) {
                        handleCheckboxTouch(event.x, event.y)
                    } else {
                        false
                    }
                }
                else -> false
            }
        }
    }

    private fun handleCheckboxTouch(touchX: Float, touchY: Float): Boolean {
        val layout = binding.tvPreview.layout ?: return false
        val totalPaddingTop = binding.tvPreview.totalPaddingTop
        val totalPaddingBottom = binding.tvPreview.totalPaddingBottom
        val viewHeight = binding.tvPreview.height

        if (touchY < totalPaddingTop || touchY > viewHeight - totalPaddingBottom) {
            return false
        }

        val y = touchY - totalPaddingTop
        if (y < 0f || y >= layout.height) return false

        val line = layout.getLineForVertical(y.toInt())
        if (line < 0 || line >= layout.lineCount) return false

        val lineStart = layout.getLineStart(line)
        val lineEnd = layout.getLineEnd(line)

        val text = binding.tvPreview.text
        val spannable = text as? Spanned ?: return false

        // Check if the user tapped on a link (ClickableSpan/URLSpan) so links remain clickable
        val offset = layout.getOffsetForHorizontal(line, touchX)
        if (offset in lineStart until lineEnd) {
            val clickableSpans = spannable.getSpans(offset, offset + 1, ClickableSpan::class.java)
            if (clickableSpans.isNotEmpty()) {
                return false
            }
        }

        // Look specifically for TaskListSpan (attached exclusively to task list items by Markwon TaskListPlugin)
        val taskSpans = spannable.getSpans(lineStart, lineEnd, TaskListSpan::class.java)
        if (taskSpans.isEmpty()) return false

        // For nested/child checklists, Markwon's parent list span covers the child's text range as well.
        // The child span starts at or after lineStart, whereas the parent span started on an earlier line.
        // Selecting the span with maximum spanStart correctly targets the innermost (child) item.
        val tappedSpan = taskSpans.maxByOrNull { spannable.getSpanStart(it) } ?: return false

        // All TaskListSpans in document order (guaranteed 1:1 match with markdown task list items)
        val allTaskSpans = spannable.getSpans(0, spannable.length, TaskListSpan::class.java)
            .sortedBy { spannable.getSpanStart(it) }
        val tappedIndex = allTaskSpans.indexOf(tappedSpan)
        if (tappedIndex != -1) {
            toggleTaskAtIndex(tappedIndex)
            return true
        }
        return false
    }

    private fun toggleTaskAtIndex(targetIndex: Int) {
        val fullContent = binding.etContent.text?.toString() ?: return
        val taskRegex = Regex("""^(\s*[-*+]\s*\[)([ xX])(\]\s*)(.*)$""", RegexOption.MULTILINE)
        var count = 0

        val newContent = taskRegex.replace(fullContent) { matchResult ->
            if (count == targetIndex) {
                count++
                val prefix = matchResult.groupValues[1]
                val current = matchResult.groupValues[2]
                val suffix = matchResult.groupValues[3]
                val body = matchResult.groupValues[4]
                val isCurrentlyChecked = current.trim().isNotEmpty()
                val trimmed = body.trim()

                if (isCurrentlyChecked) {
                    // Was checked [x] -> uncheck to [ ] and remove ~~strikethrough~~ if present
                    val cleanBody = if (trimmed.startsWith("~~") && trimmed.endsWith("~~") && trimmed.length >= 4) {
                        trimmed.substring(2, trimmed.length - 2).trim()
                    } else {
                        body
                    }
                    "${prefix} $suffix$cleanBody"
                } else {
                    // Was unchecked [ ] -> check to [x] and add ~~strikethrough~~
                    val cleanBody = if (trimmed.startsWith("~~") && trimmed.endsWith("~~") && trimmed.length >= 4) {
                        trimmed.substring(2, trimmed.length - 2).trim()
                    } else {
                        body.trim()
                    }
                    "${prefix}x$suffix~~$cleanBody~~"
                }
            } else {
                count++
                matchResult.value
            }
        }

        binding.etContent.setText(newContent)

        val currentTitle = binding.etTitle.text?.toString() ?: ""
        val currentCategory = viewModel.category.value
        val currentFavorite = viewModel.isFavorite.value

        if (!settingsStorage.isConfirmSaveOnExit()) {
            viewModel.autoSave(currentTitle, newContent, currentCategory, currentFavorite)
        } else {
            viewModel.saveDraft(currentTitle, newContent, currentCategory, currentFavorite)
        }

        val title = binding.etTitle.text?.toString()?.trim() ?: ""
        val contentToRender = if (title.isNotBlank()) {
            val firstLine = newContent.substringBefore('\n').trim()
            if (firstLine == title) {
                newContent.substringAfter('\n', missingDelimiterValue = "").trimStart('\n')
            } else {
                newContent
            }
        } else {
            newContent
        }

        renderMarkdownWithLargeCheckboxes(contentToRender)
    }

    // =========================================================================
    // Auto-continue checklist on Enter in Edit mode
    // =========================================================================

    private fun setupTaskListAutoComplete() {
        var isNewlineInserted = false
        var newlinePos = -1

        binding.etContent.addTextChangedListener(
            beforeTextChanged = { _, _, _, _ -> },
            onTextChanged = { s, start, before, count ->
                if (isInsertingTaskPrefix) return@addTextChangedListener
                // Detect when a single newline character was typed or inserted
                if (count == 1 && before == 0 && s?.getOrNull(start) == '\n') {
                    isNewlineInserted = true
                    newlinePos = start
                } else {
                    isNewlineInserted = false
                    newlinePos = -1
                }
            },
            afterTextChanged = { s: Editable? ->
                if (s == null || isInsertingTaskPrefix) return@addTextChangedListener

                if (!isNewlineInserted || newlinePos < 0 || newlinePos >= s.length || s[newlinePos] != '\n') {
                    return@addTextChangedListener
                }

                isNewlineInserted = false
                val pos = newlinePos
                newlinePos = -1

                // Line before newline: from character after preceding '\n' up to pos
                val lineStart = s.lastIndexOf('\n', pos - 1).let { if (it == -1) 0 else it + 1 }
                val lineBefore = s.subSequence(lineStart, pos).toString()

                // Line after newline: from pos + 1 up to next '\n' (or end of text)
                val lineEnd = s.indexOf('\n', pos + 1).let { if (it == -1) s.length else it }
                val lineAfter = s.subSequence(pos + 1, lineEnd).toString()

                val taskRegex = Regex("""^(\s*)[-*]\s*\[[ xX]?\]\s*(.*)$""")
                val emptyTaskRegex = Regex("""^(\s*)[-*]\s*\[[ xX]?\]\s*$""")

                val matchBefore = taskRegex.find(lineBefore)
                val matchAfter = taskRegex.find(lineAfter)

                when {
                    // Case 1: Pressed Enter at the START of an existing checklist item:
                    // e.g. cursor was at "|- [ ] Item 2".
                    // lineBefore is blank (the newly inserted line before Item 2), lineAfter is "- [ ] Item 2".
                    lineBefore.isBlank() && matchAfter != null -> {
                        val indent = matchAfter.groupValues[1]
                        val prefix = "$indent- [ ] "
                        isInsertingTaskPrefix = true
                        s.replace(lineStart, pos, prefix)
                        val targetCursor = lineStart + prefix.length
                        Selection.setSelection(s, targetCursor)
                        binding.etContent.post {
                            binding.etContent.setSelection(targetCursor)
                        }
                        isInsertingTaskPrefix = false
                    }

                    // Case 2: Pressed Enter on an EMPTY checklist item (e.g. "- [ ] " with no text) to exit checklist:
                    matchBefore != null && emptyTaskRegex.matches(lineBefore) && lineAfter.isEmpty() -> {
                        isInsertingTaskPrefix = true
                        s.delete(lineStart, pos)
                        isInsertingTaskPrefix = false
                    }

                    // Case 3: Pressed Enter right after "- [ ] " before existing text (e.g. "- [ ] |Item 2"):
                    // Splits the item into a new empty item above and keeps the item below.
                    matchBefore != null && emptyTaskRegex.matches(lineBefore) && lineAfter.isNotEmpty() -> {
                        val indent = matchBefore.groupValues[1]
                        val prefix = "$indent- [ ] "
                        isInsertingTaskPrefix = true
                        s.insert(pos + 1, prefix)
                        val targetCursor = pos
                        Selection.setSelection(s, targetCursor)
                        binding.etContent.post {
                            binding.etContent.setSelection(targetCursor)
                        }
                        isInsertingTaskPrefix = false
                    }

                    // Case 4: Pressed Enter at the end of (or within) a checklist item with text:
                    // e.g. "- [ ] Item 1|" -> user presses Enter.
                    matchBefore != null -> {
                        val indent = matchBefore.groupValues[1]
                        val prefix = "$indent- [ ] "
                        isInsertingTaskPrefix = true
                        s.insert(pos + 1, prefix)
                        val targetCursor = pos + 1 + prefix.length
                        Selection.setSelection(s, targetCursor)
                        binding.etContent.post {
                            binding.etContent.setSelection(targetCursor)
                        }
                        isInsertingTaskPrefix = false
                    }
                }
            }
        )
    }

    // =========================================================================
    // Observers
    // =========================================================================

    private fun observeUiState() {
        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state ->
                    when (state) {
                        is EditorUiState.Loading -> {
                            binding.progressBar.visibility    = View.VISIBLE
                            binding.titleContainer.visibility = View.GONE
                            binding.rowCategory.visibility    = View.GONE
                            binding.scrollContent.visibility  = View.GONE
                            binding.scrollPreview.visibility  = View.GONE
                        }
                        is EditorUiState.Editing -> {
                            binding.progressBar.visibility = View.GONE
                            if (fieldsPopulated) {
                                applyMode(isPreviewMode)
                            }
                            requireActivity().invalidateOptionsMenu()
                        }
                        is EditorUiState.Saving -> {
                            binding.progressBar.visibility = View.VISIBLE
                            binding.etTitle.isEnabled = false
                            binding.etContent.isEnabled = false
                            binding.fabMode.isEnabled = false
                            binding.fabFavorite.isEnabled = false
                            binding.fabMore.isEnabled = false
                        }
                        is EditorUiState.Saved  -> findNavController().popBackStack()
                        is EditorUiState.Error  -> {
                            binding.progressBar.visibility = View.GONE
                            val text = if (state.messageRes != null) {
                                getString(state.messageRes)
                            } else {
                                state.message ?: getString(R.string.error_generic)
                            }
                            Snackbar.make(binding.root, text, Snackbar.LENGTH_LONG).show()
                        }
                    }
                }
            }
        }
    }

    private fun observeFieldsOnce() {
        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state ->
                    if (state is EditorUiState.Editing && !fieldsPopulated) {
                        fieldsPopulated = true

                        val currentTitle = binding.etTitle.text?.toString()
                        val currentContent = binding.etContent.text?.toString()

                        if (currentTitle.isNullOrEmpty() && currentContent.isNullOrEmpty()) {
                            binding.etTitle.setText(viewModel.title.value)
                            binding.etContent.setText(viewModel.content.value)
                        }

                        setupTitleInToolbar()
                        applyMode(isPreviewMode)
                    }
                }
            }
        }
    }

    // =========================================================================
    // Back press / save
    // =========================================================================

    private fun setupBackHandler() {
        requireActivity().onBackPressedDispatcher.addCallback(
            viewLifecycleOwner,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    handleExitAttempt()
                }
            }
        )
    }

    private fun handleExitAttempt() {
        val currentTitle = binding.etTitle.text?.toString() ?: ""
        val rawContent = binding.etContent.text?.toString() ?: ""
        val currentContent = cleanEmptyTaskLines(rawContent)
        val currentCategory = viewModel.category.value
        val currentFavorite = viewModel.isFavorite.value

        if (viewModel.hasChanges(currentTitle, currentContent, currentCategory, currentFavorite)) {
            if (settingsStorage.isConfirmSaveOnExit()) {
                MaterialAlertDialogBuilder(requireContext())
                    .setTitle(R.string.save_changes_title)
                    .setMessage(R.string.save_changes_message)
                    .setPositiveButton(R.string.action_save) { _, _ ->
                        viewModel.saveNote(
                            titleText = currentTitle,
                            contentText = currentContent,
                            categoryText = currentCategory,
                            favorite = currentFavorite
                        )
                    }
                    .setNegativeButton(R.string.action_discard) { _, _ ->
                        viewModel.discardDraft()
                        findNavController().popBackStack()
                    }
                    .setNeutralButton(R.string.cancel, null)
                    .show()
            } else {
                // Auto-save changes without confirmation
                viewModel.saveNote(
                    titleText = currentTitle,
                    contentText = currentContent,
                    categoryText = currentCategory,
                    favorite = currentFavorite
                )
            }
        } else {
            findNavController().popBackStack()
        }
    }

    /**
     * Strips empty checklist items (e.g. "- [ ]", "- [ ]  ", "  - [x]") from text.
     */
    private fun cleanEmptyTaskLines(text: String): String {
        val emptyTaskRegex = Regex("""^\s*[-*]\s*\[[ xX]?\]\s*$""")
        return text.lines()
            .filterNot { emptyTaskRegex.matches(it) }
            .joinToString("\n")
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    private fun hideKeyboard() {
        val imm = requireContext()
            .getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(binding.root.windowToken, 0)
    }

    override fun onPause() {
        super.onPause()
        val currentTitle = binding.etTitle.text?.toString() ?: ""
        val rawContent = binding.etContent.text?.toString() ?: ""
        val currentContent = cleanEmptyTaskLines(rawContent)
        val currentCategory = viewModel.category.value
        val currentFavorite = viewModel.isFavorite.value

        if (viewModel.hasChanges(currentTitle, currentContent, currentCategory, currentFavorite)) {
            if (!settingsStorage.isConfirmSaveOnExit()) {
                viewModel.autoSave(currentTitle, currentContent, currentCategory, currentFavorite)
            } else {
                viewModel.saveDraft(currentTitle, currentContent, currentCategory, currentFavorite)
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putBoolean(KEY_PREVIEW_MODE, isPreviewMode)
        outState.putString(KEY_SAVED_TITLE, binding.etTitle.text?.toString())
        outState.putString(KEY_SAVED_CONTENT, binding.etContent.text?.toString())
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    companion object {
        private const val KEY_PREVIEW_MODE = "preview_mode"
        private const val KEY_SAVED_TITLE = "saved_title"
        private const val KEY_SAVED_CONTENT = "saved_content"
    }
}
