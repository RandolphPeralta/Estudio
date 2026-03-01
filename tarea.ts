// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes

abstract class Accion<T> {
    abstract guardar(item: T): boolean
    abstract eliminar(item: T): boolean
    abstract obtenerTodos(): T[]
}

interface Sistema<T> {
    Aprobada(item: T): boolean
    Desaprobada(item: T): boolean
}

//-----------------------

class Memoria<T> extends Accion<T> {

    private datos = new Set<T>()

    guardar(item: T): boolean {
        this.datos.add(item)
        return true
    }

    eliminar(item: T): boolean {
        return this.datos.delete(item)
    }

    obtenerTodos(): T[] {
        return Array.from(this.datos.values()) as T[]
    }
}

class Solicitudes<T> {
    constructor(private Accion: Accion<T>) { }

    Aprobada(item: T) {
        return this.Accion.guardar(item)
    }

    Desaprobada(item: T) {
        return this.Accion.eliminar(item)
    }

    MostrarInfo() {
        return this.Accion.obtenerTodos()
    }
}

//------------------------

type Solicitud = {
    id: string
    nombre: string
    aprobacion: boolean
}

// type SolicitudInformacion = Solicitud & {
//     documento: string
// }

// type SolicitudTecnologica = Solicitud & {
//     recurso: string
// }

const accion: Accion<Solicitud> = new Memoria<Solicitud>()
const solicitudes: Solicitudes<Solicitud> = new Solicitudes(accion)

const solicitud1: Solicitud = {
    id: "1",
    nombre: "Randolph",
    aprobacion: true
}

// const solicitud2: Solicitud = {
//     id: "2",
//     nombre: "Sara"
// }

solicitudes.Aprobada(solicitud1)
//solicitudes.Desaprobada(solicitud2)