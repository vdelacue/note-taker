$(function() {
// target areas in notes.html using jQuery selectors, start all variable names with $ to know it is a jQuery selector variable
const searchNoteBtn = $("#search-btn");
const saveNoteBtn = $("#save-note-btn");
const newNoteBtn = $("#new-note-btn");
const noteList = $(".list-container .list-group");
const noteTitle = $(".note-title-text");
const noteBody = $(".note-body-text");

//-------------------------GET AND RENDER ALL NOTES--------------------//
//function that will be called after AJAX call retrieves JSON data
//funciton will take JSON data and convert into html code to be rendered on page

let displayNotes = function (notes) {
  noteList.empty();

  let noteListItems = [];

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];

    let li = $("<li class='list-group-item'>").data(note);
    let titleDiv = $("<div>");
    let titleSpan = $("<span class='font-weight-bold'>").text(note.title);
    let delBtn = $(`<i class='fas fa-trash-alt delete-note ml-2' data-id="${note.id}">`);
    let noteP = $("<p class='mt-2'>").text(note.text);

    titleDiv.append(titleSpan, delBtn);

    li.append(titleDiv, noteP);
    noteListItems.push(li);
  }

  noteList.append(noteListItems);
};

//get JSON object of notes from database (api-routes returned JSON object in )
let getJSONnotes = function () {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (data) {
    displayNotes(data);
  });
};

getJSONnotes();

//---------------------DELETE A NOTE FROM DATABASE AND PAGE------------------------//

// Delete the clicked note
let handleNoteDelete = function (event) {
  // Prevent the click listener for the list from being called when the button inside of it is clicked
  event.preventDefault();

  let note = $(this).data("id");
    console.log(note)
  // Delete the note with the id of `note.id`
  // Render the active note
  $.ajax({
    url: "/api/notes/" + note,
    method: "DELETE"
  }).then(function () {
    location.reload();
  });
};

//---------------------------SAVE A NOTE AND POST TO PAGE----------------------//

// Get the note data from the inputs, save it to the database and update the view
let handleNoteSave = function () {
  let newNote = {
    title: noteTitle.val(),
    body: noteBody.val()
  };
console.log(newNote)
  $.ajax({
    url: "/api/notes",
    data: newNote,
    method: "POST"
  }).then(function (data) {
    location.reload();
  });
};

//------------------------------SEARCH BUTTON RENDERS SINGLE PAGE WITH NOTE------------------//

$("#search-btn").on("click", function() {
  var searchedNote = $("#note-search").val().trim();

  // Using a RegEx Pattern to remove spaces from searchedCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  searchedNote = searchedNote.replace(/\s+/g, "").toLowerCase();

  $.get("/api/notes/" + searchedNote, function(data) {
    console.log(data);
    if (data) {
      $("#title").text(data.title);
      $("#body").text(data.body);
    } else {
      $("#title").text(
        "Please check your spelling, your note was not found.");
    }
  });
});




// searchNoteBtn.on("click", handleSearchNote)
saveNoteBtn.on("click", handleNoteSave);
noteList.on("click", ".delete-note", handleNoteDelete);

// Gets and renders the initial list of notes
// displayNotes();

//export?
});