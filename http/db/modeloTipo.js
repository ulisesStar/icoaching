module.exports = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('tipo', {
        nombre: Sequelize.STRING
    })

};
