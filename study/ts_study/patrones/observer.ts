// OBSERVER
// Define un mecanismo de suscripción 
// para notificar a varios objetos sobre cualquier 
// evento que le suceda al objeto que están observando.

interface Suscriptor {
    recibirNotificacion(noticia: string): void;
}

class Newsletter {
    private suscriptores: Suscriptor[] = [];

    subscribe(lector: Suscriptor) {
        this.suscriptores.push(lector);
    }

    enviarNoticia(noticia: string) {
        for (const subscriptor of this.suscriptores) {
            subscriptor.recibirNotificacion(noticia);
        }
    }
}

class LectorFiel implements Suscriptor {
    recibirNotificacion(noticia: string) {
    }
}

class LectorCritico implements Suscriptor {
    recibirNotificacion(noticia: string) {
    }
}

const miBlog = new Newsletter();

const juan = new LectorFiel();
const ana = new LectorCritico();

miBlog.subscribe(juan);
miBlog.subscribe(ana);