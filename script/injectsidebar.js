function toggleOnSidebar() {
    // Initialize the notes UI after sidebar is created
    setTimeout(initNotesUI, 100); // Small delay to ensure DOM is ready
    if (!document.getElementById('myExtensionSidebar')) {
        createSidebar(); // Create the sidebar if it doesn't exist
        createSidebarToggleBtn(); // Create the toggle button
        createNoteDisplay();
        switchToDefaultMode(); // note mode is hidden by default
    } else {
        const sidebar = document.getElementById('myExtensionSidebar');
        const toggle = document.getElementById('toggleSidebar');
        sidebar.style.display = 'block';
        toggle.style.display = 'flex';
        toggle.style.right = window.SIDEBARWIDTH + 'vw';
        toggle.innerHTML = '>';
        document.body.style.marginRight = window.SIDEBARWIDTH + 'vw';
        // Add sidebar toggle margin
        const newMargin = 10 + getMarginRightPixel() + 'px';
        document.body.style.marginRight = newMargin;
    }
}

function toggleOffSidebar() {
    if (!document.getElementById('myExtensionSidebar')) return;
    const sidebar = document.getElementById('myExtensionSidebar');
    sidebar.style.display = 'none';
    document.body.style.marginRight = '10px';
    const toggle = document.getElementById('toggleSidebar');
    toggle.style.right = '0';
    toggle.innerHTML = '<';
}

function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'myExtensionSidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = window.SIDEBARWIDTH + 'vw';
    sidebar.style.height = '100vh';
    sidebar.style.backgroundColor = '#111';
    sidebar.style.color = 'white';
    sidebar.style.padding = '10px';
    sidebar.style.zIndex = '9999';
    sidebar.style.boxSizing = 'border-box';
    sidebar.style.overflowY = 'auto';

    //Create top wrapper with title and plus button
    const topWrapper = document.createElement('div');
    topWrapper.style.display = 'flex';  //Insures elements inside this div will be side by side
    topWrapper.style.alignItems = 'center';
    topWrapper.style.margin = '5px 0';
    topWrapper.style.justifyContent = 'space-between'; // space between title and button

    //Create title 
    const title = document.createElement('h1');
    title.style.fontSize = '18px';
    title.textContent = 'My Notes';
    title.style.marginTop = '0';

    //Create PLUS button
    const plusButton = document.createElement('button');
    plusButton.id = " plusButton"
    plusButton.textContent = '+';
    plusButton.style.border = '1px solid gray';
    plusButton.style.color = 'white';
    plusButton.style.backgroundColor = '#333';
    plusButton.style.cursor = 'pointer';
    plusButton.style.padding = '4px 8px';
    plusButton.style.borderRadius = '4px';
    plusButton.style.fontSize = '16px';

    //Add title and + button to top wrapper
    topWrapper.appendChild(title);
    topWrapper.appendChild(plusButton);

    //Create user instructions
    const instructions = document.createElement('p');
    instructions.textContent = 'Click notes to copy to clipboard';
    instructions.style.fontSize = '12px';
    instructions.style.color = '#ccc';
    instructions.style.marginBottom = '15px';

    // Create notes container
    const notesContainer = document.createElement('div');
    notesContainer.id = 'notesContainer';
    notesContainer.style.marginTop = '10px';

    // Create a second container
    const contentContainer = document.createElement('div');
    contentContainer.id = 'contentContainer';

    //Append everything to container
    contentContainer.appendChild(topWrapper);
    contentContainer.appendChild(instructions);
    contentContainer.appendChild(notesContainer);

    // Apend container to sidebar
    sidebar.appendChild(contentContainer);

    document.body.appendChild(sidebar);
    document.body.style.marginRight = window.SIDEBARWIDTH + 'vw';

    //+ button click handler to open notes.html
    plusButton.addEventListener('click', openNotes);
}

function createSidebarToggleBtn() {
    // Toggle Button styles
    const sidebarToggleBtn = document.createElement('button');
    sidebarToggleBtn.id = 'toggleSidebar';
    sidebarToggleBtn.innerHTML = ">";
    sidebarToggleBtn.style.position = 'absolute';
    sidebarToggleBtn.style.right = window.SIDEBARWIDTH + 'vw';
    sidebarToggleBtn.style.top = '0';
    sidebarToggleBtn.style.width = '10px';
    sidebarToggleBtn.style.height = '100vh';
    sidebarToggleBtn.style.zIndex = '9999';
    sidebarToggleBtn.style.cursor = 'pointer';
    sidebarToggleBtn.style.display = 'flex';
    sidebarToggleBtn.style.alignItems = 'center';
    sidebarToggleBtn.style.justifyContent = 'center';
    sidebarToggleBtn.style.fontSize = '18px';
    sidebarToggleBtn.style.backgroundColor = '#333';
    sidebarToggleBtn.style.color = 'white';
    sidebarToggleBtn.style.border = 'none';
    sidebarToggleBtn.style.outline = 'none';
    document.body.appendChild(sidebarToggleBtn);
    const newMargin = 10 + getMarginRightPixel() + 'px';
    document.body.style.marginRight = newMargin;
    // Toggle button click handler
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
}

function createNoteDisplay() {
    const sidebar = document.getElementById('myExtensionSidebar');

    // Create overall container
    const noteContainer = document.createElement('div');
    noteContainer.id = 'noteContainer';
    noteContainer.style.display = 'flex';
    noteContainer.style.flexDirection = 'column';
    noteContainer.style.alignItems = 'center';
    noteContainer.style.justifyContent = 'space-between';
    noteContainer.style.height = '100%';

    //  The title
    const noteTitle = document.createElement('h2');
    noteTitle.id = 'noteTitle';
    noteTitle.style.fontSize = '16px';
    noteTitle.contentEditable = true;
    noteTitle.style.padding = '4px';
    noteTitle.style.width = '50%';
    noteTitle.style.textAlign = 'center';
    noteTitle.style.translate = '-30%';

    // Back button
    const backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.style.fontSize = '12px';
    backButton.style.width = '20px';
    backButton.style.height = '20px';
    backButton.style.backgroundColor = '#FFFFFF';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.padding = '4px 8px';
    backButton.style.borderRadius = '4px';
    backButton.style.cursor = 'pointer';
    backButton.style.backgroundImage = `url(${chrome.runtime.getURL('/back.jpg')})`;
    backButton.style.backgroundRepeat = 'no-repeat';
    backButton.style.backgroundPosition = 'center';
    backButton.style.backgroundSize = 'contain';
    backButton.style.backgroundColor = 'transparent';

    // Top Container
    const topContainer = document.createElement('div');
    topContainer.style.display = 'flex';
    topContainer.style.justifyContent = 'flex-start';
    topContainer.style.alignItems = 'start';
    topContainer.style.width = '100%';
    topContainer.style.height = '15%';
    topContainer.style.gap = '35%';
    topContainer.style.paddingTop = '5px';

    // The content
    const noteContent = document.createElement('p');
    noteContent.id = 'noteContent';
    noteContent.style.fontSize = '12px';
    noteContent.contentEditable = true;
    noteContent.style.width = '100%';
    noteContent.style.height = '95%';
    noteContent.style.marginTop = '-50px';
    noteContent.style.border = 'white';
    noteContent.style.borderWidth = '1.5px';
    noteContent.style.borderStyle = 'solid';
    noteContent.style.borderRadius = '5px';
    noteContent.style.padding = '6px'; 

    // Save button
    const saveButton = document.createElement('button');
    saveButton.id = 'noteSaveButton';
    saveButton.width = '100%';
    saveButton.height = '20px';
    saveButton.style.fontSize = '16px';
    saveButton.style.textAlign = 'center';
    saveButton.style.backgroundColor = '#084298';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.textContent = 'Save Note';

    // append top content
    topContainer.appendChild(backButton);
    topContainer.appendChild(noteTitle);
    noteContainer.appendChild(topContainer);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(saveButton);

    // action listener for back button	
    backButton.addEventListener('click', switchToDefaultMode);
    saveButton.addEventListener('click', async () => {
        const titleContent = noteTitle.textContent;
        const contentContent = noteContent.textContent;
        const noteId = noteContainer.dataset.id;
        await saveNote(noteId, titleContent, contentContent);
        // Also have to send message to background.js to update the sidebar
    });

    sidebar.appendChild(noteContainer);
}

function getMarginRightPixel() {
    const marginRight = window.getComputedStyle(document.body).marginRight;
    const actual = parseFloat(marginRight) || 0;
    console.log('the margin is: ' + actual);
    return actual;
}

async function switchToNoteMode(noteId) {
    console.log("switchToNoteMode called with id:", noteId);
    const sidebar = document.getElementById('contentContainer');
    const noteContainer = document.getElementById('noteContainer');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');

    sidebar.style.display = 'none';
    noteContainer.style.display = 'flex';
    noteContainer.dataset.id = noteId;

    const note = await getNote(noteId);
    console.log('the gotten note is: ', note);

    if (note) {
        noteTitle.textContent = note.title;
        noteContent.textContent = note.content;
    } else {
        noteTitle.textContent = 'Note not found';
        noteContent.textContent = '';
    }
}


function switchToDefaultMode() {
    const noteContainer = document.getElementById('noteContainer');
    const contentContainer = document.getElementById('contentContainer');
    noteContainer.style.display = 'none';
    contentContainer.style.display = '';
}

function getNote(noteId) {
    console.log("getNote called with id:", noteId);

    return new Promise((resolve) => {
        chrome.storage.local.get(['notes'], (result) => {
            console.log("chrome.storage.local.get returned:", result);
            const notes = result.notes || [];

            const foundNote = notes.find(theNote => {
                console.log("Checking note:", theNote);
                return String(theNote.id) === String(noteId);
            });

            console.log("Resolved note:", foundNote);
            resolve(foundNote);
        });
    });
}

function saveNote(noteId, title, content) {
    
    return new Promise((resolve) => {
        chrome.storage.local.get(['notes'], (result) => {
            const notes = result.notes || [];
            const noteIndex = notes.findIndex(note => String(note.id) === String(noteId));
            if (noteIndex !== -1) {
                notes[noteIndex].title = title;
                notes[noteIndex].content = content;
            } else {
                notes.push({ id: noteId, title: title, content: content });
            }
            chrome.storage.local.set({ notes: notes }, () => {
                console.log("Note saved:", noteId);
                showToast("Note Succesfully Saved!");
                resolve();
            });
        })
    })
}



/* Checks if the sidebar is already open
   If it is, remove it. If not, create it. 

   Creates new bookmark on sidebar when save button on notes.html is activated
   Implements Delete button function for every bookmark*/

window.SIDEBARWIDTH = 20;
// The modes options are : default, note
window.SIDEBAR_MODE = 'default';

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //Checks if the message is to refresh the sidebar
    if (message.action === 'refreshSidebar') {
        console.log("Received refresh request for note:", message.noteText);
        initNotesUI(); // Call the function to refresh the sidebar UI
        sendResponse({ success: true });  //Built-in chrome function which sends a response back to the sender(notes.js)
    }
});

// Toggle the sidebar
toggleSidebar();

// initNotesUI function to load existing notes into the sidebar
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

// Updated addTextToDOM function with delete functionality
function addTextToDOM(noteObj, container) {
    console.log("Adding note to sidebar:", noteObj);

    // Create wrapper div to hold both note button and delete button
    // Each pair of note and delete button bundle in one wapper
    const markWrapper = document.createElement('div');
    markWrapper.style.display = 'flex';
    markWrapper.style.alignItems = 'center';
    markWrapper.style.margin = '5px 0';
    markWrapper.style.gap = '5px';

    // Create the note button
    const btn = document.createElement('button');
    btn.textContent = noteObj.title;
    btn.style.flex = '1';
    btn.style.padding = '1vw 1vh';
    btn.style.backgroundColor = '#333';
    btn.style.color = 'white';
    btn.style.border = '1px solid #555';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '12px';
    btn.style.textAlign = 'left';
    btn.style.overflow = 'hidden';
    btn.style.textOverflow = 'ellipsis';
    btn.dataset.id = noteObj.id;

    // Add click handler to copy note to clipboard
    btn.addEventListener('click', (e) => {
        console.log("the note was called with the id: " + btn.dataset.id);
        switchToNoteMode(btn.dataset.id);
    });

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.backgroundColor = '#f44336';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = '1px solid #555';
    deleteBtn.style.padding = '1vw 1vh';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.width = window.SIDEBARWIDTH * 0.1 + 'vw';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.fontSize = '12px';
    deleteBtn.style.lineHeight = '1';
    deleteBtn.style.flexShrink = '0';
    deleteBtn.style.fontWeight = 'bold';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.justifyContent = 'center';
    deleteBtn.style.alignItems = 'center';

    // Add click handler for delete button
    deleteBtn.addEventListener('click', (e) => {
        /*e is short for event (I could also write (event) => {...} — it's the same thing)
        It contains details about the event that occurred:
            What type of event it was (click)
            What element triggered it
            Mouse position
            Whether modifier keys (Ctrl, Shift, etc.) were pressed, etc*/
        e.stopPropagation();
        console.log("Delete button clicked for:", noteObj);

        // Remove this specific note from Chrome storage
        chrome.storage.local.get(['notes'], (result) => {
            const notes = result.notes || [];
            const updatedNotes = notes.filter(note => note.id !== noteObj.id);

            chrome.storage.local.set({ notes: updatedNotes }, () => {
                console.log("Note deleted from storage:", noteObj);
                markWrapper.remove(); // Remove the entire wrapper (note + delete button)
            });
        });
    });

    // Add both buttons to wrapper
    markWrapper.appendChild(btn);
    markWrapper.appendChild(deleteBtn);

    // Add markWrapper to container
    container.appendChild(markWrapper);
}

// Function called in event listener to the plus button to open notes.html
function openNotes() {
    const notesWindow = window.open(chrome.runtime.getURL("notes.html"), "NoteTaker", "width=600,height=400");
    if (!notesWindow) {
        console.error("Failed to open notes window. Please allow pop-ups for this site.");
    } else {
        console.log("Notes window opened successfully.");
    }
}

function toggleSidebar() {
    console.log("sidebar is toggled from function");
    if (!document.getElementById('myExtensionSidebar') || document.getElementById('myExtensionSidebar').style.display === 'none') {
        toggleOnSidebar();
    } else {
        toggleOffSidebar();
    }
}

function showToast(message) {
    console.log("toast was called with message: " + message);
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = '#4CAF50';
    toast.style.color = 'white';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 0 10px rgba(23, 208, 63, 0.3)';
    toast.style.zIndex = '99999';
    toast.style.fontSize = '14px';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500); // Remove after fade out
    }, 1500); // Show for 1.5 seconds
}