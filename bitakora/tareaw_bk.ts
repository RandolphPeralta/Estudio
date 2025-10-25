class Calculadora {
  constructor() {}

  sumar(num1: number, num2: number): number {
    return num1 + num2;
  }

  restar(num1: number, num2: number): number {
    return num1 - num2;
  }

  operacion(numero1: number, numero2: number): string | number {
    const operacion = prompt("¿Qué operación desea: '+' o '-' ?");

    if (operacion === '+') {
      return this.sumar(numero1, numero2);
    } else if (operacion === '-') {
      return this.restar(numero1, numero2);
    } else {
      return "La operación no es ni suma ni resta";
    }
  }
}

// Programa principal
const numero1 = parseFloat(prompt("Ingrese su primer número:") || "0");
const numero2 = parseFloat(prompt("Ingrese su segundo número:") || "0");

const calculadora = new Calculadora();
console.log(calculadora.operacion(numero1, numero2));
