var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { noteStore } from '../services/noteStore.js';
import { styleController } from "./styleController.js";
import { indexHelper } from "../helpers/indexHelper.js";
import { displayHelper } from "../helpers/displayHelper.js";
export class NotesController {
    initCookies(req, res) {
        this._theme = req.cookies["theme"];
        if (this._theme === "undefined" || this._theme == undefined) {
            res.cookie("theme", "default");
            this._theme = "default";
        }
        console.log('Cookies: ', req.cookies);
    }
    showIndex(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.initCookies(req, res);
            res.render("index", {
                layout: 'layouts/layout',
                title: "Super Awesome Note Management Supervision System",
                theme: this._theme,
                notes: displayHelper.getDisplayObj(yield noteStore.all())
            });
        });
    }
    orderIndex(res, list) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("index", {
                layout: 'layouts/layout',
                title: "Super Awesome Note Management Supervision System",
                theme: this._theme,
                notes: displayHelper.getDisplayObj(list)
            });
        });
    }
    showCreateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("edit", {
                layout: 'layouts/layout',
                title: "Create a new super awesome dynamic ultimate note",
                theme: this._theme,
                action: "/new",
                button: "Create"
            });
        });
    }
    showEditNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            res.render("edit", {
                layout: 'layouts/layout',
                title: "edit note \"this isn't even my final form\" ultimate2",
                theme: this._theme,
                note: yield noteStore.get(id),
                action: "/edit?id=" + id,
                button: "Update"
            });
        });
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done);
            //await this.showIndex(req, res);
            res.redirect('/');
            //https://expressjs.com/en/guide/routing.html
        });
    }
    editNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            let title = req.body.title;
            if (title !== undefined) {
                yield noteStore.update(id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done);
                res.redirect('/');
            }
            else if (id !== undefined) {
                this.showEditNote(req, res);
            }
        });
    }
    orderBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.orderby === 'dueDate') {
                this.orderIndex(res, indexHelper.orderByDueDate(yield noteStore.all()));
            }
            else if (req.query.orderby === 'creationDate') {
                this.orderIndex(res, indexHelper.orderByCreationDate(yield noteStore.all()));
            }
            else if (req.query.orderby === 'importance') {
                this.orderIndex(res, indexHelper.orderByImportance(yield noteStore.all()));
            }
            else if (req.query.hide !== undefined) {
                this.orderIndex(res, this.hideFinished(yield noteStore.all()));
            }
            else {
                this.switchTheme(req, res);
            }
        });
    }
    hideFinished(array) {
        let filtered = [];
        if (!this._hideFinished) {
            array.forEach(function (item) {
                if (!item.done) {
                    filtered.push(item);
                }
            });
        }
        else {
            filtered = array;
        }
        this._hideFinished = !this._hideFinished;
        return filtered;
    }
    switchTheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let newStyle = styleController.getNextStyle(this._theme);
            res.cookie("theme", newStyle);
            this._theme = newStyle;
            console.log("changing theme to: " + this._theme);
            res.redirect('/');
        });
    }
}
export const notesController = new NotesController();
