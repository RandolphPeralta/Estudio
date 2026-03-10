// Repository
// Separar la lógica de acceso
// a datos de la lógica de negocio.

interface UsuarioRepository {
    guardar<T>(usuario: T): void
    obtenerTodos<T>(): T[]
}

interface Memoria extends UsuarioMySQLRepository {}

interface MySQL extends UsuarioRepository {}

class UsuarioMemoriaRepository implements Memoria {

    private usuarios: Array<any> = []

    guardar<T>(usuario: T): void {
        this.usuarios.push(usuario)
    }

    obtenerTodos<T>(): T[] {
        return this.usuarios
    }
}

class UsuarioMySQLRepository implements MySQL {

    guardar<T>(usuario: T): void {
        console.log("Guardando en MySQL", usuario)
    }

    obtenerTodos<T>(): T[] {
        return []
    }
}

class UsuarioService {

    constructor(private repo: UsuarioRepository) {}

    crear<T>(usuario: T) {
        this.repo.guardar(usuario)
    }

    listar<T>(): T[] {
        return this.repo.obtenerTodos()
    }
}

type  Usuario =  {
  id: number,
  nombre: string
}

