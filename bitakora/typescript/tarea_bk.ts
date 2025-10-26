class Calculadora{
    sumar(number1: number, number2: number): number{
        return number1 + number2
    }

    restar(number1: number, number2: number): number{
        return number1 - number2
    }
}

const calculadora = new Calculadora();

//const numero: number = input("Que numero desea"); TOCA IMPORTAR UNA BIBLIOTECA
console.log(calculadora.sumar(5,3));
console.log(calculadora.restar(10,4))