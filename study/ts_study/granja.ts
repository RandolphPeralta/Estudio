abstract class Animal {
    hacerSonido(): any{}
}

//-----------------------------

class Perro implements Animal {
    hacerSonido() {
        return "Guau"
    }
}

//.....


class Granja {
    hogar: Array<any> = []

    agregarAnimales(animal: Animal){
        this.hogar.push(animal)
    }
}

