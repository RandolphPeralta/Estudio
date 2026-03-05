// Sistema para crear un automovil

interface AutomovilBase {
    Encender(): boolean
    Apagar(): boolean
}

interface Nissan extends AutomovilBase{ 
    AutoEstacionar(): void
}

interface Tesla extends AutomovilBase {
    Autopilot(): void
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

class DisenioTesla implements Tesla {
    Autopilot(): void { }

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

class AutoTesla {
    constructor(private disenio: Tesla){}

    Arrancar(){
        return this.disenio.Encender()
    }

    Apagarse(){
        return this.disenio.Apagar()
    }

    AccionEspecial(){
        return this.disenio.Autopilot()
    }
}

const disenioNissan: Nissan= new DisenioNissan()
const disenioTesla: Tesla = new DisenioTesla()  
const disenio = new DisenioNissan() 
const otrodisenioTesla: AutomovilBase = new DisenioTesla()
const autoNissan = new AutoNissan(disenioNissan) 
const dautoTesla = new AutoTesla(disenioTesla)