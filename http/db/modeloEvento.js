var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    return sequelize.define('eventos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
		status : Sequelize.INTEGER,
        nombre: Sequelize.STRING,
		descripcion: Sequelize.TEXT,
        fechainicial: Sequelize.DATE,
        fechafinal: Sequelize.DATE,
        curva : Sequelize.FLOAT,
        precioinicial : Sequelize.INTEGER,
        preciofinal : Sequelize.INTEGER
    })
};

module.exports = ex;
