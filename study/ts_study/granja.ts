// En la granja, tenemos muchos animales de granja, 
// cerdos, patos, pollos, perros, gatos y peces, pero un enemigo 
// acecha la granja un gavilan. El Gavilan siempre esta atento 
// a los pollos y en ocasiones los peces de la represa, 
// representa cada uno de ellos usando POO

abstract class Animal {
    abstract estomago: any[]
    abstract hacerSonido(): any
    abstract comer(algo: any): any
}

interface Peligroso extends Animal {
    atacar(animal: Animal): boolean
}

//-----------------------------

class Perro extends Animal {

    estomago: any[] = []

    hacerSonido() {
        return "Guau"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}

class Pollo extends Animal {

    estomago: any[] = []

    hacerSonido() {
        return "Pio"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}

class Pez extends Animal {

    estomago: any[] = []

    hacerSonido() {
        return "Glu"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}
//.....

class Gavilan implements Peligroso {

    estomago: Array<any> = []

    hacerSonido() {
        return "Aaaa"
    }

    comer(animal: Animal) {
        this.estomago.push(animal)
    }

    atacar(animal: Animal): boolean {
        this.comer(animal)
        return true
    }
}

class Granja {

    private animales: Array<any> = []

    agregarAnimal(animal: Animal) {
        this.animales.push(animal)
    }

    mostrarAnimales(): string[] {
        return this.animales.map(animalp => animalp.hacerSonido())
    }

    alerta(depredador: Peligroso, victima: Animal) {
        // "Nos atacan los animales peligrosos"
    }

}

const finca = new Granja();

const perro = new Perro();
const pollo = new Pollo();
const pez = new Pez();
const gavilan = new Gavilan();

finca.agregarAnimal(perro);
finca.agregarAnimal(pollo);
finca.agregarAnimal(pez);

console.log(finca.mostrarAnimales());

gavilan.comer(pollo);
gavilan.comer(pez);

// TOCA BUSCAR LA MANERA DE CREAR UNA ALERTA EN LA GRANJA
// APARTIR DE LAS CONCRECIONES CREAR UNA CLASE CONSUMIDORA