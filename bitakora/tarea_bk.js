//Diseño
var Calculadora = /** @class */ (function () {
    function Calculadora() {
    }
    Calculadora.prototype.sumar = function (number1, number2) {
        return number1 + number2;
    };
    Calculadora.prototype.restar = function (number1, number2) {
        return number1 - number2;
    };
    return Calculadora;
}());
//Instancia concreta (objeto)
var calculadora = new Calculadora();
// Ejemplo de uso
console.log(calculadora.sumar(5, 3));
console.log(calculadora.restar(10, 4));
