var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('modalidades', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
		status : Sequelize.INTEGER,
        nombre: Sequelize.STRING,
		descripcion: Sequelize.TEXT
    })

};

module.exports = ex;
