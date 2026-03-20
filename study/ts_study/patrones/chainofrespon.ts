// CHAIN OF RESPONSABILITY
// Permite pasar solicitudes a lo largo de una cadena de manejadores. 
// Al recibir una solicitud, cada manejador decide si la procesa o 
// si la pasa al siguiente manejador de la cadena.

interface Handler {
    setSiguiente(handler: Handler): Handler
    manejar(solicitud: string): void
}

abstract class BaseHandler implements Handler {

    private siguiente?: Handler

    setSiguiente(handler: Handler): Handler {
        this.siguiente = handler
        return handler
    }

    manejar(solicitud: string): void {
        if (this.siguiente) {
            this.siguiente.manejar(solicitud)
        }
    }
}

class SoporteBasico extends BaseHandler {

    manejar(solicitud: string): void {
        if (solicitud === "basico") {
            console.log("Soporte básico resolvió el problema")
        } else {
            super.manejar(solicitud)
        }
    }
}

class SoporteIntermedio extends BaseHandler {

    manejar(solicitud: string): void {
        if (solicitud === "intermedio") {
            console.log("Soporte intermedio resolvió el problema")
        } else {
            super.manejar(solicitud)
        }
    }
}

class SoporteAvanzado extends BaseHandler {

    manejar(solicitud: string): void {
        if (solicitud === "avanzado") {
            console.log("Soporte avanzado resolvió el problema")
        } else {
            super.manejar(solicitud)
        }
    }
}

const basico = new SoporteBasico()
const intermedio = new SoporteIntermedio()
const avanzado = new SoporteAvanzado()

basico.setSiguiente(intermedio).setSiguiente(avanzado)