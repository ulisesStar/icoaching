var express = require('express');
var routeImagenes = express.Router();

var x = require("../controllers/controllerImagenes");

routeImagenes.route('/data/imagen')
        .get(x.read)
        .post(x.create);

routeImagenes.route('/data/imagen/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeImagenes.route('/data/imagenXevento/:id')
        .get(x.imagenXevento)

routeImagenes.route('/data/imagenXservicio/:id')
        .get(x.imagenXservicio)

module.exports = routeImagenes;
