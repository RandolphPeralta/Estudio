// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes

interface Accion {
    guardar<T>(item: T): boolean
    eliminar<T>(item: T): boolean
    obtenerTodos<T>(): T[]
}

interface SistemaSolicitud<T> {
    Aprobada(item: T): boolean
    Desaprobada(item: T): boolean
}

//-----------------------

class MemoriaAccion implements Accion {

    private datos = new Set()

    guardar<T>(item: T): boolean {
        this.datos.add(item)
        return true
    }

    eliminar<T>(item: T): boolean {
        return this.datos.delete(item)
    }

    obtenerTodos<T>(): T[] {
        return Array.from(this.datos.values()) as T[]
    }
}











// class Solicitudes<T> {
//     constructor(private Accion: Accion<T>) { }

//     Aprobada(item: T) {
//         return this.Accion.guardar(item)
//     }

//     Desaprobada(item: T) {
//         return this.Accion.eliminar(item)
//     }

//     MostrarInfo() {
//         return this.Accion.obtenerTodos()
//     }
// }

//------------------------

// type Solicitud = {
//     id: string
//     nombre: string
// }

// type SolicitudInformacion = Solicitud & {
//     documento: string
// }

// type SolicitudTecnologica = Solicitud & {
//     recurso: string
// }

// const Accion: Accion<Solicitud> = new MemoriaAccion<Solicitud>()
// const solicitudes: SistemaSolicitud<Solicitud> = new Solicitudes(Accion)

// const solicitud1: Solicitud = {
//     id: "1",
//     nombre: "Randolph"
// }

// const solicitud2: Solicitud = {
//     id: "2",
//     nombre: "Sara"
// }

// solicitudes.Aprobada(solicitud1)
// solicitudes.Desaprobada(solicitud2)