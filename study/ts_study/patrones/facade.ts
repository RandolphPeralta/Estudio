// FACADE
// proporciona una interfaz simplificada 
// a una biblioteca, un framework o cualquier 
// otro grupo complejo de clases.

interface IProyector {
    proyectar(): void
}

interface ISonido {
    encender(): void
}

interface IReproductor {
    reproducir(): void
}

class ProyectorSony implements IProyector{
    proyectar() {
        console.log("Proyector encendido")
    }
}

class SonidoSamsung implements ISonido {
    encender() {
        console.log("Sistema de sonido encendido")
    }
}

class ReproductorLG implements IReproductor {
    reproducir() {
        console.log("Reproduciendo película")
    }
}

class CineFacade {

    constructor(
        private proyector: IProyector,
        private sonido: ISonido,
        private reproductor: IReproductor
    ) {}

    verPelicula() {
        this.proyector.proyectar()
        this.sonido.encender()
        this.reproductor.reproducir()
    }
}