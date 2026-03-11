// DECORATOR
// permite agregar funcionalidades 
// a un objeto sin modificar 
// su clase original.


// NOTA: ARREGLAR ESTE EJERCICIO 
// CON SOLID, POO Y LA ABSTRACCION
interface Cafe {
    costo(): number
    descripcion(): string
}

class CafeSimple implements Cafe {

    costo(): number {
        return 5
    }

    descripcion(): string {
        return "Café simple"
    }
}

abstract class DecoradorCafe implements Cafe {

    constructor(protected cafe: Cafe) {}

    abstract costo(): number
    abstract descripcion(): string
}

class Leche extends DecoradorCafe {

    costo(): number {
        return this.cafe.costo() + 2
    }

    descripcion(): string {
        return this.cafe.descripcion() + " + leche"
    }
}

class Azucar extends DecoradorCafe {

    costo(): number {
        return this.cafe.costo() + 1
    }

    descripcion(): string {
        return this.cafe.descripcion() + " + azúcar"
    }
}

let cafe: Cafe = new CafeSimple()

cafe = new Leche(cafe)
cafe = new Azucar(cafe)

console.log(cafe.descripcion())
console.log(cafe.costo())