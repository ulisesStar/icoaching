var app = angular.module('myapp');

app.controller('modalidadesCtrl', function($scope, $state, $mdDialog,  Modalidad) {

    var self = this

    Modalidad.obtener()
    .then(res => self.modalidades = res.data )
    .then(() => $scope.$digest())

    self.crear = () => {

        $mdDialog.show($mdDialog.prompt()
              .title('¿Quieres crear una modalidad?')
              .textContent('Empieza por introducir su titulo')
              .placeholder('Nombre')
              .ok('Siguiente paso')
              .cancel('Me arrepenti')).then(result => {

            !_.isUndefined(result) ? (

                Modalidad.crear({nombre : result, status : 0 }).then(res => {
                    $state.go('modalidad', { id: res.data.id })
                })

            ) : (
                alertas.mostrarToastEstandar("No se creo ningun cartel")
            )

        });
    }


});
