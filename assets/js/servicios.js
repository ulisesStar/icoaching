app.service('Usuario', function() {

    this.obtener = function(id) { return axios('/data/usuario/' + id) }

});

app.service('Modalidad', function() {

    this.one = (id) => axios('/data/modalidad/' + id )
    this.crear = (modalidad) => axios.post('/data/modalidad', modalidad )
	this.obtener = () => axios('/data/modalidad' )
	this.guardar = (modalidad) => axios.put('/data/modalidad/' + modalidad.id, modalidad )

});

app.service('Tipo', function() {

    this.one = (id) => axios('/data/tipo/' + id )
    this.crear = (tipo) => axios.post('/data/tipo', tipo )
	this.obtener = () => axios('/data/tipo' )
	this.guardar = (tipo) => axios.put('/data/tipo/' + tipo.id, tipo )

});


app.service('Area', function() {

    this.one = (id) => axios('/data/area/' + id )
    this.obtener = () => axios('/data/area' )
	this.guardar = (area) => axios.put('/data/area/' + area.id, area )

});


app.service('Evento', function() {

    this.crear = (evento) => axios.post('/data/evento', evento )
	this.one = (id) => axios('/data/evento/' + id )
    this.servicio = (id) => axios('/data/eventoXservicio/' + id)

});

app.service('Servicio', function() {

    this.one = (id) => axios('/data/servicio/' + id )
    this.crear = (servicio) => axios.post('/data/servicio', servicio )
	this.obtener = () => axios('/data/servicio' )
	this.filtro = (filtros) => axios.post('/data/servicio/filtro', filtros)
	this.guardar = (servicio) => axios.put('/data/servicio/' + servicio.id, servicio )

});

app.service('Imagen', function() {

    this.crear = (imagen) => axios.post('/data/imagen', imagen )
    this.one = (id) => axios('/data/imagen/' + id)
    this.evento = (id) => axios('/data/imagenXevento/' + id)
	this.servicio = (id) => axios('/data/imagenXservicio/' + id)

});
