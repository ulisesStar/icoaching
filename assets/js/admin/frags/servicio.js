var app = angular.module('myapp');

app.controller('servicioCtrl', function($scope, $stateParams, $mdDialog, Servicio, Area, Modalidad, Evento) {

    var self = this

    var id = $stateParams.id

    Modalidad.obtener()
    .then(res => self.modalidades = res.data)
    .then(() => $scope.$digest())

    Servicio.one(id)
    .then(res => self.servicio = new classServicio(res))
    .then(res => Area.one(res.IdArea))
    .then(res => self.area = new classArea(res))
    .then(() => $scope.$digest())
    .catch(err => console.log(err))

    class classArea {
        constructor(arg) {
            Object.entries(arg.data).forEach(n => this[n[0]] = n[1])
        }

        guardar(){
            Area.guardar(this)
            .then(res => $mdDialog.show($mdDialog.alert({title: 'Exito', textContent: 'haz actualizado la información del Area ' +  this.nombre , ok: 'Close'})). finally(() => {}))
        }
    }

    class classServicio {
        constructor(arg) {
            Object.entries(arg.data).forEach(n => this[n[0]] = n[1])
        }

        guardar(){
            Servicio.guardar(this)
            .then(res => $mdDialog.show($mdDialog.alert({title: 'Exito', textContent: 'haz actualizado la información del Servicio ' +  this.nombre , ok: 'Close'})). finally(() => {}))
        }
    }

    class classEventos{
        constructor(arg){
            this.items = arg.data
        }

        crear(){

            $mdDialog.show({
                templateUrl: '/partialadmin/crearEvento',
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controllerAs : 'ctrl',
                controller: ($scope, $mdDialog)  => {
                    $scope.aplicar = () => {
                        console.log('si')
                        $mdDialog.hide($scope.evento)}
                }
            }).then(data => {

                data.IdServicio = id;

                Evento.crear(data)
                .then(res => this.items.push(res.data))
                .then(() => $scope.$digest())
            })
        }

    }

    Evento.servicio(id)
    .then(res => self.eventos = new classEventos(res))
    .then(() => $scope.$digest())

    self.cambiarArea = () => Area.one(self.servicio.IdArea).then(res => self.area = new classArea(res))

    console.log(this)

});
