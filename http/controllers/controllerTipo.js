var db = require('../relations');
var tipo = db.tipo;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body

    console.log(data)

    tipo.create(req.body)
    .then(result => res.status(200).jsonp(result))

};


ex.delete = function(req, res, next) {

    tipo.findById(req.params.id)
    .then(tipo => tipo.destroy())


};

ex.update = function(req, res, next) {

    tipo.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        tipo.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        tipo.findAll()
        .then(result => res.status(200).jsonp(result))
    }
};
