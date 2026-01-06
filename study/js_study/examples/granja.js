class Animal {
    constructor() {
        this.estomago = [];
    }

    hacerSonido() {
    }

    comer(algo) {
    }
}

class Perro extends Animal {
    hacerSonido() {
        return "Guau";
    }

    comer(algo) {
        this.estomago.push(algo);
    }
}

class Pollo extends Animal {
    hacerSonido() {
        return "Pio";
    }

    comer(algo) {
        this.estomago.push(algo);
    }
}

class Pez extends Animal {
    hacerSonido() {
        return "Glu";
    }

    comer(algo) {
        this.estomago.push(algo);
    }
}

class Granja {
    constructor() {
        this.animales = [];
    }

    agregarAnimal(animal) {
        this.animales.push(animal);
    }

    mostrarAnimales() {
        this.animales.forEach(animal =>
            console.log(animal.hacerSonido())
        );
    }

    alerta(depredador, victima) {
        return "Nos atacan los animales";
    }
}

class Gavilan extends Animal {
    constructor() {
        super();
        this.estomago = [];
    }

    hacerSonido() {
        return "Aaaa";
    }

    comer(animal) {
        this.estomago.push(animal);
    }

    atacar(animal) {
        this.comer(animal);
        return true;
    }
}

const finca = new Granja();

const pollo = new Pollo();
const pez = new Pez();
const gavilan = new Gavilan();

finca.agregarAnimal(pollo);
finca.agregarAnimal(pez);

finca.mostrarAnimales();

gavilan.comer(pollo);
gavilan.comer(pez);
