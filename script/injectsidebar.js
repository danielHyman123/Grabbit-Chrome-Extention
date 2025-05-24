/* Checks if the sidebar is already open
   If it is, remove it. If not, create it. */

if (!document.getElementById('myExtensionSidebar')) {
    // Toggle it on
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'myExtensionSidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '250px';
    sidebar.style.height = '100vh';
    sidebar.style.backgroundColor = '#111';
    sidebar.style.color = 'white';
    sidebar.style.padding = '10px';
    sidebar.style.zIndex = '9999';
    sidebar.style.boxSizing = 'border-box';
    sidebar.style.overflowY = 'auto';
    
    sidebar.innerHTML = `
        <h1 style="margin-top: 0; font-size: 18px;">My Notes</h1>
        <p style="font-size: 12px; color: #ccc; margin-bottom: 15px;">Click notes to copy to clipboard</p>
        <div id="notesContainer" style="margin-top: 10px;"></div>
    `;
    
    document.body.appendChild(sidebar);
    document.documentElement.style.marginRight = '250px';
    document.body.style.marginRight = '250px';
    
    // Initialize the notes UI after sidebar is created
    setTimeout(initNotesUI, 100); // Small delay to ensure DOM is ready
} else {
    // Toggle it off
    document.getElementById('myExtensionSidebar').remove();
    document.documentElement.style.marginRight = '';
    document.body.style.marginRight = '';
}

// Listen for messages from the popup/extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);

    const container = document.getElementById('notesContainer');
    if (!container) {
        console.warn("notesContainer not found");
        return;
    }

    if (message.type === 'new_note') {
        // Add the new note to the sidebar
        addTextToDOM(message.note, container);
        sendResponse({success: true});
    } else if (message.type === 'clear_notes') {
        // Clear all notes from sidebar
        container.innerHTML = '';
        sendResponse({success: true});
    }
});

// Note: We can't load external scripts in injected content
// Instead, we need to define the functions here or load them differently

// Copy of initNotesUI function for the sidebar context
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

// Copy of addTextToDOM function for the sidebar context
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
    btn.style.fontSize = '12px';
    btn.style.textAlign = 'left';
    btn.style.wordWrap = 'break-word';
    
    // Add click handler to copy note to clipboard
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(noteText).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '#333';
            }, 1000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
    
    container.appendChild(btn);
}