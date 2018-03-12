var app = angular.module('myapp');

app.controller('modalidadCtrl', function($scope, $stateParams, Modalidad, Area) {

    var self = this

    Modalidad.one($stateParams.id)
    .then(res => self.modalidad = new classModalidad(res))
    .then(res => Area.one(res.IdArea))
    .then(res => self.area = new classArea(res))
    .then(() => $scope.$digest())
    .catch(err => console.log(err))

    class classArea {
        constructor(arg) {
            Object.entries(arg.data).forEach(n => this[n[0]] = n[1])
        }
    }

    class classModalidad {
        constructor(arg) {
            Object.entries(arg.data).forEach(n => this[n[0]] = n[1])
        }

        guardar(){
            Modalidad.guardar(this).then(res => console.log(res))
        }
    }


    self.cambiarArea = () => {

        Area.one(self.modalidad.IdArea).then(res => self.area = new classArea(res))

    }


});
