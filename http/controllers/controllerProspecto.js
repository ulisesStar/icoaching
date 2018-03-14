var _ = require('lodash');
var db = require('../relations');
var { prospecto, evento } = db;

var ex = module.exports = {};

const Hubspot = require('hubspot');
const hubspot = new Hubspot({apiKey: '4d30fd2e-34a8-4997-9718-d67706d66e07'});

ex.reservar = function(req, res, next) {

    hubspot.contacts.create(new Object({
        properties: [
            {
              "property": "firstname",
              "value": req.body.prospecto.nombre
            },
            {
              "property": "lastname",
              "value": req.body.prospecto.apellido
            },
            {
                "property": "email",
                "value": req.body.prospecto.correo
            },
            {
              "property": "company",
              "value": req.body.prospecto.empresa
            },
            {
              "property": "phone",
              "value": req.body.prospecto.telefono
            }
        ]
    }))
    .then(creacion => {
        console.log(creacion)
    })
    .catch(err => {})

    console.log(req.body.prospecto)

    console.log(prospecto)

    prospecto.create(req.body.prospecto)
    .then(prospectito => prospectito.addEvento( req.body.evento, { through: { precio : req.body.precio, numero : _.random(10000, 99999) } } ))
    .then(result => res.status(200).jsonp( result ))

};

ex.create = function(req, res, next) {

    hubspot.contacts.create(new Object({
        properties: [
            {
              "property": "firstname",
              "value": req.body.nombre
            },
            {
              "property": "lastname",
              "value": req.body.apellido
            },
            {
                "property": "email",
                "value": req.body.correo
            },
            {
              "property": "company",
              "value": req.body.empresa
            },
            {
              "property": "phone",
              "value": req.body.telefono
            }
        ]
    }))
    .then(creacion => {
        console.log(creacion)
    })

    prospecto.create(req.body)
    .then(result => res.status(200).jsonp( result ))

};


ex.delete = function(req, res, next) {

    prospecto.findById(req.params.id)
    .then(prospecto => prospecto.destroy())


};

ex.update = function(req, res, next) {

    prospecto.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        prospecto.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        prospecto.findAll()
        .then(result => res.status(200).jsonp(result))
    }
};
