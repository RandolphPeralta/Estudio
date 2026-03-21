// BUILDER
// permite construir objetos complejos paso a paso

interface ComputadoraBuilder {
    construirCPU(cpu: string): void
    cnstruirRAM(ram: string): void
    construirAlmacenamiento(almacenamiento: string): void
    obtenerResultado(): Computadora
}

class Computadora {
    cpu?: string
    ram?: string
    almacenamiento?: string
}

class ComputadoraGamerBuilder implements ComputadoraBuilder {

    private computadora: Computadora = new Computadora()

    construirCPU(cpu: string): void {
        
    }

    cnstruirRAM(ram: string): void {
        
    }

    construirAlmacenamiento(almacenamiento: string): void {
       
    }

    obtenerResultado(): Computadora {
        return this.computadora
    }
}

class DirectorComputadora {

    constructor(private builder: ComputadoraBuilder) {}

    construirComputadoraBasica(): Computadora {
        this.builder.construirCPU("Intel i5")
        this.builder.cnstruirRAM("16GB")
        this.builder.construirAlmacenamiento("512GB SSD")
        return this.builder.obtenerResultado()
    }
}

const builder = new ComputadoraGamerBuilder()

const director = new DirectorComputadora(builder)

const pc = director.construirComputadoraBasica()

console.log(pc)