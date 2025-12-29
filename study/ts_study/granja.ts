abstract class Animal {
    hacerSonido(): any{}
    comer(): any{}
}

//-----------------------------

class Perro implements Animal {
    hacerSonido() {
        return "Guau"
    }
    comer() {

    }
}

//.....

class Granja {
    hogar: Array<any> = []

    agregarAnimales(animal: Animal){
        this.hogar.push(animal)
    }
}

class Gavilan implements Animal{
    hacerSonido() {
        return "Aaa"
    }

    comer() {
        
    }
}