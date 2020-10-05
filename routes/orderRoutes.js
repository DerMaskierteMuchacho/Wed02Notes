const express = require('express');
//TODO handlebars
var exphbs  = require('express-handlebars');
//https://javabeat.net/expressjs-bootstrap/

const router = express.Router();
const orders = require('../controller/ordersController.js');

router.get("/", orders.showIndex);
router.get("/orders", orders.createOrder);
router.post("/orders", orders.createPizza);
router.get("/orders/:id/", orders.showOrder);
router.delete("/orders/:id/", orders.deleteOrder);

module.exports = router;