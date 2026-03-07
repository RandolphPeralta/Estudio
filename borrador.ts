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

class Fabrica {

    constructor(private disenioauto: AutomovilBase) {}

    probarAuto(): void {
        this.disenioauto.Encender()
        this.disenioauto.Apagar()
    }
}

const disenionissan = new DisenioNissan() 
const otrodisenioToyota: AutomovilBase = new DisenioToyota()
const auto = new Fabrica(disenionissan)
