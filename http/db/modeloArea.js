var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('areas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
		color: Sequelize.STRING,
        descripcion: Sequelize.TEXT
    })

};

module.exports = ex;
