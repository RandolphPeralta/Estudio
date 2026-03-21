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
        for (const u of this.usuarios) {
            if (u !== usuario) {
                u.recibir(mensaje)
            }
        }
    }
}

class Usuario {

    constructor(
        private nombre: string,
        private mediator: ChatMediator
    ) {}

    enviar(mensaje: string) {
        console.log(this.nombre + " envía: " + mensaje)
        this.mediator.enviarMensaje(mensaje, this)
    }

    recibir(mensaje: string) {
        console.log(this.nombre + " recibe: " + mensaje)
    }
}

const chat = new ChatSala()

const user1 = new Usuario("Carlos", chat)
const user2 = new Usuario("Ana", chat)
const user3 = new Usuario("Luis", chat)

chat.agregarUsuario(user1)
chat.agregarUsuario(user2)
chat.agregarUsuario(user3)

user1.enviar("Hola a todos")