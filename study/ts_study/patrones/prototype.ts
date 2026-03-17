// PROTOTYPE
// permite copiar objetos existentes sin que el código dependa de sus clases.

interface Prototype {
    clone(): Prototype
}

class Usuario implements Prototype {

    constructor(private nombre: string) { }

    clone(): Usuario {
        return new Usuario(this.nombre)
    }

    mostrar() {
        return this.nombre
    }
}

const usuario1 = new Usuario("Carlos")
const usuario2 = usuario1.clone()

usuario2.mostrar()