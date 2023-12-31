import {LoadData, SaveData} from '../wailsjs/go/main/App';

var saveNotes = () => {
    notes = document.getElementsByClassName('note');
    saveNoteData = [];
    for (var note of notes) {
        iframe = note.getElementsByTagName('iframe')[0];
        header = iframe.contentWindow.document.getElementById('header').innerHTML;
        content = iframe.contentWindow.document.getElementById('content').innerHTML;
        noteinfo = new saveNote(header, content);
        saveNoteData.push(noteinfo);
        var notifcation = new Notification("Added a new note");
    }
    //saveNoteData = localStorage.setItem('saveNotes', JSON.stringify(saveNoteData));
    SaveData(JSON.stringify(saveNoteData));
};

function saveNote(header, content) {
    this.header = header;
    this.content = content;
}

window.addEventListener('unload', saveNotes);
window.addEventListener('beforeUnload', saveNotes);

var loadNote = () => {
    let notes = document.getElementsByClassName('note');
    //let saveNoteData = JSON.parse(localStorage.getItem('saveNotes'));
    let saveNoteData = LoadData();
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let iframe = note.getElementsByTagName('iframe');
        iframe[0].addEventListener('load', () => {
            iframe[0].contentWindow.document.getElementById('header').innerHTML = saveNoteData[i].header;
            iframe[0].contentWindow.document.getElementById('content').innerHTML = saveNoteData[i].content;
        });
    }
};

window.addEventListener('load', loadNote);
