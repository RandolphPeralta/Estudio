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
// =========================
// Clase abstracta Cuenta
// =========================
var Cuenta = /** @class */ (function () {
    function Cuenta(saldoInicial) {
        this.saldo = saldoInicial;
    }
    // Encapsulamiento: acceso controlado al saldo
    Cuenta.prototype.getSaldo = function () {
        return this.saldo;
    };
    return Cuenta;
}());
// ==================================
// Cuenta de Ahorros (Herencia y Override)
// ==================================
var CuentaAhorros = /** @class */ (function (_super) {
    __extends(CuentaAhorros, _super);
    function CuentaAhorros() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CuentaAhorros.prototype.realizarTransaccion = function (monto) {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            console.log("Retiro exitoso en Ahorros: -".concat(monto));
        }
        else {
            console.log("Fondos insuficientes en Cuenta de Ahorros.");
        }
    };
    return CuentaAhorros;
}(Cuenta));
// ==================================
// Cuenta Corriente (Herencia y Override)
// ==================================
var CuentaCorriente = /** @class */ (function (_super) {
    __extends(CuentaCorriente, _super);
    function CuentaCorriente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sobregiro = 200; // Encapsulado
        return _this;
    }
    CuentaCorriente.prototype.realizarTransaccion = function (monto) {
        if (this.saldo + this.sobregiro >= monto) {
            this.saldo -= monto;
            console.log("Retiro exitoso en Corriente (con sobregiro si aplica): -".concat(monto));
        }
        else {
            console.log("Fondos insuficientes incluso con sobregiro.");
        }
    };
    return CuentaCorriente;
}(Cuenta));
// ==============================
// Clase Cliente (Composición > Herencia)
// ==============================
var Cliente = /** @class */ (function () {
    function Cliente(nombre, cuenta) {
        this.nombre = nombre;
        this.cuenta = cuenta;
    }
    Cliente.prototype.mostrarInfo = function () {
        console.log("Cliente: ".concat(this.nombre));
        console.log("Saldo actual: ".concat(this.cuenta.getSaldo()));
    };
    Cliente.prototype.realizarOperacion = function (monto) {
        this.cuenta.realizarTransaccion(monto);
        this.mostrarInfo();
    };
    return Cliente;
}());
// ==============================
// PROGRAMA DEMO
// ==============================
// Cliente con cuenta de ahorros
var cliente1 = new Cliente("Randolph", new CuentaAhorros(500));
cliente1.realizarOperacion(200);
// Cliente con cuenta corriente
var cliente2 = new Cliente("María", new CuentaCorriente(100));
cliente2.realizarOperacion(250);
