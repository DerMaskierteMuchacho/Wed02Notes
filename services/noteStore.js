import Datastore from 'nedb'

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
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}}, () => {
        });
        return await this.get(id, () => {
        });
    }

    async get(id) {
        return await this.db.getDataById(id);
    }

    async all() {
         return await this.db.getAllData();
        //return await this.db.find({});
    }

    async getAllObjects(instance, callback, res) {
        this.db.find({}, function (err, docs) {
            return callback(instance, err, docs, res);
        });
    }
}

export const noteStore = new NoteStore();
