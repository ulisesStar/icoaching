var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('prospectos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
		apellido: Sequelize.STRING,
        empresa: Sequelize.STRING,
        telefono: Sequelize.STRING,
        correo: Sequelize.STRING
    })

};

module.exports = ex;
