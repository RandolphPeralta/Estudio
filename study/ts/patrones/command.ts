// COMMAND
// convierte una solicitud en un objeto independiente que 
// contiene toda la información sobre la solicitud. 

interface Command {
    ejecutar(): void
}

interface Encender extends Command {}

interface Apagar extends Command {}

class Luz {

    encender(): void {
        
    }

    apagar(): void {
        
    }
}

class EncenderLuzCommand implements Encender {

    constructor(private luz: Luz) {}

    ejecutar(): void {
        this.luz.encender()
    }
}

class ApagarLuzCommand implements Apagar {

    constructor(private luz: Luz) {}

    ejecutar(): void {
        this.luz.apagar()
    }
}

class ControlRemoto {

    constructor(private comando: Command){}

    presionarBoton() {
        this.comando.ejecutar()
    }
}

const luz = new Luz()

const encender = new EncenderLuzCommand(luz)
const apagar = new ApagarLuzCommand(luz)

const control = new ControlRemoto(encender)

control.presionarBoton()
