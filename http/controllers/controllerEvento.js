var moment = require('moment');

var db = require('../relations');
var {servicio , evento} = db;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    evento.create(req.body)
    .then(result => res.status(200).jsonp(result))

};


ex.delete = function(req, res, next) {

    evento.findById(req.params.id)
    .then(evento => evento.destroy())


};

ex.update = function(req, res, next) {

    evento.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        evento.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        evento.findAll()
        .then(result => res.status(200).jsonp(result))
    }
};


ex.eventoXservicio = function(req, res, next) {

    servicio.findById(req.params.id)
    .then(servicio => servicio.getEvento())
    .then(result => res.status(200).jsonp(result))

};


ex.proximo = function(req, res, next) {

    const rango = (fecha) => {
        return moment(fecha).diff(moment(new Date), 'days')
    }

    const cercano = (array) => {
        return new Promise((resolve, reject) => {
            resolve(
                array.reduce((ac, v ) => ac = rango(ac.fechafinal) > rango(v.fechafinal) ? v : ac,
                    {fechafinal : new Date('3000-01-01 01:52:18')}
                )
            )
        })
    }

    evento.findAll({
        where :
            { status : 1 }
    })
    .then(result => cercano(result))
    .then(result => res.status(200).jsonp(result))

};
