//Diseño
class Calculadora{
    sumar(number1: number, number2: number): number{
        return number1 + number2
    }

    restar(number1: number, number2: number): number{
        return number1 - number2
    }
}

//Instancia concreta (objeto)
const calculadora = new Calculadora();

// Ejemplo de uso
console.log(calculadora.sumar(5,3));
console.log(calculadora.restar(10,4))