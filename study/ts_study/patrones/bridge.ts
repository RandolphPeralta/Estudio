// BRIDGE
// permite dividir una clase grande, o un grupo de clases estrechamente 
// relacionadas, en dos jerarquías separadas (abstracción e implementación) 
// que pueden desarrollarse independientemente la una de la otra.

interface Dispositivo {
    encender(): void
    apagar(): void
    setVolumen(vol: number): void
}

class TV implements Dispositivo {

    encender(): void {
        console.log("TV encendida")
    }

    apagar(): void {
        console.log("TV apagada")
    }

    setVolumen(vol: number): void {
        console.log("Volumen TV:", vol)
    }
}

class Radio implements Dispositivo {

    encender(): void {
        console.log("Radio encendida")
    }

    apagar(): void {
        console.log("Radio apagada")
    }

    setVolumen(vol: number): void {
        console.log("Volumen Radio:", vol)
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
        this.dispositivo.setVolumen(100)
    }
}