export class Note {
    constructor(noteTitle, noteDescription, importance, dateTill, done) {
        this.noteTitle = noteTitle;
        this.noteDescription = noteDescription;
        this.importance = importance;
        this.dateTill = dateTill;
        //this.dateTill = new Date();
        this.done = done;
    }
}