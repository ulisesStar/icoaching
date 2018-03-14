var app = angular.module('myapp');

app.controller('eventoCtrl', function($scope, $stateParams, Evento, Imagen, $filter, Rango) {


    var self = this

    // self.rango = []

    const informacion = {
        bindto: '#grafica',
        data: {
            x: 'fechas',
            columns: [],
            types: {
               x: 'area',
               historia: 'area-spline'
           }
        },
        axis: {
            x: {
                type: 'timeseries',
                localtime: false,
                tick: {
                    format: '%d/%m/%y'
                }
            }
        }
    }

    class evento_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }

        obtenerImagenes() {

            Imagen.evento(this.id)
            .then(res => this.imagenes = res.data)
            .then(() => $scope.$digest())

        }

        obtenerRango(){

            Rango.calculo(this)
            .then(response => {
                informacion.data.columns = Object.entries(response).map(n => _.flatten(n))
            })
            .then(response => {

                console.log(response)
                const grafica = c3.generate(informacion)
            })
            .then(() => {
                self.hoy = moment(new Date).format("YYYY-MM-DD")
                let idx = informacion.data.columns[0].findIndex(n => n === _.toString(self.hoy) )
                self.precioactual = informacion.data.columns[1][idx]

                console.log(informacion)

            })
        }

        guardar(){

            Evento.guardar(this)
            .then(res => console.log(res))

        }
    }

    Evento.one($stateParams.id)
    .then(res => self.evento = new evento_(res.data))
    .then(() => self.evento.obtenerImagenes())
    .then(() => self.evento.obtenerRango())
    .then(() => $scope.$digest())

    $scope.Dropify = function() {

        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar',
                remove: 'Eliminar',
                error: 'Error'
            }
        });

        $('.dropify').on('change', function() {

            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    // bind new Image to Component
                    $scope.$apply(function() {
                        $scope.inputImage = e.target.result;
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        });

    };

	self.subirImagen = (imagen) => {

        Imagen.crear({
            IdEvento : $stateParams.id,
            imagen : imagen
        }).then(res => self.evento.imagenes.push(res.data))

	}

});
