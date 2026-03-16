// BUILDER
// permite construir objetos complejos paso a paso

interface ComputadoraBuilder {
    setCPU(cpu: string): void
    setRAM(ram: string): void
    setAlmacenamiento(almacenamiento: string): void
    obtenerResultado(): Computadora
}

class Computadora {
    cpu?: string
    ram?: string
    almacenamiento?: string
}

class ComputadoraGamerBuilder implements ComputadoraBuilder {

    private computadora: Computadora = new Computadora()

    setCPU(cpu: string): void {
        this.computadora.cpu = cpu
    }

    setRAM(ram: string): void {
        this.computadora.ram = ram
    }

    setAlmacenamiento(almacenamiento: string): void {
        this.computadora.almacenamiento = almacenamiento
    }

    obtenerResultado(): Computadora {
        return this.computadora
    }
}

class DirectorComputadora {

    constructor(private builder: ComputadoraBuilder) {}

    construirComputadoraBasica(): Computadora {
        this.builder.setCPU("Intel i5")
        this.builder.setRAM("16GB")
        this.builder.setAlmacenamiento("512GB SSD")
        return this.builder.obtenerResultado()
    }
}

const builder = new ComputadoraGamerBuilder()

const director = new DirectorComputadora(builder)

const pc = director.construirComputadoraBasica()

console.log(pc)