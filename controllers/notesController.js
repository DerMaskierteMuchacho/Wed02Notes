import {noteStore} from '../services/noteStore.js'
import {styleController} from "./styleController.js";
import {orderHelper} from "../helpers/orderHelper.js";
import {displayHelper} from "../helpers/displayHelper.js";

export class NotesController {

    constructor() {
        this.hide = false;
    }

    async switchTheme(req, res) {
        styleController.switchStyle("dark");
        this.showIndex(req, res);
    };

    async showIndex(req, res) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(await noteStore.all())
            })
        //https://hackersandslackers.com/handlebars-templates-expressjs/
    };

    async orderIndex(res, list) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                notes: displayHelper.getDisplayObj(list)
            })
    };

    async showCreateNote(req, res) {
        res.render("add",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
            })
    };

    async showEditNote(req, res) {
        let id = req.query.id;

        res.render("edit",
            {
                layout: 'layouts/layout',
                theme: styleController.getStyle(),
                note: await noteStore.get(id),
            })
    };

    async createNote(req, res) {
        await noteStore.add(req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.done);

        //await this.showIndex(req, res);
        res.redirect('/');
        //https://expressjs.com/en/guide/routing.html
    };

    async edit(req, res) {
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

    async orderBy(req, res) {
        if (req.query.orderby === 'dueDate') {
            this.orderIndex(res, orderHelper.orderByDueDate(await noteStore.all()));
        } else if (req.query.orderby === 'creationDate') {
            this.orderIndex(res, orderHelper.orderByCreationDate(await noteStore.all()));
        } else if (req.query.orderby === 'importance') {
            this.orderIndex(res, orderHelper.orderByImportance(await noteStore.all()));
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

export const notesController = new NotesController();