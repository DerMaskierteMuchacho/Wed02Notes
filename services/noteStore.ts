// @ts-ignore
import Datastore from 'nedb-promise'

export class Note {
    private title: string;
    private description: string;
    private importance: number;
    private dueDate: any;
    private creationDate: any;
    private done: boolean;

    constructor(title: string, description: string, importance: number, dueDate: any, done: boolean) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = new Date().toLocaleDateString();
        this.done = done;
    }
}

export class NoteStore {
    private db: any;

    constructor() {
        this.db = new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title: string, description: string, importance: number, dueDate: any, done: boolean) {
        let note = new Note(title, description, importance, dueDate, done);
        return await this.db.insert(note);
    }

    async update(id: any, title: string, description: string, importance: number, dueDate: any, done: boolean) {
        await this.db.update({_id: id},
            {
                $set:
                    {
                        "title": title,
                        "description": description,
                        "importance": importance,
                        "dueDate": dueDate,
                        "done": done,
                    }
            }, {returnUpdatedDocs: false});
    }

    async delete(id: any) {
        await this.db.remove({_id: id});
    }

    async get(id: any) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();
