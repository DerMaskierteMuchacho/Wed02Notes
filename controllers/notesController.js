//import {orderStore} from '../services/orderStore.js'

export class NotesController {
    showIndex(req, res) {
        res.render("home");
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