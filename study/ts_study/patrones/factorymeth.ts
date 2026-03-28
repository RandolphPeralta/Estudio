// FACTORY method (creacion)
// que define una interfaz para crear 
// objetos en una superclase, permitiendo a las
// subclases alterar el tipo de objetos 
// que se crearán

interface Transporte {
    entregar(): void
}

interface Camion extends Transporte{}
interface Barco extends Transporte {}

class CamionRenault implements Transporte {
    entregar(): void {
        
    }
}

class BarcoBenetau implements Barco{
    entregar(): void {
        
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
        return new CamionRenault()
    }
}

class LogisticaMaritima extends Logistica {

    crearTransporte(): Transporte {
        return new BarcoBenetau()
    }
}

const logistica = new LogisticaTerrestre()
logistica.planificarEntrega()
