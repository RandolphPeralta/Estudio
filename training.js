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
var Persona = /** @class */ (function () {
    function Persona(nombre, apelido) {
        this.nombre = nombre;
        this.apelido = apelido;
    }
    Persona.prototype.miMetodo = function () { };
    Persona.prototype.otroMetodo = function () { };
    return Persona;
}());
var OtraPersona = {
    nombre: '',
    apellido: '',
    miMetodo: function () {
        this.nombre;
    },
    otroMetodo: function () {
    }
};
