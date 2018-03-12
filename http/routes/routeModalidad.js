var express = require('express');
var routeModalidad = express.Router();

var x = require("../controllers/controllerModalidad");

routeModalidad.route('/data/modalidad')
        .get(x.read)
        .post(x.create);

routeModalidad.route('/data/modalidad/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeModalidad;
