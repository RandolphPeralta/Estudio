// S - SINGLE RESPONSABILITY

// Una clase debe tener una unica responsabilidad 
// Es decir una unica funcion 
// y por ende una razon para cambiar

// Mal ejemplo:
class CUsuario {
    guardarEnBD() { }
    enviarEmail() { }
}

//Buen ejemplo:
class Usuario {
    constructor(private nombre: string) { }
}

class UsuarioRepository {
    guardar(usuario: Usuario) { }
}

class EmailService {
    enviar(usuario: Usuario) { }
}

// 0 - OPEN/CLOSED 

// Una clase debe ser cerrada para su modificacion 
// y abierta para su extension

// Es decir si quiero agregar funcionalidades 
// a la clase no deberia cambiar cosas (codigo)
// sino extender las funcionalidades desde afuera

// Mal ejemplo
class Calculadora {
    calcular(tipo: string) {
        if (tipo === "suma") return 1 + 1
        if (tipo === "resta") return 2 - 1
    }
}

// Buen ejemplo
interface Operacion {
    ejecutar(): number
}

class Suma implements Operacion {
    ejecutar() {
        return 1 + 1
    }
}

class Resta implements Operacion {
    ejecutar() {
        return 2 - 1
    }
}

class Calculador {
    constructor(operacion: Operacion) {
        return operacion.ejecutar()
    }
}

// L - LISKOV PRINCIPLE (Principio de Liskov)

// Las submodulos, subclases o subtipos deben ser 
// sustituibles por los modulos, clases o tipos bases 
// sin afectar el comportamiento del codigo 

// Si tenemos clases padres e hijas es decir
// Herencia, las instancias se pueden intercambiar 
// sin generar resultados inesperadas

// Es decir evitar agregar restriciones 
// o comportamientos heredados en una clase, 
// para no tener comportamientos inesperados

// Mal ejemplo:
// class Ave {
//     volar() {}
// }

// class Pinguino extends Ave {
//     volar() {
//         throw new Error("No puedo volar")
//     }
// }

// Buen ejemplo:
interface Ave { }

interface AveVoladora extends Ave {
    volar(): void
}

class Aguila implements AveVoladora {
    volar() { }
}

class Pinguino implements Ave { }

// I - PRINCIPIO DE SEGREGACION DE INTERFACES

// Los clientes no deben verse obligados a dependerse
// de interfaces que no utilizan, es decir que el cliente
// debe conocer los metodos que va a utilizar

// Mal ejemplo:
interface Animal {
    volar(): void
    nadar(): void
    caminar(): void
}

// Buen ejemplo:
interface Volador {
    volar(): void
}

interface Nadador {
    nadar(): void
}

interface Caminador {
    caminar(): void
}

class Pez implements Nadador {
    nadar() { }
}

class Loro implements Volador {
    volar(): void { }
}

class Perro implements Caminador {
    caminar(): void { }
}

// D - INVERSION DE DEPENDENCIAS

// Depende de abstraciones no de implementacion concreta
// Las clases de alto nivel no deben 
// depender de las clases de bajo nivel
// sino que ambas deben depender de abstracciones

// Mal ejemplo:

// class MySQL {
//     conectar() {}
// }

// class App {
//     private db = new MySQL()
// }

// Buen ejemplo:
interface Database {
    conectar(): void
}

class MySQL implements Database {
    conectar() { }
}

class App {
    constructor(private db: Database) { }
}

// SOLID

interface Superpoder {
    usar(): string
}

class VolarConAlas implements Superpoder {
    usar() {
        return "Volar con alas"
    }
}

class Heroe {
    constructor(private poder: Superpoder) { }

    activarPoder() {
        return this.poder.usar()
    }
}




//------------------------------------------- Apuntes del profesor

// SRP - Un modulo o una clase debe tener una y solo una razon para cambiar.  
//       que tiene para cambiar, que esa clase o modulo tenga muchas cosas

// OCP - Una clase o un modulo debe ser extensible para su uso 
//        y cerrado a su modificacion 

// EJEMPLO DE CALCULADORA CON SUMA

interface IOperacion {
    ejecutarE(number1: number, number2: number): number
}

class CSuma implements IOperacion {
    ejecutarE(number1: number, number2: number) {
        return number1 + number2
    }
}

class CCalculadora {
    constructor(private operacion: IOperacion){}
    
    operar(number1: number, number2: number): number {
        return this.operacion.ejecutarE(number1, number2)
    }
}

// const suma = new Suma()
// const calculadora = new Calculadora(suma)

// console.log(calculadora.operar(5, 3)) 

//-------------------------------------
// CRUD
// Consultar datos por UI o ID

// Persistencia (MEMORIA, BASE DE DATOS, LOCALSTOAGE, REDIS, KAFKA)
// Modelo de datos
// Capa de negocio
// Capa de presentacion
// I/O