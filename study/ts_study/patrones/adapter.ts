// ADAPTER  
// Permite a 2 objetos de interfaces incompatibles 
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
    
    usar(): void {}
    
}

class Mazo {
    aplastar(){
        console.log("Aplaztando con mazo!")
    }
}

const paladin = new Paladin()
const espada = new Espada()

