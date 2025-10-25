var Calculadora = /** @class */ (function () {
    function Calculadora() {
    }
    Calculadora.prototype.sumar = function (num1, num2) {
        return num1 + num2;
    };
    Calculadora.prototype.restar = function (num1, num2) {
        return num1 - num2;
    };
    Calculadora.prototype.operacion = function (numero1, numero2) {
        var operacion = prompt("¿Qué operación desea: '+' o '-' ?");
        if (operacion === '+') {
            return this.sumar(numero1, numero2);
        }
        else if (operacion === '-') {
            return this.restar(numero1, numero2);
        }
        else {
            return "La operación no es ni suma ni resta";
        }
    };
    return Calculadora;
}());
// Programa principal
var numero1 = parseFloat(prompt("Ingrese su primer número:") || "0");
var numero2 = parseFloat(prompt("Ingrese su segundo número:") || "0");
var calculadora = new Calculadora();
console.log(calculadora.operacion(numero1, numero2));
