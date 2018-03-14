var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('reservaciones', {
        numero: Sequelize.STRING,
        precio: Sequelize.STRING
    })

};

module.exports = ex;
