// =============================================================
// 1. Interfaces
// =============================================================

// Interfaz que representa una transacción a procesar
interface ITransaccion {
  getMonto(): number;
  getDescripcion(): string;
}

// Interfaz para identificadores (opcional, para ilustrar)
interface IIdentificable {
  getId(): number;
}

// =============================================================
// 2. Clases para composición
// =============================================================

// Calculadora de comisiones: se usa por composición en los procesadores
class FeeCalculator {
  private porcentaje: number;

  constructor(porcentaje: number) {
    this.porcentaje = porcentaje;
  }

  calcularComision(monto: number): number {
    return monto * (this.porcentaje / 100);
  }
}

// Logger para registrar eventos; también por composición
class Logger {
  log(mensaje: string): void {
    console.log(`📝 LOG: ${mensaje}`);
  }
}

// =============================================================
// 3. Clase abstracta Procesador de Pagos (HERENCIA y POLIMORFISMO)
// =============================================================

abstract class PaymentProcessor implements IIdentificable {
  private id: number;
  protected feeCalculator: FeeCalculator;
  protected logger: Logger;

  constructor(id: number, feeCalculator: FeeCalculator, logger: Logger) {
    this.id = id;
    this.feeCalculator = feeCalculator;
    this.logger = logger;
  }

  getId(): number {
    return this.id;
  }

  // Método polimórfico: cada procesador lo implementa de forma distinta
  abstract procesar(transaccion: ITransaccion): void;

  protected registrar(transaccion: ITransaccion, comision: number) {
    this.logger.log(
      `Procesador ${this.constructor.name} (id=${this.id}) procesó "${transaccion.getDescripcion()}" ` +
      `de monto ${transaccion.getMonto()} con comisión ${comision.toFixed(2)}.`
    );
  }
}

// =============================================================
// 4. Procesadores concretos (subclases)
// =============================================================

class CreditCardProcessor extends PaymentProcessor {
  procesar(transaccion: ITransaccion): void {
    const monto = transaccion.getMonto();
    const comision = this.feeCalculator.calcularComision(monto);
    // Lógica simulada de pago con tarjeta de crédito:
    console.log(
      `💳 Pagando con tarjeta: ${transaccion.getDescripcion()}, monto: ${monto}. ` +
      `Comisión aplicada: ${comision.toFixed(2)}`
    );
    this.registrar(transaccion, comision);
  }
}

class PayPalProcessor extends PaymentProcessor {
  procesar(transaccion: ITransaccion): void {
    const monto = transaccion.getMonto();
    const comision = this.feeCalculator.calcularComision(monto) + 0.30; // PayPal cobra extra fijo
    console.log(
      `🌐 Pagando con PayPal: ${transaccion.getDescripcion()}, monto: ${monto}. ` +
      `Comisión PayPal: ${comision.toFixed(2)}`
    );
    this.registrar(transaccion, comision);
  }
}

class BankTransferProcessor extends PaymentProcessor {
  procesar(transaccion: ITransaccion): void {
    const monto = transaccion.getMonto();
    const comision = this.feeCalculator.calcularComision(monto);
    console.log(
      `🏦 Transferencia bancaria: ${transaccion.getDescripcion()}, monto: ${monto}. ` +
      `Comisión transferencia: ${comision.toFixed(2)}`
    );
    this.registrar(transaccion, comision);
  }
}

// =============================================================
// 5. Clase que representa una transacción concreta
// =============================================================

class Transaccion implements ITransaccion {
  private monto: number;
  private descripcion: string;

  constructor(monto: number, descripcion: string) {
    this.monto = monto;
    this.descripcion = descripcion;
  }

  getMonto(): number {
    return this.monto;
  }

  getDescripcion(): string {
    return this.descripcion;
  }
}

// =============================================================
// 6. Programa principal (ejemplo de uso)
// =============================================================

const logger = new Logger();
const feeCalcLow = new FeeCalculator(1.5);   // comisión baja
const feeCalcHigh = new FeeCalculator(3.0);  // comisión más alta

const ccProcessor = new CreditCardProcessor(101, feeCalcLow, logger);
const paypalProcessor = new PayPalProcessor(202, feeCalcHigh, logger);
const bankProcessor = new BankTransferProcessor(303, feeCalcLow, logger);

const t1 = new Transaccion(100, "Compra de libro");
const t2 = new Transaccion(250, "Pago de servicio");

ccProcessor.procesar(t1);
paypalProcessor.procesar(t2);
bankProcessor.procesar(t1);
