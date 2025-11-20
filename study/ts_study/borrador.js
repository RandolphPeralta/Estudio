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
        return "este es el metodo ";
    };
    return Composicion;
}());
// clase abstracta para usar la composicion con la clase anterior
var ClaseAbstracta = /** @class */ (function () {
    function ClaseAbstracta(metodo0) {
        this.metodo0 = metodo0;
    }
    ClaseAbstracta.prototype.getMetodo = function () {
        return "ESTE ES EL METODO DE COMPOSICION DE LA CLASE ABSTRACTA: ".concat(this.metodo0.metodoComposicion1());
    };
    return ClaseAbstracta;
}());
// Clase para uso de diseño hacia el objeto
var Disenio = /** @class */ (function (_super) {
    __extends(Disenio, _super);
    function Disenio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Disenio.prototype.getdiseno = function () {
        return this.getMetodo();
    };
    return Disenio;
}(ClaseAbstracta));
var argumento = new Composicion;
var prueba = new Disenio(argumento);
console.log(prueba.getdiseno());
