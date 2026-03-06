// Sistema para crear un automovil

interface AutomovilBase {
    Encender(): boolean
    Apagar(): boolean
}

interface Nissan extends AutomovilBase{ 
    AutoEstacionar(): void
}

interface Toyota extends AutomovilBase {
    AutoRepararse(): void
}

class DisenioNissan implements Nissan {
    AutoEstacionar(): void { }

    Encender(): boolean {
       return true
    }

    Apagar(): boolean {
        return false
    }
}

class DisenioToyota implements Toyota {
    AutoRepararse(): void { }

    Encender(): boolean {
       return true
    }
    
    Apagar(): boolean {
        return false
    }
}

class AutoNissan {
    constructor(private disenio: Nissan){}

    Arrancar(){
        return this.disenio.Encender()
    }

    Apagarse(){
        this.disenio.AutoEstacionar()
        return this.disenio.Apagar()
    }
}

class AutoToyota {
    constructor(private disenio: Toyota){}

    Arrancar(){
        return this.disenio.Encender()
    }

    Apagarse(){
        return this.disenio.Apagar()
    }

    AccionEspecial(){
        return this.disenio.AutoRepararse()
    }
}

class Fabrica {

    constructor(private auto: AutomovilBase) {}

    probarAuto(): void {
        this.auto.Encender()
        this.auto.Apagar()
    }
}

const disenioNissan: Nissan= new DisenioNissan()
const disenioToyota: Toyota = new DisenioToyota()  
const disenio = new DisenioNissan() 
const otrodisenioToyota: AutomovilBase = new DisenioToyota()
const auto = new Fabrica(disenio)
