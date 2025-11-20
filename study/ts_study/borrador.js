// Interfaces (para dar mensajes)
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
// clase para uso de composicion
var Composicion = /** @class */ (function () {
    function Composicion() {
    }
    Composicion.prototype.metodoComposicion1 = function () {
        return "Este es el metodo ";
    };
    return Composicion;
}());
var ClaseAbstracta = /** @class */ (function () {
    function ClaseAbstracta(metodo1) {
        this.metodo1 = metodo1;
    }
    ClaseAbstracta.prototype.getMetodo = function () {
        return this.metodo1;
    };
    return ClaseAbstracta;
}());
// Clase para uso de diseño hacia el objeto
var Disenio = /** @class */ (function (_super) {
    __extends(Disenio, _super);
    function Disenio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nombre = "";
        return _this;
    }
    Disenio.prototype.mensaje = function () {
        return "Hola ".concat(this.nombre);
    };
    Disenio.prototype.setnombre = function (nombre) {
        this.nombre = nombre;
    };
    Disenio.prototype.getMetodo = function () {
        return this.getMetodo();
    };
    return Disenio;
}(ClaseAbstracta));
