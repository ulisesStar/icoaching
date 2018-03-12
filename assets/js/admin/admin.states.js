app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {


	function template(seccion, vista, url, params) {
		let obj = {
			url: url,
			data: {
				titulo: vista[0]
			},
			params: params,
			views: {
				'main': {
					templateUrl: _(vista).union(['/' + seccion]).reverse().join('/'),
					controller: vista[0] + 'Ctrl as ctrl'
				}
			},
			resolve: {
				loadMyCtrl: [
					'$ocLazyLoad',
					function($ocLazyLoad) {
						return $ocLazyLoad.load([seccion + vista[0]]);
					}
				]
			}
		}
		return obj
	}

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', template('admin', ['home'], '/'))
	.state('servicios', template('admin', ['servicios'], '/servicios'))
	.state('servicio', template('admin', ['servicio'], '/servicio/:id'))
	.state('modalidades', template('admin', ['modalidades'], '/modalidades'))
	.state('modalidad', template('admin', ['modalidad'], '/modalidad/:id'))
	.state('evento', template('admin', ['evento'], '/evento/:id'))


}]);
