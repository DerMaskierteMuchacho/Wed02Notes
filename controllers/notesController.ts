import {noteStore} from '../services/noteStore.js'
import {styleController} from "./styleController.js";
import {indexHelper} from "../helpers/indexHelper.js";
import {displayHelper} from "../helpers/displayHelper.js";
import {IncomingMessage} from "http";

export class NotesController {
    private _theme: String | undefined;
    // @ts-ignore
    private _hideFinished: boolean | false;

    initCookies(req: any, res: any) {
        this._theme = req.cookies["theme"];
        if (this._theme === "undefined" || this._theme == undefined) {
            res.cookie("theme", "default");
            this._theme = "default";
        }

        console.log('Cookies: ', req.cookies);
    }

    async showIndex(req: any, res: any) {
        this.initCookies(req, res);

        res.render("index",
            {
                layout: 'layouts/layout',
                title: "Super Awesome Note Management Supervision System",
                theme: this._theme,
                notes: displayHelper.getDisplayObj(await noteStore.all())
            })
    }

    async orderIndex(res: any, list: any) {
        res.render("index",
            {
                layout: 'layouts/layout',
                title: "Super Awesome Note Management Supervision System",
                theme: this._theme,
                notes: displayHelper.getDisplayObj(list)
            })
    }

    async showCreateNote(req: IncomingMessage, res: any) {
        res.render("edit",
            {
                layout: 'layouts/layout',
                title: "Create a new super awesome dynamic ultimate note",
                theme: this._theme,
                action: "/new",
                button: "Create"
            })
    }

    async showEditNote(req: any, res: any) {
        let id = req.query.id;

        res.render("edit",
            {
                layout: 'layouts/layout',
                title: "edit note \"this isn't even my final form\" ultimate2",
                theme: this._theme,
                note: await noteStore.get(id),
                action: "/edit?id=" + id,
                button: "Update"
            })
    }

    async createNote(req: any, res: any) {
        await noteStore.add(req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.done);

        //await this.showIndex(req, res);
        res.redirect('/');
        //https://expressjs.com/en/guide/routing.html
    }

    async editNote(req: any, res: any) {
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

    async orderBy(req: any, res: any) {
        if (req.query.orderby === 'dueDate') {
            this.orderIndex(res, indexHelper.orderByDueDate(await noteStore.all()));
        } else if (req.query.orderby === 'creationDate') {
            this.orderIndex(res, indexHelper.orderByCreationDate(await noteStore.all()));
        } else if (req.query.orderby === 'importance') {
            this.orderIndex(res, indexHelper.orderByImportance(await noteStore.all()));
        } else if (req.query.hide !== undefined) {
            this.orderIndex(res, this.hideFinished(await noteStore.all()));
        } else {
            this.switchTheme(req, res);
        }
    }

    hideFinished(array: any) {
        let filtered = [];

        if (!this._hideFinished) {
            array.forEach(function (item: any) {
                if (!item.done) {
                    filtered.push(item);
                }
            });

        } else {
            filtered = array;
        }

        this._hideFinished = !this._hideFinished;

        return filtered;
    }

    async switchTheme(req: any, res: any) {
        // @ts-ignore
        let newStyle = styleController.getNextStyle(this._theme);
        res.cookie("theme", newStyle);
        this._theme = newStyle;
        console.log("changing theme to: " + this._theme);
        res.redirect('/');
    }
}

export const notesController = new NotesController();