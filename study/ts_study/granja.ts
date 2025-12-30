//En la Finca del Sr Pablo, tenemos muchos animales de granja, 
// cerdos, patos, pollos, perros, gatos y peces, pero un enemigo 
// acecha la Finca un Gavilan !!! El Gavilan siempre esta atento 
// a los pollos y en ocasiones los peces de la represa, 
// representa cada uno de ellos usando POO

abstract class Animal {
    hacerSonido(): any{}
    comer(algo: any): any{}
}

//-----------------------------

class Perro implements Animal {
    private estomago: Array<any> = []
    hacerSonido() {
        return "Guau"
    }
    comer() {

    }
}

class Pollo implements Animal {
    private estomago: Array<any> = []
    hacerSonido() {
        return "Pio"
    }
    comer() {

    }
}

class Pez implements Animal {
    private estomago: Array<any> = []
    hacerSonido() {
        return "Glu"
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
    private estomago: Array<any> = []
    hacerSonido() {
        return "Aaa"
    }

    comer(pollito: Pollo) {
        this.estomago.push(pollito)
        return "Comio pollo"
    }

    comerPez(pececito: Pez){
        this.estomago.push(pececito)
    }
}