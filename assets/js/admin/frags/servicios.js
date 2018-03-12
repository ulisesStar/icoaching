var app = angular.module('myapp');

app.controller('serviciosCtrl', function($scope, $mdDialog, $state, Servicio) {

    var self = this

    Servicio.obtener()
    .then(res => self.servicios = res.data)
    .then(res => $scope.$digest())

    self.crear = () => $mdDialog.show($mdDialog.prompt()
        .title('¿Quieres crear una modalidad?')
        .textContent('Empieza por introducir su titulo')
        .placeholder('Nombre')
        .ok('Siguiente paso')
        .cancel('Me arrepenti'))
        .then(result =>
            !_.isUndefined(result) ?
                Servicio.crear({nombre : result, status : 0 })
                .then(res => $state.go('servicio', { id: res.data.id })) :
                alertas.mostrarToastEstandar("No se creo ningun cartel")
            )


	console.log(this)

});
