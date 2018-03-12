app.controller('adminCtrl', function($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav) {

    $scope.productos = [];

    $scope.mdDialogTarjeta = function(data) {
        mdDialog.mostrardialog('nuevoproducto', 'adminCtrl', $scope.customFullscreen);
    }

    $scope.secciones = [
        {
            icon: 'home',
            nombre: 'home',
            state: 'home'
        }, {
            icon: 'graphic_eq',
            nombre: 'modalidades',
            state: 'modalidades'
        }, {
            icon: 'star',
            nombre: 'servicios',
            state: 'servicios'
        }
    ];

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

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

});
