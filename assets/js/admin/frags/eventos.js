var app = angular.module('myapp');

app.controller('eventosCtrl', function($scope, $stateParams, Evento, Imagen, $filter, Rango) {

    var self = this;

    class eventos_ {
        constructor(){
        }
    }


    class evento_{
        constructor(arg){
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }

        ir(){

        }

        diasFaltantes(){

            console.log(Rango.diasFaltantes(this.fechafinal))

            return Rango.diasFaltantes(this.fechafinal)
        }
    }

    self.eventos = new eventos_()

    Evento.obtener()
    .then(res => self.eventos.items = res.data.map(n => new evento_(n)))
    .then(() => $scope.$digest())



});
