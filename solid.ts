// SRP - Un modulo o una clase debe tener una y solo una razon para cambiar.  
//       que tiene para cambiar, que esa clase o modulo tenga muchas cosas

// OCP - Una clase o un modulo debe ser extensible para su uso 
// y cerrado a su modificacion 

// EJEMPLO DE CALCULADORA CON SUMA

interface Operacion {
    ejecutar(number1: number, number2: number): number
}

class Suma implements Operacion {
    ejecutar(number1: number, number2: number): number {
        return number1 + number2
    }
}

class Calculadora {
    constructor(private operacion: Operacion){}
    
    operar(number1: number, number2: number): number {
        return this.operacion.ejecutar(number1, number2)
    }
}

const suma = new Suma()
const calculadora = new Calculadora(suma)

console.log(calculadora.operar(5, 3)) 
