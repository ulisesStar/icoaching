app.controller('mainCtrl', function ($scope) {

	$scope.map = {
        center: {
            latitude: 19.393664,
            longitude: -99.1745978
        },
        zoom: 13
    };

    $scope.markeroptions = {
        icon: 'img/ic_location_on_black_24px.svg'
    }

    $scope.markers = [
        {
            coordenadas: {
                latitude: 19.393664,
                longitude: -99.1745978,
            }
        }
    ];

});
