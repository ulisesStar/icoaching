app.factory('Rango', function() {

    this.calculo = (evento) => {

        console.log(evento)

        return new Promise((resolve, reject)  => {

            const result = {
                fechas: [],
                precio: []
            }

            const total = evento.preciofinal - evento.precioinicial
            const rango = moment(evento.fechafinal).diff(moment(evento.fechainicial), 'days')
            const incremento = total / rango
            var x = 0

            var itr = moment.twix(
                    new Date( moment(evento.fechainicial).format("YYYY-MM-DD")),
                    new Date( moment(evento.fechafinal).format("YYYY-MM-DD") )
                ).iterate("days")

            while(itr.hasNext()){
                x++
                result.fechas.push( moment(itr.next().toDate()).format("YYYY-MM-DD") )
                result.precio.push( Math.round(evento.precioinicial + (x * incremento))  )
            }

            resolve(result)

        })

    }

    this.diasFaltantes = (fechafinal) => {
        return  moment(fechafinal).diff(moment(new Date), 'days')
    }

    this.precioActual = (rango) => {

        const idx = rango.fechas.findIndex(n => n === _.toString( moment(new Date).format("YYYY-MM-DD") ) )

        return new Object({
            izquierda : (idx / rango.fechas.length) * 100,
            derecha : ((rango.fechas.length - idx) / rango.fechas.length) * 100,
            total : rango.fechas.length,
            precio : rango.precio[idx]
        })

    }

    return this

});
