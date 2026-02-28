// Una empresa quiere: Crear solicitudes de acceso, Aprobar, Rechazar, y Mostrar resultados

interface Repositorio<T> {
  guardar(item: T): boolean
  obtenerTodos(): T[]
}

interface SistemaSolicitud<T> {
    Aprobada(item: T): boolean
    Desaprobada(item: T): boolean
}

//-----------------------

class MemoriaRepositorio<T> implements Repositorio<T> {

  private datos: T[] = []

  guardar(item: T): boolean {
    this.datos.push(item)
    return true
  }

  obtenerTodos(): T[] {
    return [...this.datos]
  }
}

class Solicitude<T> {
    constructor(private repositorio: Repositorio<T>){}

    Aprobada(item: T){
        return this.repositorio.guardar(item)
    }

    Desaprobada(item: T) {
        return false
    }

    MostrarInfo(){
        return this.repositorio.obtenerTodos()
    }
}

//------------------------

type Solicitud = {
  id: string
  solicitante: string
}

type SolicitudTecnologica = Solicitud & {
    recurso: string
}

const repositorio: Repositorio<Solicitud> = new MemoriaRepositorio<Solicitud>()
const solicitudes: SistemaSolicitud<Solicitud> = new Solicitude(repositorio)

const solicitud: Solicitud = {
    id: "1",
    solicitante: "Randolph",
}

solicitudes.Aprobada(solicitud)
