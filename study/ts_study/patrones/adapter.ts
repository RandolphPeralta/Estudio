// ADAPTER  
// Permite a objetos de interfaces incompatibles 
// colaborar mutuamente

interface Arma {
    usar(): void
}

class Paladin {
    atacar(arma: Arma){
        arma.usar()
    }
}

class Espada {
    cortar(){
        console.log("Cortando con espada!")
    }
}

class AdaptadorEspada implements Arma {
    
    constructor(private espada: Espada){}
    
    usar(): void {
        this.espada.cortar()
    }
    
}

class Mazo {
    aplastar(){
        console.log("Aplaztando con mazo!")
    }
}

class AdaptadorMazo implements Arma {
    
    constructor(private mazo: Mazo){}
    
    usar(): void {
        this.mazo.aplastar()
    }
    
}

const paladin = new Paladin()
const espada = new Espada()
const espadaAdaptada = new AdaptadorEspada(espada)

const mazo = new Mazo()
const mazoAdaptado = new AdaptadorMazo(mazo)


paladin.atacar(espadaAdaptada)
paladin.atacar(mazoAdaptado)

