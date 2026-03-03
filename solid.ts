// DIP 
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

const fan: Switch = new FanFav() // Aqui puedo presentar los principios SRP,  


