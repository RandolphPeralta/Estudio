// Sistema para prender un ventilador

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

    Selectnivel(): void {
        throw new Error("Method not implemented.")
    }

    TurnOn() {
        return true
    }

    TurnOff() {
        return false
    }
}

class FanFav implements Fav {

    Plug(): void {
        throw new Error("Method not implemented.")
    }

    TurnOn() {
        return true
    }
    
    TurnOff() {
        return false
    }
}

class DIPSwitch {
    constructor(private devace: Switch){}
}

class DIPfav {
    constructor(private devace: Fav){}
}

class DIPLight {
    constructor(private device: Light){}
}

// Aqui puedo presentar los principios SRP, OCP, LSP

const fanfav = new FanFav() // SRP
const fanlight: Switch = new FanLight() // SRP, OCP, LSP, ISP
const dip = new DIPSwitch(fanfav) //DIP



