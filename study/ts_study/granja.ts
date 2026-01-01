//En la Finca del Sr Pablo, tenemos muchos animales de granja, 
// cerdos, patos, pollos, perros, gatos y peces, pero un enemigo 
// acecha la Finca un Gavilan !!! El Gavilan siempre esta atento 
// a los pollos y en ocasiones los peces de la represa, 
// representa cada uno de ellos usando POO

abstract class Animal {
    protected estomago: any[] = []

    abstract hacerSonido(): void
    abstract comer(algo: any): void
}

//-----------------------------

class Perro extends Animal {
    hacerSonido(): void {
        console.log("Guau 🐶")
    }

    comer(algo: any): void {
        this.estomago.push(algo)
    }
}

class Pollo extends Animal {
    hacerSonido(): void {
        console.log("Pio 🐔")
    }

    comer(algo: any): void {
        this.estomago.push(algo)
    }
}

class Pez extends Animal {
    hacerSonido(): void {
        console.log("Glu 🐟")
    }

    comer(algo: any): void {
        this.estomago.push(algo)
    }
}
//.....

class Granja {
    animales: Array<any> = []

    agregarAnimal(animal: Animal){
        this.animales.push(animal)
    }

   mostrarAnimales(): void {
    this.animales.forEach(animalcualquiera => animalcualquiera.hacerSonido())
  }
}

class Gavilan extends Animal {
    hacerSonido(): void {
        console.log("Aaaa 🦅")
    }

    comer(animal: Animal): void {
        this.estomago.push(animal)
        console.log("Devoro una presa ⚠️")
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