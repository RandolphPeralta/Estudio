// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos

interface Superpoder {
    usar(): string
}

class Volar implements Superpoder {
    usar() {
        return "Volar por los cielos"
    }
}

class Volarconalgo extends Volar {
    usar() {
        return "Volar por los cielos con algo"
    }
}

class Velocidad implements Superpoder {
    usar(){
        return "Supervelocidad"}
}    


class Supertelaraña implements Superpoder {
    usar(){
        return "Trepa muros con telaraña"
    }
}
class Heroe {
    constructor(private poder: Superpoder) { }

    activarPoder() {
        return this.poder.usar()
    }
}

class Villano {
    constructor(private poder: Superpoder){}

    activarPoder(){

    }
}

const volar = new Volar()
const volarcontraje: Volarconalgo = new Volar()
const trepamuros = new Supertelaraña()

const Superman = new Heroe(volar)

const Ironman = new Heroe(volarcontraje)

const Spiderman = new Heroe(trepamuros)

const DuendeVerde = new Villano(volarcontraje)