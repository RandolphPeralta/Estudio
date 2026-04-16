// INYECCION DE DEPENDENCIA
// Permite a una clase recibir sus dependencias 
// externamente, en lugar de crearlas internamente

interface Notificador {
    enviar(mensaje: any): void
}

interface Email extends Notificador { 

}

interface SMS extends Notificador { 
    
}

class EmailNotificador implements Email {
    enviar(mensaje: string): void {
    }
}

class SMSNotificador implements SMS {
    enviar(mensaje: string): void {
    }
}

class ServicioNotificacion {

    constructor(private notificador: Notificador) {}

    notificar(mensaje: string) {
        this.notificador.enviar(mensaje)
    }
}

const email = new EmailNotificador()

const servicio = new ServicioNotificacion(email)

servicio.notificar("Hola usuario")