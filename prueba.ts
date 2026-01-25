interface Superpoder {
    usar(): any
}

class HeroeVolador implements Superpoder {
    usar(){
        return "Volando"
    }
}

class App {
    constructor(private poder: Superpoder){}

    activarPoder(){
        return this.poder.usar()
    }
}