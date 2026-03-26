// PROTOTYPE
// permite copiar objetos existentes sin que el código dependa de sus clases.

interface Prototype {
    clone(): Prototype
}

class Usuario implements Prototype {

    clone(): Usuario {
        return new Usuario()
    }

    mostrar() {

    }
}

const usuario1 = new Usuario()
const usuario2 = usuario1.clone()
usuario2.mostrar()