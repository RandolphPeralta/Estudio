import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

class Calculadora {
  sumar(num1: number, num2: number): number {
    return num1 + num2;
  }

  restar(num1: number, num2: number): number {
    return num1 - num2;
  }

  operacion(numero1: number, numero2: number): string | number {
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
