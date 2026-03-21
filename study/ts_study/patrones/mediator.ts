// MEDIATOR
// Reduce las dependencias caóticas entre objetos.

interface ChatMediator {
    enviarMensaje(mensaje: string, usuario: Usuario): void
    agregarUsuario(usuario: Usuario): void
}

class ChatSala implements ChatMediator {

    private usuarios: Usuario[] = []

    agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario)
    }

    enviarMensaje(mensaje: string, usuario: Usuario): void {
    }
}

class Usuario {

    constructor(
        private mediator: ChatMediator
    ) {}

    enviar(mensaje: string) {
        this.mediator.enviarMensaje(mensaje, this)
    }

    recibir(mensaje: string) {
        
    }
}

const chat = new ChatSala()

const user = new Usuario(chat)

chat.agregarUsuario(user)
