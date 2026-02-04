"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var prompt = promptSync();
// ------------------------------------------------------
// EN MEMORIA RAM
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.memoria = [];
    }
    Memoria.prototype.guardar = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index !== -1) {
            return false;
        }
        this.memoria.push(some);
        return true;
    };
    Memoria.prototype.eliminar = function (id) {
        var index = this.memoria.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return false;
        }
        this.memoria.splice(index, 1);
        return true;
    };
    Memoria.prototype.actualizar = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index === -1) {
            return false;
        }
        this.memoria[index] = some;
        return true;
    };
    Memoria.prototype.mostrar = function () {
        return this.memoria;
    };
    return Memoria;
}());
var ServicioLibro = /** @class */ (function () {
    function ServicioLibro(memoria) {
        this.memoria = memoria;
    }
    ServicioLibro.prototype.register = function (libro) {
        return this.memoria.guardar(libro);
    };
    ServicioLibro.prototype.delete = function (id) {
        return this.memoria.eliminar(id);
    };
    ServicioLibro.prototype.update = function (libro) {
        return this.memoria.actualizar(libro);
    };
    ServicioLibro.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioLibro;
}());
var ServicioEstudiante = /** @class */ (function () {
    function ServicioEstudiante(memoria) {
        this.memoria = memoria;
    }
    ServicioEstudiante.prototype.register = function (estudiante) {
        return this.memoria.guardar(estudiante);
    };
    ServicioEstudiante.prototype.delete = function (id) {
        return this.memoria.eliminar(id);
    };
    ServicioEstudiante.prototype.update = function (estudiante) {
        return this.memoria.actualizar(estudiante);
    };
    ServicioEstudiante.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioEstudiante;
}());
var ServicioPrestamo = /** @class */ (function () {
    function ServicioPrestamo(repositorio) {
        this.repositorio = repositorio;
    }
    ServicioPrestamo.prototype.lend = function (prestamo) {
        return this.repositorio.guardar(prestamo);
    };
    ServicioPrestamo.prototype.restore = function (prestamo) {
        return this.repositorio.eliminar(prestamo);
    };
    ServicioPrestamo.prototype.update = function (prestamo) {
        return this.repositorio.actualizar(prestamo);
    };
    ServicioPrestamo.prototype.list = function () {
        return this.repositorio.mostrar();
    };
    return ServicioPrestamo;
}());
var opcionesMenu = [
    { key: 1, label: "Registrar Estudiante" },
    { key: 2, label: "Eliminar Estudiante" },
    { key: 3, label: "Ver Estudiantes" },
    { key: 4, label: "Actualizar Estudiante" },
    { key: 5, label: "Registrar Libro" },
    { key: 6, label: "Eliminar Libro" },
    { key: 7, label: "Ver Libros" },
    { key: 8, label: "Actualizar Libros" },
    { key: 9, label: "Prestar Libro" },
    { key: 10, label: "Devolver Libro" },
    { key: 0, label: "Salir" }
];
var ConsoleView = /** @class */ (function () {
    function ConsoleView(opciones) {
        this.opciones = opciones;
    }
    ConsoleView.prototype.mostrar = function () {
        console.log("Bienvenido...");
        this.opciones.forEach(function (o) {
            return console.log("".concat(o.key, ". ").concat(o.label));
        });
        return this.opciones; // Devuelve las opciones para posible uso posterior
    };
    return ConsoleView;
}());
//------------------------------------
// MENU ACCION
var RegistrarEstudianteCommand = /** @class */ (function () {
    function RegistrarEstudianteCommand(servicio, view) {
        this.servicio = servicio;
        this.view = view;
    }
    RegistrarEstudianteCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID: "));
        var nombre = String(prompt("Nombre: "));
        var identificacion = String(prompt("Identificación: "));
        var grado = String(prompt("Grado: "));
        var estudiante = {
            id: id,
            nombre: nombre,
            identificacion: identificacion,
            grado: grado
        };
        var ok = this.servicio.register(estudiante);
        console.log(ok ? "Estudiante registrado" : "El estudiante ya existe");
    };
    return RegistrarEstudianteCommand;
}());
var VerEstudiantesCommand = /** @class */ (function () {
    function VerEstudiantesCommand(servicio, view) {
        this.servicio = servicio;
        this.view = view;
    }
    VerEstudiantesCommand.prototype.ejecutar = function () {
        console.table(this.servicio.getAll());
    };
    return VerEstudiantesCommand;
}());
// DESPUES SIGUEN LAS DEMAS OPCIONES
var MenuController = /** @class */ (function () {
    function MenuController(comandos) {
        this.comandos = comandos;
    }
    MenuController.prototype.ejecutar = function (opcion) {
        if (opcion === 0)
            return false;
        var comando = this.comandos.get(opcion);
        if (!comando) {
            console.log("Opción inválida");
            return true;
        }
        comando.ejecutar();
        return true;
    };
    return MenuController;
}());
var view = new ConsoleView(opcionesMenu); //ESTO ESTA MALO TOCA CORREGIR Y CREO QUE DESDE LAS INTERFACES
var servicioEstudiante = new ServicioEstudiante(new Memoria());
var servicioLibro = new ServicioLibro(new Memoria());
var comandos = new Map();
comandos.set(1, new RegistrarEstudianteCommand(servicioEstudiante, view)); //ESTO TAMBIEN HAY QUE CORREGIRLO Y CREO QUE DESDE LAS INTERFACES
comandos.set(3, new VerEstudiantesCommand(servicioEstudiante, view));
// comandos.set(5, RegistrarLibroCommand)
// comandos.set(9, PrestarLibroCommand)
// etc...
var menuController = new MenuController(comandos);
view.mostrar();
