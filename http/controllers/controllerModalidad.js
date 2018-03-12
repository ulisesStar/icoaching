var db = require('../relations');
var modalidad = db.modalidad;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    modalidad.create(req.body)
    .then(result => res.status(200).jsonp(result))

};


ex.delete = function(req, res, next) {

    modalidad.findById(req.params.id)
    .then(modalidad => modalidad.destroy())

};

ex.update = function(req, res, next) {

    modalidad.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        modalidad.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        modalidad.findAll()
        .then(result => res.status(200).jsonp(result))
    }
};
