// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos

interface Personaje {
    activarPoder(): string[]
}

interface Superpoder {
    usar(): string
}

abstract class PersonajeBase implements Personaje {
    protected poderes: Superpoder[] = []

    agregarPoder(poder: Superpoder) {
        this.poderes.push(poder)
    }

    activarPoder(): string[] {
        return this.poderes.map(poder => poder.usar())
    }
}

//---------------------------

type Identidad = {
    nombre: string
}

class Heroe extends PersonajeBase {
    constructor(private identidad: Identidad) {
        super()
    }

    salvarCiudad() {
        return `${this.identidad} salva la ciudad`
    }
}

class Villano extends PersonajeBase {
    destruirCiudad() {
        return `está destruyendo la ciudad`
    }
}

class Invisibilidad implements Superpoder {
    usar() {
        return "Se vuelve invisible"
    }
}

class FabricaPersonajes {
    static crearHeroe(identidad: Identidad): Heroe {
        return new Heroe(identidad)
    }

    static crearVillano(): Villano {
        return new Villano()
    }
}

const persona: Identidad = {
    nombre: "Randolph"
}