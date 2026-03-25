// BRIDGE
// permite dividir una clase grande, o un grupo de clases estrechamente 
// relacionadas, en dos jerarquías separadas (abstracción e implementación) 
// que pueden desarrollarse independientemente la una de la otra.

interface Dispositivo {
    encender(): void
    apagar(): void
    Volumen(vol: number): void
}

class TV implements Dispositivo {

    encender(): void {
        
    }

    apagar(): void {
        
    }

    Volumen(vol: number): void {
        
    }
}

class Radio implements Dispositivo {

    encender(): void {
        
    }

    apagar(): void {
        
    }

    Volumen(vol: number): void {
        
    }
}

class ControlRemoto {

    constructor(protected dispositivo: Dispositivo) {}

    encender() {
        this.dispositivo.encender()
    }

    apagar() {
        this.dispositivo.apagar()
    }
}

class ControlAvanzado extends ControlRemoto {

    subirVolumen() {
        this.dispositivo.Volumen(100)
    }
}