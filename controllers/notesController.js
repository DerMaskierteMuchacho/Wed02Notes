import {noteStore} from '../services/noteStore.js'

export class NotesController {

    async showIndex(req, res) {
        res.render("index",
            {
                layout: 'layouts/layout',
                theme: this.getTheme(),
                notes: this.getDisplayObj(await noteStore.all())
            })
        //https://hackersandslackers.com/handlebars-templates-expressjs/
    };

    showCreateNote(req, res) {
        res.render("add",
            {
                layout: 'layouts/layout',
                theme: this.getTheme(),
            })
    };

    async createNote(req, res) {
        await noteStore.add(req.body.title,
            req.body.description,
            req.body.importance,
            req.body.dueDate,
            req.body.done);

        await this.showIndex(req, res);
    };

    async getNotes(req, res) {
        await res.render("all",
            {
                layout: 'layouts/layout',
                theme: this.getTheme(),
                notes: this.getDisplayObj(await noteStore.all())
            });
    };

    getDisplayObj(array) {
        array.forEach(function (item) {
            //create stars
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

            //create finished symbol
            if (item.done) {
                item.done = "<svg style='color:green' width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-check2-circle\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                    "            <path fill-rule=\"evenodd\" d=\"M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/>\n" +
                    "            <path fill-rule=\"evenodd\" d=\"M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z\"/>\n" +
                    "        </svg>"
            }
            else {
                if (!item.done) {
                    item.done = "<svg style='color:red' width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-x-circle\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "            <path fill-rule=\"evenodd\" d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n" +
                        "            <path fill-rule=\"evenodd\" d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n" +
                        "        </svg>";
                }
            }
        });

        return array;
    };

    async orderBy(req, res)
    {
        var a = req.query;
        var b = a.param1;
    }

    getTheme() {
        //https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
        return "dark";
    };

    async switchTheme(req, res) {

    };
}

export const notesController = new NotesController();