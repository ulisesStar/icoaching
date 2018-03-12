app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

	function template(seccion, vista) {
	    let obj = {
	        name: seccion + vista,
	        files: [ 'js/' + seccion + '/frags/' + vista + '.js' ]
	    }
	    return obj
	}

    $ocLazyLoadProvider.config({
        debug: true,
        modules: [
            template('main', 'home'),
			template('main', 'servicios'),
			template('main', 'servicio'),
			template('admin', 'home'),
			template('admin', 'modalidad'),
			template('admin', 'modalidades'),
			template('admin', 'servicio'),
			template('admin', 'servicios'),
			template('admin', 'evento')
        ]

    });

	//console.log($ocLazyLoadProvider)
}]);
