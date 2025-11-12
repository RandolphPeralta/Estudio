var Calculadora = /** @class */ (function () {
    function Calculadora() {
    }
    Calculadora.prototype.suma = function (a, b) {
        return a + b;
    };
    Calculadora.prototype.resta = function (a, b) {
        return a - b;
    };
    Calculadora.prototype.multiplicacion = function (a, b) {
        return a * b;
    };
    Calculadora.prototype.division = function (a, b) {
        return a / b;
    };
    return Calculadora;
}());
var calculadora = new Calculadora;
var sumando = calculadora.suma(1, 2);
console.log(sumando);
