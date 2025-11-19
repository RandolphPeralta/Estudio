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
// 2. Clase Motor - COMPOSICIÓN (preferida sobre herencia)
// =============================================================
var Motor = /** @class */ (function () {
    function Motor(potencia) {
        this.potencia = potencia;
    }
    Motor.prototype.encender = function () {
        console.log("\uD83D\uDD27 Motor encendido con potencia de ".concat(this.potencia, " HP."));
    };
    Motor.prototype.getPotencia = function () {
        return this.potencia;
    };
    return Motor;
}());
// =============================================================
// 3. Clase abstracta Vehiculo
// =============================================================
var Vehiculo = /** @class */ (function () {
    function Vehiculo(id, marca, motor) {
        this.id = id;
        this.marca = marca;
        this.motor = motor;
    }
    Vehiculo.prototype.getId = function () {
        return this.id;
    };
    Vehiculo.prototype.getMarca = function () {
        return this.marca;
    };
    Vehiculo.prototype.realizarMantenimiento = function () {
        console.log("\uD83D\uDEE0\uFE0F Realizando mantenimiento al veh\u00EDculo ".concat(this.getId(), "..."));
    };
    return Vehiculo;
}());
// =============================================================
// 4. Clases derivadas (HERENCIA) aplicando POLIMORFISMO
// =============================================================
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auto.prototype.descripcion = function () {
        console.log("\uD83D\uDE97 Auto marca ".concat(this.getMarca(), " con motor de ").concat(this.motor.getPotencia(), " HP."));
    };
    return Auto;
}(Vehiculo));
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Moto.prototype.descripcion = function () {
        console.log("\uD83C\uDFCD\uFE0F Moto marca ".concat(this.getMarca(), " con motor de ").concat(this.motor.getPotencia(), " HP."));
    };
    return Moto;
}(Vehiculo));
// =============================================================
// 5. Programa principal
// =============================================================
var motorAuto = new Motor(120);
var motorMoto = new Motor(45);
var auto = new Auto(1, "Toyota", motorAuto);
var moto = new Moto(2, "Yamaha", motorMoto);
auto.descripcion(); // Polimorfismo
moto.descripcion(); // Polimorfismo
// auto.realizarMantenimiento();
// moto.realizarMantenimiento();
motorAuto.encender();
motorMoto.encender();
