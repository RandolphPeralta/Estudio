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
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.altura = 0;
        this.peso = 0;
        this.edad = 0;
        this.nombre = nombre;
    }
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    return Usuario;
}());
var Ropa = /** @class */ (function () {
    function Ropa() {
        this.tipo = "";
        this.color = "";
        this.precio = 0;
    }
    Ropa.prototype.getTipo = function () {
        return this.tipo;
    };
    Ropa.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    return Ropa;
}());
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listaropa = [];
        return _this;
    }
    Cliente.prototype.comprar = function (ropa) {
        this.listaropa.push(ropa);
        console.log("El cliente ".concat(this.getNombre(), " compro un ").concat(ropa.getTipo()));
    };
    Cliente.prototype.getlistaRopa = function () {
        return this.listaropa;
    };
    return Cliente;
}(Usuario));
var cliente = new Cliente("Randolph");
cliente.getNombre();
var ropa = new Ropa();
ropa.setTipo("Sueter");
cliente.comprar(ropa);
console.log(cliente.getlistaRopa());
