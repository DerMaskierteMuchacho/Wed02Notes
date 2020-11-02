import {noteStore} from '../services/noteStore.js'
import {styleController} from "./styleController.js";
import {indexHelper} from "../helpers/indexHelper.js";
import {displayHelper} from "../helpers/displayHelper.js";
import {IncomingMessage, ServerResponse} from "http";

export class NotesController {
    private _theme: String | undefined;
    private _hideFinished: boolean | false | undefined;

    initCookies(req: any, res: any) {
        this._theme = req.cookies["theme"];
        if (this._theme === "undefined" || this._theme == undefined) {
            res.cookie("theme", "default");
            this._theme = "default";
        }
        this._hideFinished = req.cookies["theme"];
        if (this._hideFinished == undefined) {
            res.cookie("hideFinished", false);
            this._hideFinished = false;
        }

        console.log('Cookies: ', req.cookies);

        /*
        console.log('Cookies: ', req.cookies);
        console.log('Signed Cookies: ', req.signedCookies);

        console.log("getting theme cookie: " + req.cookies["theme"]);

        res.cookie("theme", "default");
         */
    }

    async showIndex(req: any, res: any) {
        this.initCookies(req, res);

        res.render("index",
            {
                layout: 'layouts/layout',
                theme: this._theme,
                notes: displayHelper.getDisplayObj(await noteStore.all())
            })
        //https://hackersandslackers.com/handlebars-templates-expressjs/
    };

    async orderIndex(res: any, list: any) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: this._theme,
                notes: displayHelper.getDisplayObj(list)
            })
    };

    async showCreateNote(req: IncomingMessage, res: any) {
        res.render("add",
            {
                layout: 'layouts/layout',
                theme: this._theme,
            })
    };

    async showEditNote(req: any, res: any) {
        let id = req.query.id;

        res.render("edit",
            {
                layout: 'layouts/layout',
                theme: this._theme,
                note: await noteStore.get(id),
            })
    };

    async createNote(req: any, res: any) {
        await noteStore.add(req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.done);

        //await this.showIndex(req, res);
        res.redirect('/');
        //https://expressjs.com/en/guide/routing.html
    };

    async edit(req: any, res: any) {
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
            //TODO theme
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

            this._hideFinished = true;
        } else {
            filtered = array;
            this._hideFinished = false;
        }

        return filtered;
    }

    async switchTheme(req: any, res: any) {
        let newStyle = styleController.getNextStyle(this._theme);
        res.cookie("theme", newStyle);
        this._theme = newStyle;
        console.log("changing theme to: " + this._theme);
        res.redirect('/');
    };
}

//TODO typescript
//TODO add/update 1 form
//TODO style dynamic screen sizes
//TODO empty notiz anzeigen

export const notesController = new NotesController();