// COMMAND
// convierte una solicitud en un objeto independiente que 
// contiene toda la información sobre la solicitud. 

interface Command {
    ejecutar(): void
}

class Luz {

    encender(): void {
        console.log("Luz encendida")
    }

    apagar(): void {
        console.log("Luz apagada")
    }
}

class EncenderLuzCommand implements Command {

    constructor(private luz: Luz) {}

    ejecutar(): void {
        this.luz.encender()
    }
}

class ApagarLuzCommand implements Command {

    constructor(private luz: Luz) {}

    ejecutar(): void {
        this.luz.apagar()
    }
}

class ControlRemoto {

    private comando!: Command

    setComando(comando: Command) {
        this.comando = comando
    }

    presionarBoton() {
        this.comando.ejecutar()
    }
}

const luz = new Luz()

const encender = new EncenderLuzCommand(luz)
const apagar = new ApagarLuzCommand(luz)

const control = new ControlRemoto()

control.setComando(encender)
control.presionarBoton()

control.setComando(apagar)
control.presionarBoton()