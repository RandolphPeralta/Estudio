// PROTOTYPE
// permite copiar objetos existentes sin que el código dependa de sus clases.

interface Prototype<T> {
    clone(): T
}

class Usuario implements Prototype<Usuario> {

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