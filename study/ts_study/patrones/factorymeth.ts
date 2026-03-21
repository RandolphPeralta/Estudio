// FACTORY method (creacion)
// que define una interfaz para crear 
// objetos en una superclase, permitiendo a las
// subclases alterar el tipo de objetos 
// que se crearán

interface Transporte {
    entregar(): void
}

class Camion implements Transporte {
    entregar(): void {
        console.log("Entrega por carretera en camión")
    }
}

class Barco implements Transporte {
    entregar(): void {
        console.log("Entrega por mar en barco")
    }
}

abstract class Logistica {

    abstract crearTransporte(): Transporte

    planificarEntrega(): void {
        const transporte = this.crearTransporte()
        transporte.entregar()
    }
}

class LogisticaTerrestre extends Logistica {

    crearTransporte(): Transporte {
        return new Camion()
    }
}

class LogisticaMaritima extends Logistica {

    crearTransporte(): Transporte {
        return new Barco()
    }
}

const logistica = new LogisticaTerrestre()
logistica.planificarEntrega()
