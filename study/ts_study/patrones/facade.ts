// FACADE
// proporciona una interfaz simplificada 
// a una biblioteca, un framework o cualquier 
// otro grupo complejo de clases.

// Subsistemas (complejos)
interface IProyector {
    proyectar(): void
}

class Proyector implements IProyector{
    proyectar() {
        console.log("Proyector encendido")
    }
}

class Sonido {
    encender() {
        console.log("Sistema de sonido encendido")
    }
}

// Facade (fachada)
class Reproductor {
    reproducir() {
        console.log("Reproduciendo película")
    }
}

class CineFacade {

    constructor(
        private proyector: IProyector,
        private sonido: Sonido,
        private reproductor: Reproductor
    ) {}

    verPelicula() {
        this.proyector.proyectar()
        this.sonido.encender()
        this.reproductor.reproducir()
    }
}