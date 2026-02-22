// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos

interface Superpower {
    use(): string
}

class Blowup implements Superpower {
    use() {
        return "Blowup por los cielos"
    }
}

class Blowupwithsomething extends Blowup {
    use() {
        return "Blowup por los cielos con algo"
    }
}

class Speed implements Superpower {
    use(){
        return "Supervelocidad"}
}    


class Supertelaraña implements Superpower {
    use(){
        return "Trepa muros con telaraña"
    }
}
class Hero {
    constructor(private poder: Superpower) { }

    activarPoder() {
        return this.poder.use()
    }
}

class Villan {
    constructor(private poder: Superpower){}

    activarPoder(){
        return this.poder.use()
    }
}

const blowup = new Blowup()
const volarcontraje: Blowupwithsomething = new Blowup()
const trepamuros = new Supertelaraña()

const Superman = new Hero(blowup)

const Ironman = new Hero(volarcontraje)

const Spiderman = new Hero(trepamuros)

const DuendeVerde = new Villan(volarcontraje)

