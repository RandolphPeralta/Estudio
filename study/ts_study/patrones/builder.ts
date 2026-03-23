// BUILDER
// permite construir objetos complejos paso a paso

interface ComputadoraBuilder {
    construirCPU(): void
    cnstruirRAM(): void
    construirAlmacenamiento(): void
    obtenerResultado(): Computadora
}

class Computadora {
    cpu?: string
    ram?: string
    almacenamiento?: string
}

class ComputadoraGamerBuilder implements ComputadoraBuilder {

    private computadora: Computadora = new Computadora()

    construirCPU(): void {
        
    }

    cnstruirRAM(): void {
        
    }

    construirAlmacenamiento(): void {
       
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