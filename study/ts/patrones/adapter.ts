// ADAPTER  
// Permite a objetos de interfaces incompatibles 
// colaborar mutuamente

interface Arma {
    usar(): void
}

class Paladin {
    atacar(arma: Arma) {
        arma.usar()
    }
}

class Espada implements Arma {
    usar(): void {
        this.cortar()
    }

    private cortar() {

    }
}

class Cuerda {

    amarrar(): void {

    }
}

class AdaptadorCuerda implements Arma {

    constructor(private cuerda: Cuerda) { }

    usar(): void {
        this.cuerda.amarrar()
    }

}

const paladin = new Paladin()
const espada = new Espada()
const cuerda = new Cuerda()
const cuerdaAdaptada = new AdaptadorCuerda(cuerda)

paladin.atacar(espada)
paladin.atacar(cuerdaAdaptada)


