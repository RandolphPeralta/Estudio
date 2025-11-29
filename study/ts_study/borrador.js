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
// 2. CLASE ABSTRACTA: define estructura común
var MetodoPagoBase = /** @class */ (function () {
    function MetodoPagoBase(titular) {
        this.titular = titular;
    }
    MetodoPagoBase.prototype.getTitular = function () {
        return this.titular;
    };
    return MetodoPagoBase;
}());
// 3. HERENCIA + POLIMORFISMO: distintos métodos de pago
var TarjetaCredito = /** @class */ (function (_super) {
    __extends(TarjetaCredito, _super);
    function TarjetaCredito() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TarjetaCredito.prototype.procesar = function (monto) {
        console.log("\uD83D\uDCB3 Pago de $".concat(monto, " con tarjeta de ").concat(this.getTitular()));
    };
    return TarjetaCredito;
}(MetodoPagoBase));
var PayPal = /** @class */ (function (_super) {
    __extends(PayPal, _super);
    function PayPal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayPal.prototype.procesar = function (monto) {
        console.log("\uD83C\uDF10 Pago de $".concat(monto, " v\u00EDa PayPal de ").concat(this.getTitular()));
    };
    return PayPal;
}(MetodoPagoBase));
var TransferenciaBancaria = /** @class */ (function (_super) {
    __extends(TransferenciaBancaria, _super);
    function TransferenciaBancaria() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferenciaBancaria.prototype.procesar = function (monto) {
        console.log("\uD83C\uDFE6 Transferencia de $".concat(monto, " desde la cuenta de ").concat(this.getTitular()));
    };
    return TransferenciaBancaria;
}(MetodoPagoBase));
// 4. COMPOSICIÓN: gestor que usa métodos de pago, no hereda de ellos
var GestorPagos = /** @class */ (function () {
    function GestorPagos(metodo) {
        this.metodo = metodo;
    }
    GestorPagos.prototype.ejecutarPago = function (monto) {
        this.metodo.procesar(monto);
    };
    return GestorPagos;
}());
// 5. USO DEL SISTEMA
var pagoTarjeta = new GestorPagos(new TarjetaCredito("Randolph"));
var pagoPayPal = new GestorPagos(new PayPal("Randolph"));
var pagoTransferencia = new GestorPagos(new TransferenciaBancaria("Randolph"));
pagoTarjeta.ejecutarPago(150);
pagoPayPal.ejecutarPago(200);
pagoTransferencia.ejecutarPago(500);
