/* Chrome storage API is used to store data in the browser.
   By: Daniel */

// Check if we're in the popup/extension page context
if (document.getElementById('containerID')) {
    // This is the popup page - handle save button
    const textarea = document.getElementById('containerID');
    const saveButton = document.getElementById('saveButton');
    // const deleteButton = document.getElementById('deleteButton');

    // Load existing note content when page loads
    chrome.storage.local.get(['currentNote'], (result) => {
        if (result.currentNote) {
            textarea.value = result.currentNote;
        }
    });

    // Save button handler for popup
    saveButton.addEventListener('click', () => {
        console.log("Save button clicked");
        const noteText = textarea.value.trim();
        if (noteText === '') return;

        // Save to chrome storage
        chrome.storage.local.get(['notes'], (result) => {
            const notes = result.notes || [];
            notes.push(noteText);
            
            chrome.storage.local.set({ 
                notes: notes,
                currentNote: '' // Clear current note after saving
            }, () => {
                console.log("Note saved:", noteText);
                textarea.value = ''; // Clear textarea

                // Send message to background script to update sidebar
                chrome.runtime.sendMessage({
                    action: 'updateSidebar',
                    noteText: noteText
                });
            });
        }); 
    });

    // Auto-save current text as user types (optional)
    textarea.addEventListener('input', () => {
        chrome.storage.local.set({ currentNote: textarea.value });
    });
}