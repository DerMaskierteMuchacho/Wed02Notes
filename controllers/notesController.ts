import {noteStore} from '../services/noteStore.js'
import {styleController} from "./styleController.js";
import {indexHelper} from "../helpers/indexHelper.js";
import {displayHelper} from "../helpers/displayHelper.js";
import {IncomingMessage, ServerResponse} from "http";

export class NotesController {

    constructor() {
        this.hide = false;
    }

    async switchTheme(req: IncomingMessage, res: ServerResponse) {
        styleController.switchStyle("dark");
        this.showIndex(req, res);
    };

    async showIndex(req: any, res: ServerResponse) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(await noteStore.all())
            })
        //https://hackersandslackers.com/handlebars-templates-expressjs/
    };

    async orderIndex(res: ServerResponse, list: any) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(list)
            })
    };

    async showCreateNote(req: IncomingMessage, res: ServerResponse) {
        res.render("add",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
            })
    };

    async showEditNote(req: IncomingMessage, res: ServerResponse) {
        let id = req.query.id;

        res.render("edit",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                note: await noteStore.get(id),
            })
    };

    async createNote(req: any, res) {
        await noteStore.add(req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.done);

        //await this.showIndex(req, res);
        res.redirect('/');
        //https://expressjs.com/en/guide/routing.html
    };

    async edit(req: any, res) {
        let id = req.query.id;
        let title = req.body.title;

        if (title !== undefined) {
            await noteStore.update(
                id,
                req.body.title,
                req.body.description,
                req.body.importance,
                req.body.dueDate,
                req.body.done);
            res.redirect('/');
        } else if (id !== undefined) {
            this.showEditNote(req, res);
        }

    }

    async orderBy(req: any, res) {
        if (req.query.orderby === 'dueDate') {
            this.orderIndex(res, indexHelper.orderByDueDate(await noteStore.all()));
        } else if (req.query.orderby === 'creationDate') {
            this.orderIndex(res, indexHelper.orderByCreationDate(await noteStore.all()));
        } else if (req.query.orderby === 'importance') {
            this.orderIndex(res, indexHelper.orderByImportance(await noteStore.all()));
        } else if (req.query.hide !== undefined) {
            this.orderIndex(res, this.hideFinished(await noteStore.all()));
        } else {
            //TODO theme
            this.switchTheme(req, res);
        }

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
        } else {
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