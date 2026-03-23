// STATE
// Permite que un objeto cambie 
// su comportamiento dependiendo 
// de su estado interno

interface EstadoSemaforo {
    cambiar(item: any): void;
}

class EstadoVerde implements EstadoSemaforo {
    cambiar(semaforo: Semaforo): void {
        semaforo.setEstado(new EstadoAmarillo());
    }
}

class EstadoAmarillo implements EstadoSemaforo {
    cambiar(semaforo: Semaforo): void {
        semaforo.setEstado(new EstadoRojo());
    }
}

class EstadoRojo implements EstadoSemaforo {
    cambiar(semaforo: Semaforo): void {
        semaforo.setEstado(new EstadoVerde());
    }
}


class Semaforo {
    private estado: EstadoSemaforo;

    constructor() {
        this.estado = new EstadoVerde(); 
    }

    public setEstado(estado: EstadoSemaforo): void {
        this.estado = estado;
    }

    public accion(): void {
        this.estado.cambiar(this);
    }
}


const semaforo = new Semaforo();
semaforo.accion(); 
