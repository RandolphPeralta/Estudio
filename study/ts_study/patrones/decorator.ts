// DECORATOR
// permite agregar funcionalidades 
// a un objeto en otro objeto encapsulado especial, 
// que contienen estas funcionalidades
// sin modificar su clase original.

interface Notificador {
    enviar(mensaje: any): void;
}

class NotificadorBase implements Notificador {
    enviar(mensaje: string): void {

    }
}

class NotificadorDecorator implements Notificador {
    protected envuelto: Notificador;

    constructor(notificador: Notificador) {
        this.envuelto = notificador;
    }

    enviar(mensaje: string): void {
        this.envuelto.enviar(mensaje);
    }
}

class WhatsAppDecorator extends NotificadorDecorator {
    enviar(mensaje: string): void {
        super.enviar(mensaje);
    }
}

class SMSDecorator extends NotificadorDecorator {
    enviar(mensaje: string): void {
        super.enviar(mensaje);
    }
}


let miNotificador: Notificador = new NotificadorBase();
miNotificador = new WhatsAppDecorator(miNotificador);
miNotificador = new SMSDecorator(miNotificador);

miNotificador.enviar("Hola Mundo");

