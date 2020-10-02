//import {orderStore} from '../services/noteStore.js'

export class NotesController {

    showIndex(req, res) {
        res.render("index");
        /*
        let entry = {hans: "hans", ueli: "ueli"};
        let entry2 = {hans: "hans2", ueli: "ueli2"};
        let list = {entry, entry2};
        res.render("home",{
            test: "Hello World!",
            test2: {
                hello: "Hello",
                world: "world"
            },
            test3: list
        });*/
    };
/*
    createOrder(req, res) {
        res.render("newOrder");
    };

    async createPizza(req, res) {
        await res.render("succeeded", await orderStore.add(req.body.name, "unkown"));
    };

    async showOrder(req, res) {
        await res.render("showorder", await orderStore.get(req.params.id));
    };

    async deleteOrder(req, res) {
        await res.render("showorder", await orderStore.delete(req.params.id));
    };
*/
}

export const notesController = new NotesController();