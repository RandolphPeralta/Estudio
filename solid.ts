// Sistema para un ventilador

interface Switch {
    TurnOn(): boolean
    TurnOff(): boolean
}

interface Light extends Switch{
    Selectnivel(): void
}

interface Fav extends Switch{
    Plug(): void
}

class FanLight implements Light {

    Selectnivel(): void { }

    TurnOn() { return true }

    TurnOff() { return false }
}

class FanFav implements Fav {

    Plug(): void { }

    TurnOn() { return true }
    
    TurnOff() { return false }
}

class DIPfav {
    constructor(private devace: Fav){}

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

class DIPLight {
    constructor(private devace: Light){}

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

const fanfav: Fav = new FanFav() // SRP, ocp
const fanlight: Light = new FanLight() // SRP, OCP
const fanlight2: Switch = new FanLight //, ISP
const fan = new FanFav() // LSP
const dipswitch = new DIPfav(fanfav) // DIP
const diplight = new DIPLight(fanlight) // DIP



