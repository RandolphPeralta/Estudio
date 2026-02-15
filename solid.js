// SRP - Un modulo o una clase debe tener una y solo una razon para cambiar.  
//          que tiene para cambiar, que esa clase o modulo tenga muchas cosas
var Suma = /** @class */ (function () {
    function Suma() {
    }
    Suma.prototype.ejecutar = function (number1, number2) {
        return number1 + number2;
    };
    return Suma;
}());
var Calculadora = /** @class */ (function () {
    function Calculadora(operacion) {
        this.operacion = operacion;
    }
    Calculadora.prototype.operar = function () {
        return this.operacion.ejecutar;
    };
    return Calculadora;
}());
var suma = new Suma();
var calculadora = new Calculadora(suma);
calculadora.operar();
