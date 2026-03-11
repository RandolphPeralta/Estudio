// DECORATOR
// permite agregar funcionalidades 
// a un objeto sin modificar 
// su clase original.

// NOTA: ARREGLAR ESTE EJERCICIO 
// CON SOLID, POO Y LA ABSTRACCION
interface Cafe {
    descripcion(): string
}

abstract class DisenioCafe implements Cafe {
    constructor(protected cafe: Cafe) { }
    abstract descripcion(): string
}

class CafeSimple implements Cafe {

    descripcion(): string {
        return "Café simple"
    }
}

class Leche extends DisenioCafe {

    descripcion(): string {
        return this.cafe.descripcion() + " + leche"
    }
}

class Azucar extends DisenioCafe {

    descripcion(): string {
        return this.cafe.descripcion() + " + azúcar"
    }
}

let cafe: Cafe = new CafeSimple()

cafe = new Leche(cafe)
cafe = new Azucar(cafe)

console.log(cafe.descripcion())