// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos

interface Superpower {
    use(): string
}

interface Hero {
    Salvar(): string
}

interface Villan {
    Destruir(): string
}

//-----------------------

class Character {
    constructor(private poder: Superpower) { }

    Salvar() {
        return this.poder.use()
    }

    Destruir() {
        return this.poder.use()
    }
}




class Blowup implements Superpower {
    use() {
        return "Vuela por los cielos"
    }
}

class Blowupwithsomething extends Blowup {
    use() {
        return "Vuela por los cielos con algo"
    }
}

class Speed implements Superpower {
    use() {
        return "Supervelocidad"
    }
}

class Supertelaraña implements Superpower {
    use() {
        return "Trepa muros con telaraña"
    }
}

class Intelligence implements Superpower {
    use(): string {
        return "Muy Inteligente"
    }
}




const blowup = new Blowup()
const volarcontraje: Blowup = new Blowupwithsomething()
const trepamuros = new Supertelaraña()





const Superman: Hero = new Character(blowup)

const Ironman: Hero = new Character(volarcontraje)

const Spiderman: Hero = new Character(trepamuros)

const DuendeVerde: Villan = new Character(volarcontraje)

console.log(Superman.Salvar())
console.log(Ironman.Salvar())




