interface Power {
    usar(): boolean
}

class SuperFuerza implements Power {
    usar(): boolean {
        return true
    }
}

const fuerza: Power = new SuperFuerza()