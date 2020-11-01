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
    constructor() {
        this.hide = false;
    }
    switchTheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            styleController.switchStyle("dark");
            this.showIndex(req, res);
        });
    }
    ;
    showIndex(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("index", {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(yield noteStore.all())
            });
            //https://hackersandslackers.com/handlebars-templates-expressjs/
        });
    }
    ;
    orderIndex(res, list) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("index", {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(list)
            });
        });
    }
    ;
    showCreateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("add", {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
            });
        });
    }
    ;
    showEditNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            res.render("edit", {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                note: yield noteStore.get(id),
            });
        });
    }
    ;
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done);
            //await this.showIndex(req, res);
            res.redirect('/');
            //https://expressjs.com/en/guide/routing.html
        });
    }
    ;
    edit(req, res) {
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
                //TODO theme
                this.switchTheme(req, res);
            }
        });
    }
    hideFinished(array) {
        let filtered = [];
        if (!this.hide) {
            array.forEach(function (item) {
                if (!item.done) {
                    filtered.push(item);
                }
            });
            this.hide = true;
        }
        else {
            filtered = array;
            this.hide = false;
        }
        return filtered;
    }
}
//TODO typescript
//TODO cookies
//TODO theme
//TODO add/update 1 form
//TODO style dynamic screen sizes
export const notesController = new NotesController();
