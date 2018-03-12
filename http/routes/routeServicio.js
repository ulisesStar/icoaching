var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerServicio");

route.route('/data/servicio')
        .get(x.read)
        .post(x.create);

route.route('/data/servicio/filtro')
        .post(x.filtro);

route.route('/data/servicio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
