// =============================================================
// 1. Interfaces
// =============================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// =============================================================
// 2. Clases para composición
// =============================================================
// Calculadora de comisiones: se usa por composición en los procesadores
var FeeCalculator = /** @class */ (function () {
    function FeeCalculator(porcentaje) {
        this.porcentaje = porcentaje;
    }
    FeeCalculator.prototype.calcularComision = function (monto) {
        return monto * (this.porcentaje / 100);
    };
    return FeeCalculator;
}());
// Logger para registrar eventos; también por composición
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.log = function (mensaje) {
        console.log("\uD83D\uDCDD LOG: ".concat(mensaje));
    };
    return Logger;
}());
// =============================================================
// 3. Clase abstracta Procesador de Pagos (HERENCIA y POLIMORFISMO)
// =============================================================
var PaymentProcessor = /** @class */ (function () {
    function PaymentProcessor(id, feeCalculator, logger) {
        this.id = id;
        this.feeCalculator = feeCalculator;
        this.logger = logger;
    }
    PaymentProcessor.prototype.getId = function () {
        return this.id;
    };
    PaymentProcessor.prototype.registrar = function (transaccion, comision) {
        this.logger.log("Procesador ".concat(this.constructor.name, " (id=").concat(this.id, ") proces\u00F3 \"").concat(transaccion.getDescripcion(), "\" ") +
            "de monto ".concat(transaccion.getMonto(), " con comisi\u00F3n ").concat(comision.toFixed(2), "."));
    };
    return PaymentProcessor;
}());
// =============================================================
// 4. Procesadores concretos (subclases)
// =============================================================
var CreditCardProcessor = /** @class */ (function (_super) {
    __extends(CreditCardProcessor, _super);
    function CreditCardProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreditCardProcessor.prototype.procesar = function (transaccion) {
        var monto = transaccion.getMonto();
        var comision = this.feeCalculator.calcularComision(monto);
        // Lógica simulada de pago con tarjeta de crédito:
        console.log("\uD83D\uDCB3 Pagando con tarjeta: ".concat(transaccion.getDescripcion(), ", monto: ").concat(monto, ". ") +
            "Comisi\u00F3n aplicada: ".concat(comision.toFixed(2)));
        this.registrar(transaccion, comision);
    };
    return CreditCardProcessor;
}(PaymentProcessor));
var PayPalProcessor = /** @class */ (function (_super) {
    __extends(PayPalProcessor, _super);
    function PayPalProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayPalProcessor.prototype.procesar = function (transaccion) {
        var monto = transaccion.getMonto();
        var comision = this.feeCalculator.calcularComision(monto) + 0.30; // PayPal cobra extra fijo
        console.log("\uD83C\uDF10 Pagando con PayPal: ".concat(transaccion.getDescripcion(), ", monto: ").concat(monto, ". ") +
            "Comisi\u00F3n PayPal: ".concat(comision.toFixed(2)));
        this.registrar(transaccion, comision);
    };
    return PayPalProcessor;
}(PaymentProcessor));
var BankTransferProcessor = /** @class */ (function (_super) {
    __extends(BankTransferProcessor, _super);
    function BankTransferProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankTransferProcessor.prototype.procesar = function (transaccion) {
        var monto = transaccion.getMonto();
        var comision = this.feeCalculator.calcularComision(monto);
        console.log("\uD83C\uDFE6 Transferencia bancaria: ".concat(transaccion.getDescripcion(), ", monto: ").concat(monto, ". ") +
            "Comisi\u00F3n transferencia: ".concat(comision.toFixed(2)));
        this.registrar(transaccion, comision);
    };
    return BankTransferProcessor;
}(PaymentProcessor));
// =============================================================
// 5. Clase que representa una transacción concreta
// =============================================================
var Transaccion = /** @class */ (function () {
    function Transaccion(monto, descripcion) {
        this.monto = monto;
        this.descripcion = descripcion;
    }
    Transaccion.prototype.getMonto = function () {
        return this.monto;
    };
    Transaccion.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    return Transaccion;
}());
// =============================================================
// 6. Programa principal (ejemplo de uso)
// =============================================================
var logger = new Logger();
var feeCalcLow = new FeeCalculator(1.5); // comisión baja
var feeCalcHigh = new FeeCalculator(3.0); // comisión más alta
var ccProcessor = new CreditCardProcessor(101, feeCalcLow, logger);
var paypalProcessor = new PayPalProcessor(202, feeCalcHigh, logger);
var bankProcessor = new BankTransferProcessor(303, feeCalcLow, logger);
var t1 = new Transaccion(100, "Compra de libro");
var t2 = new Transaccion(250, "Pago de servicio");
ccProcessor.procesar(t1);
paypalProcessor.procesar(t2);
bankProcessor.procesar(t1);
