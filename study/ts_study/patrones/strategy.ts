// STRATEGY
// Permitir cambiar el algoritmo o 
// comportamiento de un objeto en 
// tiempo de ejecución.

interface EstrategiaPago {
    pagar(monto: number): void
}

class PagoTarjeta implements EstrategiaPago {
    
    pagar(monto: number): void {
        
    }
}

class PagoPaypal implements EstrategiaPago {

    pagar(monto: number): void {
        
    }

}

class PagoCrypto implements EstrategiaPago {

    pagar(monto: number): void {
        
    }
}

class CarritoCompra {

    constructor(private estrategia: EstrategiaPago) {
    }

    realizarPago(monto: number) {
        this.estrategia.pagar(monto)
    }
}

const estrategia = new PagoTarjeta()

const carrito = new CarritoCompra(estrategia)

carrito.realizarPago(100)