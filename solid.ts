// Sistema para un ventilador

interface Switch {
    TurnOn(): boolean
    TurnOff(): boolean
}

interface Samurai extends Switch{
    Selectnivel(): void
}

interface Olimpo extends Switch{
    Plug(): void
}

class DisenioSamurai implements Samurai {

    Selectnivel(): void { }

    TurnOn() { return true }

    TurnOff() { return false }
}

class DisenioOlimpo implements Olimpo {

    Plug(): void { }

    TurnOn() { return true }
    
    TurnOff() { return false }
}

class VentilatorOlimpo {
    constructor(private devace: Olimpo){}

    turnOn(){
        return this.devace.TurnOn()
    }

    turnOff(){
        return this.devace.TurnOff()
    }

    Plug(){
        return this.devace.Plug()
    }

}

class VentilatorSamurai {
    constructor(private devace: Samurai){}

    turnOn(){
        return this.devace.TurnOn()
    }

    turnOff(){
        return this.devace.TurnOff()
    }

    select(){
        return this.devace.Selectnivel()
    }

}

// Aqui puedo presentar los principios

const fanfav: Olimpo = new DisenioOlimpo() // SRP, OCP
const fanlight: Samurai = new DisenioSamurai() // SRP, OCP
const fan = new DisenioOlimpo() // LSP
const fanlight2: Switch = new DisenioSamurai() //, ISP
const dipswitch = new VentilatorOlimpo(fanfav) // DIP
const diplight = new VentilatorSamurai(fanlight) // DIP



