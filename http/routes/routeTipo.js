var express = require('express');
var route = express.Router();

var x = require("../controllers/controllerTipo");

route.route('/data/tipo')
        .get(x.read)
        .post(x.create);

route.route('/data/tipo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
