// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface Accion {
    guardar<T>(item: T): boolean
    eliminar<T>(item: T): boolean
    obtenerTodos<T>(): T[]
}

interface Ejecucion {
    ejecutar(): any
}

//-----------------------

class Memoria implements Accion {

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

type Solicitud = {
    id: string
    nombre: string
    razon: string
    aprobacion: boolean
}

class View implements Ejecucion {
    constructor(private servicio: Accion) { }

   ejecutar() {
    console.log("\n===== MENU SOLICITUDES =====")
    console.log("1. Guardar solicitud")
    console.log("2. Aprobar solicitud")
    console.log("3. Rechazar solicitud")
    console.log("4. Eliminar solicitud")
    console.log("5. Mostrar solicitudes")
    console.log("0. Salir")

    const opcion = Number(prompt("Ingrese una opción: "))

    switch (opcion) {
        case 1:
            this.guardar()
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
            break
        case 2:
            this.aprobar()
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
            break
        case 3:
            this.rechazar()
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
            break
        case 4:
            this.eliminar()
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
            break
        case 5:
            this.mostrar()
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
            break
        case 0:
            console.log("Saliendo del programa...")
            return  // Salir sin volver a llamar a ejecutar
        default:
            console.log("Opción inválida");
            this.pause()
            this.ejecutar()  // Volver a mostrar el menú
    }
}

    private guardar() {
        const id = String(prompt("Ingese un ID: "))
        const nombre = String(prompt("Ingese un nombre: "))
        const razon = String(prompt("Ingrese sus razones: "))
        const solicitud: Solicitud = { id: id, nombre: nombre, razon: razon, aprobacion: false }

        this.servicio.guardar(solicitud)

        console.log("Solicitud Guardada")

    }

    private aprobar() {
        const id = String(prompt("Ingrese el ID de la solicitud: "))
        const solicitudes = this.servicio.obtenerTodos<Solicitud>()

        const solicitudEncontrada = solicitudes.find(
            solicitud => solicitud.id === id
        )

        if (!solicitudEncontrada) {
            console.log("Solicitud no encontrada")
            return
        }

        solicitudEncontrada.aprobacion = true

        console.log("Solicitud aprobada correctamente")
    }

    private rechazar() {
        const id = String(prompt("Ingrese el ID de la solicitud: "))
        const solicitudes = this.servicio.obtenerTodos<Solicitud>()

        const solicitudEncontrada = solicitudes.find(
            solicitud => solicitud.id === id
        )

        if (!solicitudEncontrada) {
            console.log("Solicitud no encontrada")
            return
        }

        solicitudEncontrada.aprobacion = false

        console.log("Solicitud desaprobada")
    }

    private eliminar() {
        const id = String(prompt("Ingrese el ID a eliminar: "))
        const solicitudes = this.servicio.obtenerTodos<Solicitud>()

        const solicitudEncontrada = solicitudes.find(solicitud => solicitud.id === id)

        if (!solicitudEncontrada) {
            console.log("No se encontró la solicitud")
            return
        }

        this.servicio.eliminar(solicitudEncontrada)
        console.log("Solicitud eliminada correctamente")
    }

    private mostrar() {
        const solicitudes = this.servicio.obtenerTodos<Solicitud>()

        if (solicitudes.length === 0) {
            console.log("No hay solicitudes")
            return
        }

        solicitudes.forEach(s => {
            console.log(`ID: ${s.id} | Nombre: ${s.nombre} | Aprobada: ${s.aprobacion}`)
        })
    }

    private pause() {
        console.log("\nPresiona ENTER para continuar...");
        prompt("");
    }
}

class App {
    constructor(private view: Ejecucion) { }

    run() {
        let continuar = true;
        while (continuar) {
            const resultado = this.view.ejecutar();
            if (resultado === false) {
                continuar = false;
            }
        }
    }
}

const memoria: Accion = new Memoria()
const view: Ejecucion = new View(memoria)
const app = new App(view)
app.run()



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
//     aprobacion: boolean
// }

// type SolicitudInformacion = Solicitud & {
//     documento: string
// }

// type SolicitudTecnologica = Solicitud & {
//     recurso: string
// }

// const Accion: Accion<Solicitud> = new Memoria<Solicitud>()
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