// BUILDER
// permite construir objetos complejos paso a paso

interface ComputadoraBuilder {
    construirCPU(): void
    cnstruirRAM(): void
    construirAlmacenamiento(): void
    obtenerResultado(): Computadora
}

class Computadora {
    cpu?: any
    ram?: any
    almacenamiento?: any
}

class ComputadoraGamerBuilder implements ComputadoraBuilder {

    private computadora = new Computadora()

    construirCPU(): void {
        this.computadora.cpu
    }

    cnstruirRAM(): void {
        this.computadora.ram
    }

    construirAlmacenamiento(): void {
       this.computadora.almacenamiento
    }

    obtenerResultado(): Computadora {
        return this.computadora
    }
}

class DirectorComputadora {

    constructor(private builder: ComputadoraBuilder) {}

    construirComputadoraBasica(): Computadora {
        this.builder.construirCPU()
        this.builder.cnstruirRAM()
        this.builder.construirAlmacenamiento()
        return this.builder.obtenerResultado()
    }
}

const buildergamer = new ComputadoraGamerBuilder()
const director = new DirectorComputadora(buildergamer)

const pc = director.construirComputadoraBasica()

console.log(pc)