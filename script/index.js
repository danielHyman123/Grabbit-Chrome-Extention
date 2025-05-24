createNoteButton = document.getElementsByTagName("button");
but = document.getElementById("createNoteButton")
console.log(createNoteButton);
console.log(but);
console.log("Button clicked");
but.addEventListener('click', () => { //() => is an on the spot function creator.
    const notesWindow = window.open("notes.html", "NoteTaker", "width=600,height=400");
    console.log("Button clicked again");
 });

/*Code could be used for delete button*/ 

// deleteButton = document.getElementsByTagName("button");
// del = document.getElementById("deleteButton")
// console.log(deleteButton);
// console.log(del);
// console.log("Button clicked");
// del.addEventListener('click', () => { //() => is an on the spot function creator.
//   notesWindow.close();
//   console.log("Button clicked again");
//  });

