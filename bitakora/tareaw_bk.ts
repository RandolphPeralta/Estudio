const prompt = require('prompt-sync')({ sigint: true });

class Calculadora {
  sumar(num1, num2) {
    return num1 + num2;
  }

  restar(num1, num2) {
    return num1 - num2;
  }

  operacion(numero1, numero2) {
    const operacion = prompt("¿Qué operación desea: '+' o '-' ? ");
    if (operacion === '+') {
      return this.sumar(numero1, numero2);
    } else if (operacion === '-') {
      return this.restar(numero1, numero2);
    } else {
      return "La operación no es ni suma ni resta";
    }
  }
}

const numero1 = parseFloat(prompt("Ingrese su primer número: "));
const numero2 = parseFloat(prompt("Ingrese su segundo número: "));

const calculadora = new Calculadora();
console.log(calculadora.operacion(numero1, numero2));
