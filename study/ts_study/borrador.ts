// 1. Intrfaces

interface IIdentificable {
    getId(): number;
}

interface IMonitorizable {
    revisarEstado(): void;
}

// 2. Clase SensorVital - Composicion

class SensorVital {
    private frecuenciaCardiaca: number;

    constructor(frecuenciaInicial:  number){
        this.frecuenciaCardiaca = frecuenciaInicial
    }

    public actualizarFrecuencia(nuevaFrecuencia: number): void {
        this.frecuenciaCardiaca = nuevaFrecuencia
    }

    public obtenerFrecuencia(): number {
        return this.frecuenciaCardiaca
    }
}

// 3. Clase abstracta Animal - Base para herencia

abstract class Animal implements IIdentificable, IMonitorizable {
    private id: number;
    private nombre: string;
    private sensor: SensorVital;

    constructor(id: number, nombre: string, sensor: SensorVital){
        this.id = id;
        this.nombre = nombre;
        this.sensor = sensor;
    }

    public getId(): number{
        return this.id;
    }

    public getNombre(): string {
        return this.nombre
    }

    public getSensor(): SensorVital {
        return this.sensor;
    }

    abstract hacerSonido(): void;

    public revisarEstado(): void {
        console.log(`Estadp de ${this.getNombre()} - Frecuencia cardiaca: ${this.sensor.obtenerFrecuencia()}`)
    }
}

// 4. Clases Especificas (polimorfismo + herencia)

class Leon extends Animal{
    public hacerSonido(): void {
        console.log(`${this.getNombre()} ruge fuertemente`)
    }
}

class Elefante extends Animal {
    public hacerSonido(): void {
        console.log(`${this.getNombre()} trompetea con fuerza`)
    }
}

// 5. Clase Zoologico - Composicion Fuerte

class Zoologico {
    private animales: Animal[] = [];

    public agregarAnimal(animal: Animal): void {
        this.animales.push(animal);
    }

    public mostrarSonidos(): void {
        this.animales.forEach((animal => animal.hacerSonido()));
    }

    public revisarAnimales(): void {
        this.animales.forEach((animal => animal.revisarEstado()));
    }
}

// =============================================================
// 6. Programa principal
// =============================================================
const sensorLeon = new SensorVital(80);
const sensorElefante = new SensorVital(55);

const leon = new Leon(1, "Simba", sensorLeon);
const elefante = new Elefante(2, "Dumbo", sensorElefante);

const zoo = new Zoologico();
zoo.agregarAnimal(leon);
zoo.agregarAnimal(elefante);

zoo.mostrarSonidos();
zoo.revisarAnimales();

// Cambiamos frecuencias (simulando cambios de salud)
sensorLeon.actualizarFrecuencia(90);
sensorElefante.actualizarFrecuencia(60);

zoo.revisarAnimales();
