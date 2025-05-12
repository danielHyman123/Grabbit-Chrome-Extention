chrome.runtime.onInstalled.addListener(() => {
    console.log("installed")
    chrome.contextMenus.create({
        id: 'note',
        title: "Notes",
        type: "normal",
        contexts: ["selection"]
    })
    // start the notes value as an empty array to start
    chrome.storage.local.set({notes: []})
})


chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("clicked")
    console.log(info)
});

// listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //handlling different events from messages
    switch(request.event) {
        case "saveNote":
            // adding new note to the notes array from local storage
            chrome.storage.local.get('notes', (result) => {
                let notes = result.notes || [];
                notes.push(request.data);
                chrome.storage.local.set({"notes": notes}, () => console.log("Note saved"));
            })
            sendResponse({message: "Note saved from background"});
            return true;
            break;
    }
})