// STRATEGY
// Permitir cambiar el algoritmo o 
// comportamiento de un objeto en 
// tiempo de ejecución.

interface EstrategiaPago {
    pagar(monto: number): void
}

class PagoTarjeta implements EstrategiaPago {
    pagar(monto: number): void {
        console.log("Pagando con tarjeta:", monto)
    }
}

class PagoPaypal implements EstrategiaPago {
    pagar(monto: number): void {
        console.log("Pagando con PayPal:", monto)
    }
}

class PagoCrypto implements EstrategiaPago {
    pagar(monto: number): void {
        console.log("Pagando con Criptomonedas:", monto)
    }
}

class CarritoCompra {

    constructor(private estrategia: EstrategiaPago) {
    }

    realizarPago(monto: number) {
        this.estrategia.pagar(monto)
    }
}