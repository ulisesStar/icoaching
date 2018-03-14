var db = require('../relations');
var area = db.area;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    area.create(req.body)
    .then(result => res.status(200).jsonp(result))

};


ex.delete = function(req, res, next) {

    area.findById(req.params.id)
    .then(area => area.destroy())


};

ex.update = function(req, res, next) {

    area.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp(result))
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        area.findById(id)
        .then(result => res.status(200).jsonp(result))
    } else {
        area.findAll()
        .then(result => res.status(200).jsonp(result))
    }
};
