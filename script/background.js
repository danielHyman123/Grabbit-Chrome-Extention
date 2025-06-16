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

    //Open notes.html as a popup when the notes button is clicked after right clicking
    chrome.windows.create({
        url: chrome.runtime.getURL('notes.html'),
        type: "popup", 
        width:600,
        height:600
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //If the message is to update the sidebar, inform injectSidebar.js to refresh the sidebar
    if (message.action === 'updateSidebar') {
        console.log("Background received update request for note:", message.noteText);
        
        // Forward the message to all active tabs
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {   //Loop through all tabs
                chrome.tabs.sendMessage(tab.id, {
                    action: 'refreshSidebar',
                    noteText: message.noteText
                }).catch((error) => {
                    // Ignore errors for tabs that don't have the content script
                    console.log(`Could not send message to tab ${tab.id}:`, error.message);
                });
            });
        });
        
        sendResponse({success: true});
    }
});
