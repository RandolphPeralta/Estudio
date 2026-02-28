// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes

interface Repositorio<T> {
    guardar(item: T): boolean
    eliminar(item: T): boolean
    obtenerTodos(): T[]
}

interface SistemaSolicitud<T> {
    Aprobada(item: T): boolean
    Desaprobada(item: T): boolean
}

//-----------------------

class MemoriaRepositorio<T> implements Repositorio<T> {

    private datos = new Set<T>()

    guardar(item: T): boolean {
        this.datos.add(item)
        return true
    }

    eliminar(item: T): boolean {
        this.datos.delete(item)
        return false
    }

    obtenerTodos(): T[] {
        return Array.from(this.datos.values())
    }
}

class Solicitudes<T> {
    constructor(private repositorio: Repositorio<T>) { }

    Aprobada(item: T) {
        return this.repositorio.guardar(item)
    }

    Desaprobada(item: T) {
        return this.repositorio.eliminar(item)
    }

    MostrarInfo() {
        return this.repositorio.obtenerTodos()
    }
}

//------------------------

type Solicitud = {
    id: string
    nombre: string
}

type SolicitudInformacion = Solicitud & {
    documento: string
}

type SolicitudTecnologica = Solicitud & {
    recurso: string
}

const repositorio: Repositorio<Solicitud> = new MemoriaRepositorio<Solicitud>()
const solicitudes: SistemaSolicitud<Solicitud> = new Solicitudes(repositorio)

const solicitud1: Solicitud = {
    id: "1",
    nombre: "Randolph"
}

const solicitud2: Solicitud = {
    id: "2",
    nombre: "Sara"
}

solicitudes.Aprobada(solicitud1)
solicitudes.Desaprobada(solicitud2)