app.controller('mainCtrl', function ($scope) {

	$scope.map = {
        center: {
            latitude: 20.6735287,
            longitude: -103.3897222,
        },
        zoom: 15
    };

    $scope.markeroptions = {
        icon: 'img/ic_location_on_black_24px.svg'
    }

    $scope.markers = [
        {
            coordenadas: {
                latitude: 20.6735287,
                longitude: -103.3897222,
            }
        }
    ];

});
