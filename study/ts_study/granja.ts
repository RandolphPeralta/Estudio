//En la Finca del Sr Pablo, tenemos muchos animales de granja, 
// cerdos, patos, pollos, perros, gatos y peces, pero un enemigo 
// acecha la Finca un Gavilan !!! El Gavilan siempre esta atento 
// a los pollos y en ocasiones los peces de la represa, 
// representa cada uno de ellos usando POO

abstract class Animal {
    estomago: Array<any> = []

    abstract hacerSonido(): string
    abstract comer(algo: any): any
}

//-----------------------------

class Perro extends Animal {
    hacerSonido() {
        return "Guau"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}

class Pollo extends Animal {
    hacerSonido() {
        return "Pio"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}

class Pez extends Animal {
    hacerSonido(){
        return "Glu"
    }

    comer(algo: any) {
        this.estomago.push(algo)
    }
}
//.....

class Granja {
    animales: Array<any> = []

    agregarAnimal(animal: Animal){
        this.animales.push(animal)
    }

   mostrarAnimales() {
    return this.animales.forEach(animalcualquiera => console.log(animalcualquiera.hacerSonido()))
  }
}

class Gavilan extends Animal {
    hacerSonido() {
        return "Aaaa"
    }

    comer(animal: Animal) {
        this.estomago.push(animal)
        return "Devoro una presa!"
    }
}

const finca = new Granja();

const pollo = new Pollo();
const pez = new Pez();
const gavilan = new Gavilan();

finca.agregarAnimal(pollo);
finca.agregarAnimal(pez);

finca.mostrarAnimales();

gavilan.comer(pollo)
gavilan.comer(pez)

class Persona {
    saludo(): string {
        return "Hola"
    }
}

const persona = new Persona
persona.saludo();