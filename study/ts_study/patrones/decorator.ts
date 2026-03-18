// DECORATOR
// permite agregar funcionalidades 
// a un objeto en otro objeto encapsulado especial, 
// que contienen estas funcionalidades
// sin modificar su clase original.

interface Cafe {
    descripcion(): string
}

class CafeSimple implements Cafe {

    descripcion(): string {
        return "Café simple"
    }
}

abstract class DisenioCafe implements Cafe {
    constructor(protected cafe: Cafe) { }
    abstract descripcion(): string
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