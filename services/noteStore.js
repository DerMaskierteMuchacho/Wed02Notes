import Datastore from 'nedb-promise'
//import {Note} from "../model/note";

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

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title, description) {
        let note = new Note("Hans", "Ueli", 2, new Date(), false);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();
