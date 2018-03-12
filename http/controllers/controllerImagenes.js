var db = require('../relations');
var { imagenes, evento, servicio } = db;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    imagenes.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });
};


// Delete [eliminar elemento]
ex.delete = function(req, res, next) {
    var id = req.params.id;
    imagenes.findById(id).then(function(imagenes) {
        imagenes.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

// Update [Actualizar elemento]
ex.update = function(req, res, next) {

    var id = req.params.id;
    var data = req.body;

    console.log(data);

    imagenes.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        imagenes.findById(id).then(function(imagenes) {
            res.status(200).jsonp(imagenes);
        });
    } else {
        imagenes.findAll().then(function(imagenes) {
            res.status(200).jsonp(imagenes);
        });
    }
};

ex.imagenXevento = function(req, res, next) {

    evento.findById(req.params.id)
    .then(eventito => eventito.getImagen())
    .then(response => res.status(200).jsonp(response))

};

ex.imagenXservicio= function(req, res, next) {

    servicio.findById(req.params.id)
    .then(servicito => servicito.getEvento())
    .then(eventitos => Promise.all(
        eventitos.map(async (eventito) => await eventito.getImagen().map(n => n.id))
    ))
    .then(response => res.status(200).jsonp(
        response.reduce((ac, v) =>
            ac.concat(v)
        )
    ))
    .catch(err => res.status(200).jsonp(err))

};
