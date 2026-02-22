// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos

interface Personaje {
    activarPoder(): string[]
}

interface Poder {
    usar(): string
}

abstract class PersonajeBase implements Personaje {
    protected poderes: Poder[] = []

    agregarPoder(poder: Poder) {
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
        return `${this.identidad.nombre} salva la ciudad, con su poder donde ${this.activarPoder()}`
    }
}

class Villano extends PersonajeBase {
    constructor(private identidad: Identidad) {
        super()
    }

    destruirCiudad() {
        return `${this.identidad.nombre} está destruyendo la ciudad, con su poder ${this.activarPoder()}`
    }
}

class Invisibilidad implements Poder {
    usar() {
        return "Se vuelve invisible"
    }
}

class SuperFuerza implements Poder {
    usar(): string {
        return "Se vuelve muy fuerte"
    }
}

const persona: Identidad = {
    nombre: "Randolph"
}

const poder1 = new SuperFuerza()

const heroe1 = new Heroe(persona)

heroe1.agregarPoder(poder1)
console.log(heroe1.salvarCiudad())

console.log(heroe1.activarPoder())