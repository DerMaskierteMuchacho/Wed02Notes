import {noteStore} from '../services/noteStore.js'

export class NotesController {

    async showIndex(req, res) {
        res.render("index",
            {
                layout: 'layouts/layout',
                notes: this.getDisplayObj(await noteStore.all())
            })
        //https://hackersandslackers.com/handlebars-templates-expressjs/
    };

    showCreateNote(req, res) {
        res.render("add", {layout: 'layouts/layout'})
    };

    async createNote(req, res) {
        await res.render("add", {layout: 'layouts/layout'},
            await noteStore.add(req.body.title,
                req.body.description,
                req.body.importance,
                req.body.dueDate,
                req.body.done))
    };

    async getNotes(req, res) {
        await res.render("all",
            {
                layout: 'layouts/layout',
                notes: this.getDisplayObj(await noteStore.all())
            });
    };

    getDisplayObj(array) {
        array.forEach(function (item) {
            let stars = item.importance;
            let i = 0;
            let string = "";
            for (i = 0; i < stars; i++) {
                string += "<span class=\"fa fa-star checked\"></span>"
            }
            for (i = 0; i < 5 - stars; i++) {
                string += "<span class=\"fa fa-star\"></span>"
            }
            item.importance = string;
        });

        return array;
    }

    /*
        createOrder(req, res) {
            res.render("newOrder");
        };

        async createPizza(req, res) {
            await res.render("succeeded", await noteStore.add(req.body.name, "unkown"));
        };

        async showOrder(req, res) {
            await res.render("showorder", await noteStore.get(req.params.id));
        };

        async deleteOrder(req, res) {
            await res.render("showorder", await noteStore.delete(req.params.id));
        };
    */
}

export const notesController = new NotesController();