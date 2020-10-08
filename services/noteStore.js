import Datastore from 'nedb'
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
        let note = new Note(title, description, 2, new Date(), false);
        return await this.db.insert(note, () => {});
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}}, () => {});
        return await this.get(id, () => {});
    }

    async get(id) {
        return await this.db.findOne({_id: id}, () => {});
    }

    async all() {
        let hans = null;
        await this.db.find({}, (err, docs) => {
            console.log("hans "+docs);
            hans = docs});
        console.log("ueli "+hans);
        return hans;
    }
}

export const noteStore = new NoteStore();
