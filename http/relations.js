
//*-*-*-CONEXION CON SEQUELIZE & MYSQL-*-*-*-*-*-*-*
var conector = require('./connection');

//- Modelos

var usuario = require('./db/modeloUsuario')(conector);
var imagenes = require('./db/modeloImagenes')(conector);
var area = require('./db/modeloArea')(conector);
var modalidad = require('./db/modeloModalidad')(conector);
var servicio = require('./db/modeloServicio')(conector);
var evento = require('./db/modeloEvento')(conector);
var tipo = require('./db/modeloTipo')(conector);
var prospecto = require('./db/modeloProspecto')(conector);
var reservacion = require('./db/modeloReservacion')(conector);

//- Relations

servicio.belongsTo(area, {as:'Area', foreignKey: 'IdArea'});
area.hasMany(servicio, {as:'Servicio', foreignKey: 'IdArea'});

servicio.belongsTo(modalidad, {as:'Modalidad', foreignKey: 'IdModalidad'});
modalidad.hasMany(servicio, {as:'Servicio', foreignKey: 'IdModalidad'});

servicio.belongsTo(tipo, {as:'Tipo', foreignKey: 'IdTipo'});
tipo.hasMany(servicio, {as:'Servicio', foreignKey: 'IdTipo'});

evento.belongsTo(servicio, {as:'Servicio', foreignKey: 'IdServicio'});
servicio.hasMany(evento, {as:'Evento', foreignKey: 'IdServicio'});

imagenes.belongsTo(evento, {as:'Evento', foreignKey: 'IdEvento'});
evento.hasMany(imagenes, {as:'Imagen', foreignKey: 'IdEvento'});

prospecto.belongsToMany(evento, {as:'Evento',  through: reservacion,  foreignKey: 'IdProspecto'});
evento.belongsToMany(prospecto, {as:'Prospecto',  through: reservacion,  foreignKey: 'IdEvento'});

module.exports.usuario = usuario;
module.exports.imagenes = imagenes;
module.exports.tipo = tipo;
module.exports.area = area;
module.exports.modalidad = modalidad;
module.exports.servicio = servicio;
module.exports.evento = evento;
module.exports.prospecto = prospecto;
module.exports.reservacion = reservacion;
