// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

abstract class Accion {
    abstract guardar<T>(item: T): boolean
    abstract eliminar<T>(item: T): boolean
    abstract obtenerTodos<T>(): T[]
}

interface Ejecucion {
    ejecutar(): any
}

//-----------------------

class Memoria extends Accion {

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

class Kafka extends Accion {
    guardar<T>(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    eliminar<T>(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    obtenerTodos<T>(): T[] {
        throw new Error("Method not implemented.");
    }
    actualizar<T>(item: T): boolean {
        throw new Error("Method not implemented.");
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
            this.ejecutar()  
            break
        case 2:
            this.aprobar()
            this.pause()
            this.ejecutar()  
            break
        case 3:
            this.rechazar()
            this.pause()
            this.ejecutar()  
            break
        case 4:
            this.eliminar()
            this.pause()
            this.ejecutar()  
            break
        case 5:
            this.mostrar()
            this.pause()
            this.ejecutar()  
            break
        case 0:
            console.log("Saliendo del programa...")
            return 
        default:
            console.log("Opción inválida");
            this.pause()
            this.ejecutar()  
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