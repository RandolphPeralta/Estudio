// DOM - Document Object Model
// ambitos - var, let, y const
// arrow functions
// closure
// callbacks
// async/await
// promise
// XHR - AJAX
// IIFE
// Funcion de Declaración
// Funcion de Expresion
// Hoisting
// getElementBy
// call, bind, apply
// HTML5
// CSS
// SASS
// BEM
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
var Persona = /** @class */ (function () {
    function Persona() {
    }
    return Persona;
}());
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, apelido) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.apelido = apelido;
        return _this;
    }
    Empleado.prototype.miMetodo = function () { };
    Empleado.prototype.otroMetodo = function () { };
    return Empleado;
}(Persona));
var OtraPersona = {
    nombre: '',
    apellido: '',
    miMetodo: function () {
        this.nombre;
    },
    otroMetodo: function () {
        console.log('hola');
    }
};
