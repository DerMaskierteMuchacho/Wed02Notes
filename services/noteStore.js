var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import Datastore from 'nedb-promise';
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
    constructor() {
        this.db = new Datastore({ filename: './data/notes.db', autoload: true });
    }
    add(title, description, importance, dueDate, done) {
        return __awaiter(this, void 0, void 0, function* () {
            let note = new Note(title, description, importance, dueDate, done);
            return yield this.db.insert(note);
        });
    }
    update(id, title, description, importance, dueDate, done) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ _id: id }, {
                $set: {
                    "title": title,
                    "description": description,
                    "importance": importance,
                    "dueDate": dueDate,
                    "done": done,
                }
            }, { returnUpdatedDocs: false });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.remove({ _id: id });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOne({ _id: id });
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.find({});
        });
    }
}
export const noteStore = new NoteStore();
