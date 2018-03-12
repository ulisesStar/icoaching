var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerArea");

route.route('/data/area')
        .get(x.read)
        .post(x.create);

route.route('/data/area/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
