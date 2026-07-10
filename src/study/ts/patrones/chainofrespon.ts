// CHAIN OF RESPONSABILITY
// Permite pasar solicitudes a lo largo de una cadena de manejadores. 

interface Handler {
    Siguiente(handler: Handler): Handler
    manejar(solicitud: string): void
}

abstract class BaseHandler implements Handler {

    private siguiente?: Handler

    Siguiente(handler: Handler): Handler {
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
            
        } else {
            super.manejar(solicitud)
        }
    }
}

class SoporteIntermedio extends BaseHandler {

    manejar(solicitud: string): void {
        if (solicitud === "intermedio") {
            
        } else {
            super.manejar(solicitud)
        }
    }
}

class SoporteAvanzado extends BaseHandler {

    manejar(solicitud: string): void {
        if (solicitud === "avanzado") {
            
        } else {
            super.manejar(solicitud)
        }
    }
}

const basico = new SoporteBasico()
const intermedio = new SoporteIntermedio()
const avanzado = new SoporteAvanzado()

basico.Siguiente(intermedio).Siguiente(avanzado)