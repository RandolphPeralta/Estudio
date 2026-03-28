// MEDIATOR
// Reduce las dependencias caóticas entre objetos.

interface ChatMediator {
    enviarMensaje(mensaje: any, usuario: any): void
}

interface Usuario {
    enviar(item: any, user: Usuario): void
    recibir(): void
}

class Usuario1 implements Usuario {

    constructor(private chat: ChatMediator){}

    accion1(){}

    enviar(mensaje: any, usuario: Usuario) {
        this.chat.enviarMensaje(mensaje, usuario)
    }

    recibir() {
    }
}


class Usuario2 implements Usuario {
    constructor(private chat: ChatMediator){}

    accion2(){}

    enviar(mensaje: any, usuario: Usuario) {
        this.chat.enviarMensaje(mensaje, usuario)
    }

    recibir() {
    }
}

class ChatSala implements ChatMediator {

    private usuarios: Usuario[] = []

    agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario)
    }

    enviarMensaje(mensaje: any, usuario: Usuario): void {
    }
}



const chat = new ChatSala()

const user = new Usuario1(chat)
const user2 = new Usuario2(chat)

chat.agregarUsuario(user)
chat.agregarUsuario(user2)

const mensajeuser2 = user2.enviar("Hola", user)

chat.enviarMensaje(mensajeuser2, user)
