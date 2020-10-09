import Datastore from 'nedb'
//import {Note} from "../model/note";

export class Note {
    constructor(title, description, importance, dueDate, done) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = new Date().toLocaleDateString();
        this.done = done;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title, description, importance, dueDate, done) {
        let note = new Note(title, description, importance, dueDate, done);
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
        return await this.db.getAllData();
    }
}

export const noteStore = new NoteStore();
