var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerProspecto");

route.route('/data/prospecto')
        .get(x.read)
        .post(x.create);

route.route('/data/prospecto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/reservar')
        .post(x.reservar);
        
module.exports = route;
