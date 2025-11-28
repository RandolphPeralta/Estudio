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
var VehiculoBase = /** @class */ (function () {
    function VehiculoBase(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }
    VehiculoBase.prototype.getInfo = function () {
        return "".concat(this.marca, " ").concat(this.modelo);
    };
    return VehiculoBase;
}());
// 3. HERENCIA + POLIMORFISMO: distintos tipos de vehículos
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auto.prototype.encender = function () {
        console.log("\uD83D\uDE97 El auto ".concat(this.getInfo(), " est\u00E1 encendido"));
    };
    Auto.prototype.apagar = function () {
        console.log("\uD83D\uDE97 El auto ".concat(this.getInfo(), " est\u00E1 apagado"));
    };
    Auto.prototype.mover = function () {
        console.log("\uD83D\uDE97 El auto ".concat(this.getInfo(), " est\u00E1 en movimiento"));
    };
    return Auto;
}(VehiculoBase));
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Moto.prototype.encender = function () {
        console.log("\uD83C\uDFCD\uFE0F La moto ".concat(this.getInfo(), " est\u00E1 encendida"));
    };
    Moto.prototype.apagar = function () {
        console.log("\uD83C\uDFCD\uFE0F La moto ".concat(this.getInfo(), " est\u00E1 apagada"));
    };
    Moto.prototype.mover = function () {
        console.log("\uD83C\uDFCD\uFE0F La moto ".concat(this.getInfo(), " est\u00E1 rodando"));
    };
    return Moto;
}(VehiculoBase));
var Camion = /** @class */ (function (_super) {
    __extends(Camion, _super);
    function Camion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Camion.prototype.encender = function () {
        console.log("\uD83D\uDE9A El cami\u00F3n ".concat(this.getInfo(), " est\u00E1 encendido"));
    };
    Camion.prototype.apagar = function () {
        console.log("\uD83D\uDE9A El cami\u00F3n ".concat(this.getInfo(), " est\u00E1 apagado"));
    };
    Camion.prototype.mover = function () {
        console.log("\uD83D\uDE9A El cami\u00F3n ".concat(this.getInfo(), " est\u00E1 transportando carga"));
    };
    return Camion;
}(VehiculoBase));
// 4. COMPOSICIÓN: gestor que usa vehículos, no hereda de ellos
var GestorVehiculos = /** @class */ (function () {
    function GestorVehiculos(vehiculo) {
        this.vehiculo = vehiculo;
    }
    GestorVehiculos.prototype.operar = function () {
        this.vehiculo.encender();
        this.vehiculo.mover();
        this.vehiculo.apagar();
    };
    return GestorVehiculos;
}());
// 5. USO DEL SISTEMA
var auto = new GestorVehiculos(new Auto("Toyota", "Corolla"));
var moto = new GestorVehiculos(new Moto("Yamaha", "R3"));
var camion = new GestorVehiculos(new Camion("Volvo", "FH16"));
auto.operar();
moto.operar();
camion.operar();
