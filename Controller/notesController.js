const store = require("../services/orderStore.js");

module.exports.showIndex = function (req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<head>");
    res.write("<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\" crossorigin=\"anonymous\">");
    res.write("<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js\" crossorigin=\"anonymous\"></script>");
    res.write("</head>");
    res.write("<p>Willkommen! Zu der besten Note collection auf der Welt!</p>");
    //res.write("<img src='/images/pizza.jpg'>");
    //res.write("<form action='/orders' method='get'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
};