/* Chrome storage API is used to store data in the browser.
   By: Daniel */

// Check if we're in the popup/extension page context
if (document.getElementById('containerID')) {
    // This is the popup page - handle save button
    const textarea = document.getElementById('containerID');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');

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
                
                // Send message to content script to update sidebar
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'new_note',
                        note: noteText
                    });
                });
            });
        });
    });

    // Auto-save current text as user types (optional)
    textarea.addEventListener('input', () => {
        chrome.storage.local.set({ currentNote: textarea.value });
    });

    // Delete button handler
    deleteButton.addEventListener('click', () => {
        chrome.storage.local.set({ notes: [] }, () => {
            console.log("All notes deleted");
            // Send message to content script to clear sidebar
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'clear_notes'
                });
            });
        });
    });
}

// Function for saving notes in sidebar (called from injectsidebar.js)
function initNotesUI() {
    console.log("Initializing notes UI in sidebar");
    const container = document.getElementById('notesContainer');
    
    if (!container) {
        console.warn("notesContainer not found");
        return;
    }

    // Load saved notes
    chrome.storage.local.get(['notes'], (result) => {
        const notes = result.notes || [];
        container.innerHTML = ''; // Clear existing content
        notes.forEach(note => addTextToDOM(note, container));
    });
}

// Function displays the text in the sidebar
function addTextToDOM(noteText, container) {
    const btn = document.createElement('button');
    btn.textContent = noteText;
    btn.style.display = 'block';
    btn.style.margin = '5px 0';
    btn.style.width = '90%';
    btn.style.padding = '8px';
    btn.style.backgroundColor = '#333';
    btn.style.color = 'white';
    btn.style.border = '1px solid #555';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    
    // Add click handler to edit/copy note
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(noteText).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = noteText;
            }, 1000);
        });
    });
    
    container.appendChild(btn);
}