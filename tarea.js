"use strict";
// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var prompt = promptSync();
//-----------------------
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.datos = new Set();
    }
    Memoria.prototype.guardar = function (item) {
        this.datos.add(item);
        return true;
    };
    Memoria.prototype.eliminar = function (item) {
        return this.datos.delete(item);
    };
    Memoria.prototype.obtenerTodos = function () {
        return Array.from(this.datos.values());
    };
    return Memoria;
}());
var View = /** @class */ (function () {
    function View(servicio) {
        this.servicio = servicio;
    }
    View.prototype.ejecutar = function () {
        console.log("\n===== MENU SOLICITUDES =====");
        console.log("1. Guardar solicitud");
        console.log("2. Aprobar solicitud");
        console.log("3. Rechazar solicitud");
        console.log("4. Eliminar solicitud");
        console.log("5. Mostrar solicitudes");
        console.log("0. Salir");
        var opcion = Number(prompt("Ingrese una opción: "));
        switch (opcion) {
            case 1:
                this.guardar();
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
                break;
            case 2:
                this.aprobar();
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
                break;
            case 3:
                this.rechazar();
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
                break;
            case 4:
                this.eliminar();
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
                break;
            case 5:
                this.mostrar();
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
                break;
            case 0:
                console.log("Saliendo del programa...");
                return; // Salir sin volver a llamar a ejecutar
            default:
                console.log("Opción inválida");
                this.pause();
                this.ejecutar(); // Volver a mostrar el menú
        }
    };
    View.prototype.guardar = function () {
        var id = String(prompt("Ingese un ID: "));
        var nombre = String(prompt("Ingese un nombre: "));
        var razon = String(prompt("Ingrese sus razones: "));
        var solicitud = { id: id, nombre: nombre, razon: razon, aprobacion: false };
        this.servicio.guardar(solicitud);
        console.log("Solicitud Guardada");
    };
    View.prototype.aprobar = function () {
        var id = String(prompt("Ingrese el ID de la solicitud: "));
        var solicitudes = this.servicio.obtenerTodos();
        var solicitudEncontrada = solicitudes.find(function (solicitud) { return solicitud.id === id; });
        if (!solicitudEncontrada) {
            console.log("Solicitud no encontrada");
            return;
        }
        solicitudEncontrada.aprobacion = true;
        console.log("Solicitud aprobada correctamente");
    };
    View.prototype.rechazar = function () {
        var id = String(prompt("Ingrese el ID de la solicitud: "));
        var solicitudes = this.servicio.obtenerTodos();
        var solicitudEncontrada = solicitudes.find(function (solicitud) { return solicitud.id === id; });
        if (!solicitudEncontrada) {
            console.log("Solicitud no encontrada");
            return;
        }
        solicitudEncontrada.aprobacion = false;
        console.log("Solicitud desaprobada");
    };
    View.prototype.eliminar = function () {
        var id = String(prompt("Ingrese el ID a eliminar: "));
        var solicitudes = this.servicio.obtenerTodos();
        var solicitudEncontrada = solicitudes.find(function (solicitud) { return solicitud.id === id; });
        if (!solicitudEncontrada) {
            console.log("No se encontró la solicitud");
            return;
        }
        this.servicio.eliminar(solicitudEncontrada);
        console.log("Solicitud eliminada correctamente");
    };
    View.prototype.mostrar = function () {
        var solicitudes = this.servicio.obtenerTodos();
        if (solicitudes.length === 0) {
            console.log("No hay solicitudes");
            return;
        }
        solicitudes.forEach(function (s) {
            console.log("ID: ".concat(s.id, " | Nombre: ").concat(s.nombre, " | Aprobada: ").concat(s.aprobacion));
        });
    };
    View.prototype.pause = function () {
        console.log("\nPresiona ENTER para continuar...");
        prompt("");
    };
    return View;
}());
var App = /** @class */ (function () {
    function App(view) {
        this.view = view;
    }
    App.prototype.run = function () {
        var continuar = true;
        while (continuar) {
            var resultado = this.view.ejecutar();
            if (resultado === false) {
                continuar = false;
            }
        }
    };
    return App;
}());
// El resto del código permanece igual, solo modificando el return en ejecutar()
var memoria = new Memoria();
var view = new View(memoria);
var app = new App(view);
app.run();
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
