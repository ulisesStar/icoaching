var app = angular.module('myapp');

app.controller('eventoCtrl', function($scope, $stateParams, Evento, Imagen, $filter) {


    var self = this

    // self.rango = []

    const informacion = {
        bindto: '#grafica',
        data: {
            x: 'x',
            columns: [
                ['x'],
                ['data1']
            ],
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



    self.refresh = () => {

        grafica.load({
                columns: [
                    ['data1', 230, 190, 300, 500, 300, 400]
                ]
            });
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

            var itr = moment.twix(
                    new Date( moment(this.fechainicial).format("YYYY-MM-DD")),
                    new Date( moment(this.fechafinal).format("YYYY-MM-DD") )
                ).iterate("days")

            while(itr.hasNext()){
                informacion.data.columns[0].push( moment(itr.next().toDate()).format("YYYY-MM-DD") )
                informacion.data.columns[1].push( 100 )
            }

            console.log(informacion)
            const grafica = c3.generate(informacion)

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

    console.log(self)

});
