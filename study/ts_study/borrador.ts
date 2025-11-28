// 1. INTERFAZ: contrato para cualquier método de pago
interface IPago {
    procesar(monto: number): void;
}

// 2. CLASE ABSTRACTA: define estructura común
abstract class MetodoPagoBase implements IPago {
    // Encapsulamiento: atributo privado
    private titular: string;

    constructor(titular: string) {
        this.titular = titular;
    }

    protected getTitular(): string {
        return this.titular;
    }

    // Método abstracto: cada hijo debe implementarlo
    abstract procesar(monto: number): void;
}

// 3. HERENCIA + POLIMORFISMO: distintos métodos de pago
class TarjetaCredito extends MetodoPagoBase {
    procesar(monto: number): void {
        console.log(`💳 Pago de $${monto} con tarjeta de ${this.getTitular()}`);
    }
}

class PayPal extends MetodoPagoBase {
    procesar(monto: number): void {
        console.log(`🌐 Pago de $${monto} vía PayPal de ${this.getTitular()}`);
    }
}

class TransferenciaBancaria extends MetodoPagoBase {
    procesar(monto: number): void {
        console.log(`🏦 Transferencia de $${monto} desde la cuenta de ${this.getTitular()}`);
    }
}

// 4. COMPOSICIÓN: gestor que usa métodos de pago, no hereda de ellos
class GestorPagos {
    private metodo: IPago;

    constructor(metodo: IPago) {
        this.metodo = metodo;
    }

    public ejecutarPago(monto: number): void {
        this.metodo.procesar(monto);
    }
}

// 5. USO DEL SISTEMA
const pagoTarjeta = new GestorPagos(new TarjetaCredito("Randolph"));
const pagoPayPal = new GestorPagos(new PayPal("Randolph"));
const pagoTransferencia = new GestorPagos(new TransferenciaBancaria("Randolph"));

pagoTarjeta.ejecutarPago(150);
pagoPayPal.ejecutarPago(200);
pagoTransferencia.ejecutarPago(500);
