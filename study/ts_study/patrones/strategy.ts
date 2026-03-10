// STRATEGY
// Permitir cambiar el algoritmo o 
// comportamiento de un objeto en 
// tiempo de ejecución.

interface EstrategiaPago {
    pagar(monto: number): void
}

interface Tarjeta extends EstrategiaPago {
    guardarPlataTarjeta(monto: number): void
}

interface Paypal extends EstrategiaPago {
    contenerPlata(monto: number): void
}

interface Cryptomoney extends EstrategiaPago {
    protegerPlata(monto: number): void
}

class PagoTarjeta implements Tarjeta {

    guardarPlataTarjeta(monto: number): void {
        throw new Error("Method not implemented.")
    }
    
    pagar(monto: number): void {
        console.log("Pagando con tarjeta:", monto)
    }
}

class PagoPaypal implements Paypal {
    contenerPlata(monto: number): void {
        throw new Error("Method not implemented.")
    }

    pagar(monto: number): void {
        console.log("Pagando con PayPal:", monto)
    }

}

class PagoCrypto implements Cryptomoney {
    protegerPlata(monto: number): void {
        throw new Error("Method not implemented.")
    }
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