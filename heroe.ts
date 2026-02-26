// Se quiere crear un software donde se crean
// sus propios Heroes, Villanos y demas

interface ISuperpower {
    use(): string
}

interface Hero {
    Salvar(): boolean
}

interface Villan {
    Destruir(): boolean
}

//---------------------------

abstract class Character {
    constructor(private poder: ISuperpower){}

    abstract Salvar(): boolean
    abstract Destruir(): boolean
}

class Blowup implements ISuperpower {
    use() {
        return "Vuela por los cielos"
    }
}

class Blowupwithsomething extends Blowup {
    use() {
        return "Vuela por los cielos con algo"
    }
}

class Strengh implements ISuperpower {
    use(){
        return "SuperFuerza"
    }
}

class Superman extends Character {

    Salvar(): boolean {
        return true
    }
    Destruir(): boolean {
       return false
    }
}

class Thanos extends Character {
    
    Salvar(): boolean {
        return true
    }
    Destruir(): boolean {
        return false
    }
    
}

const blowup = new Blowup()
const volarcontraje: Blowup = new Blowupwithsomething()
const fuerza = new Strengh()

const superman: Hero = new Superman(blowup)
const thanos: Villan = new Thanos(fuerza)







// const Ironman: Hero = new Character(volarcontraje)
// const Spiderman: Hero = new Character(trepamuros)
// const DuendeVerde: Villan = new Character(volarcontraje)

console.log(superman.Salvar())
// console.log(Ironman.Salvar())

console.log(thanos.Destruir())




// class Character {
//     constructor(private poder: ISuperpower) { }

//     Salvar() {
//         this.poder.use()
//         return true
//     }

//     Destruir() {
//         this.poder.use()
//         return false
//     }
// }

class Speed implements ISuperpower {
    use() {
        return "Supervelocidad"
    }
}



class Intelligence implements ISuperpower {
    use(): string {
        return "SuperInteligencia"
    }
}