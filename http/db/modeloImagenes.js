var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Imagenes = sequelize.define('imagenes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        imagen: {
           type: Sequelize.BLOB('medium'),
           get() {
               var imagenBin = this.getDataValue('imagen');
               var Imagenes = new Buffer(imagenBin).toString('ascii');
               return Imagenes
           },
        }
    })

    return Imagenes;

};

module.exports = ex;
