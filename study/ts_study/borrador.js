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
// =====================================================
// Clase abstracta
// =====================================================
var Usuario = /** @class */ (function () {
    function Usuario(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = "";
        this.salud = 100;
    }
    Usuario.prototype.setRol = function (rol) {
        this.rol = rol;
    };
    Usuario.prototype.getRol = function () {
        return this.rol;
    };
    return Usuario;
}());
// =====================================================
// Clases hijas
// =====================================================
var Mago = /** @class */ (function (_super) {
    __extends(Mago, _super);
    function Mago() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Se asigna automáticamente sin usar el constructor
        _this.surol = _this.setRol("Mago");
        return _this;
    }
    Mago.prototype.Atacar = function () { };
    Mago.prototype.Defender = function () { };
    return Mago;
}(Usuario));
var Guerrero = /** @class */ (function (_super) {
    __extends(Guerrero, _super);
    function Guerrero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Igual aquí, sin tocar constructor
        _this.surol = _this.setRol("Guerrero");
        return _this;
    }
    Guerrero.prototype.Atacar = function () { };
    Guerrero.prototype.Defender = function () { };
    return Guerrero;
}(Usuario));
// =====================================================
// Ejemplo de uso
// =====================================================
var conan = new Guerrero("Conan", "Barbaro");
var merlin = new Mago("Merlin", "Ambrosius");
console.log(conan.getRol()); // "guerrero"
//console.log(merlin.getRol()); // "mago"
