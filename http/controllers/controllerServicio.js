var db = require('../relations');
var {servicio, tipo, area, modalidad } = db;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    servicio.create(req.body)
    .then(result => res.status(200).jsonp(result))

};


ex.delete = function(req, res, next) {

    servicio.findById(req.params.id)
    .then(servicio => servicio.destroy())

};

ex.update = function(req, res, next) {

    servicio.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        servicio.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        servicio.findAll({
			include : [
				{model : modalidad, as:'Modalidad'},
                {model : area, as:'Area'},
                {model : tipo, as:'Tipo'}
			]
		})
        .then(result => res.status(200).jsonp(result))
    }
};
