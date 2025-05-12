let note_area = document.getElementById("note_area");
let save_but = document.getElementById("saveButton");
save_but.addEventListener('click', () => {
    sendNote(note_area.value);
    note_area.value = '';
})

/**
 * Send note data to background script for saving in local storage.
 *
 * @param {string} dat The note data to be saved.
 */
function sendNote(dat) {
    chrome.runtime.sendMessage({data: dat, event: 'saveNote'}, (response) => {
        console.log(response.message);
    })
}