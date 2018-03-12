var app = angular.module('myapp');

app.controller('serviciosCtrl', function($scope, $stateParams, Modalidad, Area, Tipo, Servicio) {

	TweenMax.from($('.filtros'), 1, { x: '100px', opacity : 0 , ease: Power2.easeIN })

	var self = this;



	Tipo.obtener()
	.then(res => self.tipos = res.data)
	.then(() => $scope.$digest())

	Modalidad.obtener()
	.then(res => self.modalidades = res.data)
	.then(() => $scope.$digest())

	Area.obtener()
	.then(res => self.areas = res.data)
	.then(() => $scope.$digest())

	class servicio_{
		constructor(arg){
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
		}
	}

	console.log(_.pickBy($stateParams, _.isNumber))

	class servicios_ {

		constructor(params){
			this.items = [],
			this.filtros = {
				where : params
			}

		}

		obtener(value, id){

			value ? this.filtros.where['Id' + value] = id : null

			Servicio.filtro(this.filtros)
			.then(async (res) => {

				this.items = res.data.map(n => new servicio_(n))


				//
				// // await this.comparar(this.items, nuevo)
				//
				//

				// let nuevo = await res.data.map(n => new servicio_(n))
				// let viejo = this.items;
				//
				// await viejo.forEach((n, key) => {
				// 	_.includes(nuevo, n) ? null : this.items.splice(key, 1)
				// })
				//
				// await nuevo.forEach(n => {
				// 	_.includes(viejo, n) ? null : this.items.push(n)
				// })

			})
			.then(() => $scope.$digest())
		}

		comparar(viejo, nuevo){
			return new Promise((resolve, reject) => {

				let viejo2 = viejo.map(n => {

					return _.includes(nuevo, n) ? null : Object.assign( { tipo : 'viejo' }, n )

					// nuevo.findIndex(i =>  i.id === n.id) > -1 ? null : Object.assign({tipo : 'viejo'}, n)
				})
				console.log(viejo2)

				let nuevo2 = nuevo.map(n => {

					return _.includes(viejo, n) ? null : Object.assign( { tipo : 'nuevo' }, n )

					// viejo.findIndex(i =>  i.id === n.id) > -1 ? null :
				})

				resolve(viejo2.concat(nuevo2))

				// response.reduce((ac, v) =>
		        //     ac.concat(v)
		        // )

			})
		}

		limpiar(){
			this.filtros.where = {}
			this.obtener()
		}
	}

	self.servicios = new servicios_(_.pickBy($stateParams, _.isNumber))
	self.servicios.obtener()

	console.log(this)

});
