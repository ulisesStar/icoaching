var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerEvento");

route.route('/data/evento')
        .get(x.read)
        .post(x.create);

route.route('/data/evento/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/eventoXservicio/:id')
        .get(x.eventoXservicio)

route.route('/data/eventoproximo')
        .get(x.proximo)

module.exports = route;
