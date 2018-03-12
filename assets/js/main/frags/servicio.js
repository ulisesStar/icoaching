var app = angular.module('myapp');

app.controller('servicioCtrl', function($scope, $stateParams, Servicio, Imagen, Area, Modalidad, Tipo) {

	var self = this;

	var id = $stateParams.id

	var scrollMagicController = new ScrollMagic.Controller();

	$('.relaciones').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: $(this).height() / 2
		})
		.setTween(
			new TimelineLite()
			// .from(this, 1, { x: '-100%' })
			.from('.relaciones .md-button', 1, { x: '-100%',  opacity : 0  }, "-=.5")
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	$('.servicio-content').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: $(this).height() / 2
		})
		.setTween(
			new TimelineLite()
			// .from(this, 1, { x: '-100%' })
			.from('.info', 1, { x: '-100%' }, "-=.5")
			.from('.prospecto', 1, { x: '-100%', opacity : 0 })
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	Servicio.one(id)
	.then(res => self.servicio = new servicio_(res.data))
	.then(() => {
		Area.one(self.servicio.IdArea)
		.then(res => self.area = res.data)
		.then(() => $scope.$digest())

		Modalidad.one(self.servicio.IdModalidad)
		.then(res => self.modalidad = res.data)
		.then(() => $scope.$digest())

		Tipo.one(self.servicio.IdTipo)
		.then(res => self.tipo = res.data)
		.then(() => $scope.$digest())
	})
	.then(() => $scope.$digest())


	Imagen.servicio(id)
	.then(res => self.servicio.imagenes = res.data)
	.then(() => $scope.$digest())
	.then(() => {
		if(self.servicio.imagenes.length > 0){

			$( '#central' ).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '#slider'
			})

			$( '#slider' ).slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '#central',
				dots: true,
				centerMode: true,
				focusOnSelect: true
			})

		}
	})


	class servicio_{
		constructor(arg){
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
		}
	}

	console.log(self)


});
