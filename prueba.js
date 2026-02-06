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
var Servicio = /** @class */ (function () {
    function Servicio(memoria) {
        this.memoria = memoria;
    }
    Servicio.prototype.register = function (algo) {
        return this.memoria.guardar(algo);
    };
    Servicio.prototype.delete = function (id) {
        return this.memoria.eliminar(id);
    };
    Servicio.prototype.update = function (algo) {
        return this.memoria.actualizar(algo);
    };
    Servicio.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return Servicio;
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
        this.opciones.forEach(function (option) { return console.log("".concat(option.key, ". ").concat(option.label)); });
        return this.opciones;
    };
    return ConsoleView;
}());
//------------------------------------
// MENU ACCION
// EJEMPLO REGISTRAR ESTUDIANTE y los demas...
var RegistrarEstudianteCommand = /** @class */ (function () {
    function RegistrarEstudianteCommand(servicio) {
        this.servicio = servicio;
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
var EliminarEstudiantesCommand = /** @class */ (function () {
    function EliminarEstudiantesCommand(servicio) {
        this.servicio = servicio;
    }
    EliminarEstudiantesCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID: "));
        this.servicio.delete(id);
        console.log("Estudiante Eliminado");
    };
    return EliminarEstudiantesCommand;
}());
var VerEstudiantesCommand = /** @class */ (function () {
    function VerEstudiantesCommand(servicio) {
        this.servicio = servicio;
    }
    VerEstudiantesCommand.prototype.ejecutar = function () {
        console.table(this.servicio.getAll());
    };
    return VerEstudiantesCommand;
}());
var ActualizarEstudiantesCommand = /** @class */ (function () {
    function ActualizarEstudiantesCommand(servicio) {
        this.servicio = servicio;
    }
    ActualizarEstudiantesCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID: "));
        var nombre = String(prompt("Nombre: "));
        var identificacion = String(prompt("Identificación: "));
        var grado = String(prompt("Grado: "));
        var estudiantexistente = {
            id: id,
            nombre: nombre,
            identificacion: identificacion,
            grado: grado
        };
        var estudianteactualizado = this.servicio.update(estudiantexistente);
        if (estudianteactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    return ActualizarEstudiantesCommand;
}());
var RegistrarLibroCommand = /** @class */ (function () {
    function RegistrarLibroCommand(servicio) {
        this.servicio = servicio;
    }
    RegistrarLibroCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID Libro: "));
        var titulo = String(prompt("Título: "));
        var autor = String(prompt("Autor: "));
        var libro = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        var ok = this.servicio.register(libro);
        console.log(ok ? "Libro registrado" : "El Libro ya existe");
    };
    return RegistrarLibroCommand;
}());
var EliminarLibroCommand = /** @class */ (function () {
    function EliminarLibroCommand(servicio) {
        this.servicio = servicio;
    }
    EliminarLibroCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID: "));
        this.servicio.delete(id);
        console.log("Libro Eliminado");
    };
    return EliminarLibroCommand;
}());
var VerLibrosCommand = /** @class */ (function () {
    function VerLibrosCommand(servicio) {
        this.servicio = servicio;
    }
    VerLibrosCommand.prototype.ejecutar = function () {
        console.table(this.servicio.getAll());
    };
    return VerLibrosCommand;
}());
var ActualizarLibroCommand = /** @class */ (function () {
    function ActualizarLibroCommand(servicio) {
        this.servicio = servicio;
    }
    ActualizarLibroCommand.prototype.ejecutar = function () {
        var id = String(prompt("ID Libro: "));
        var titulo = String(prompt("Título: "));
        var autor = String(prompt("Autor: "));
        var libroexistente = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        var libroactualizado = this.servicio.update(libroexistente);
        if (libroactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    return ActualizarLibroCommand;
}());
var PrestarLibroCommand = /** @class */ (function () {
    function PrestarLibroCommand(libros, estudiantes, prestamos) {
        this.libros = libros;
        this.estudiantes = estudiantes;
        this.prestamos = prestamos;
    }
    PrestarLibroCommand.prototype.ejecutar = function () {
        var idLibro = String(prompt("ID Libro: "));
        var idEstudiante = String(prompt("ID del Estudiante: "));
        var libro = this.libros.getAll().find(function (libro) { return libro.id === idLibro; });
        if (!libro || !libro.disponible)
            return "No existe el libro";
        var estudiante = this.estudiantes.getAll().find(function (estudiante) { return estudiante.id === idEstudiante; });
        if (!estudiante)
            return "No existe el estudiante";
        libro.disponible = false;
        var ok = this.prestamos.register({
            idLibro: idLibro,
            idCliente: idEstudiante,
            fechaPrestamo: new Date()
        });
        console.log(ok ? "Préstamo realizado correctamente" : "No se pudo realizar el préstamo");
    };
    return PrestarLibroCommand;
}());
var DevolverLibroCommand = /** @class */ (function () {
    function DevolverLibroCommand(libros, estudiantes, prestamos) {
        this.libros = libros;
        this.estudiantes = estudiantes;
        this.prestamos = prestamos;
    }
    DevolverLibroCommand.prototype.ejecutar = function () {
        var idLibro = String(prompt("ID Libro: "));
        var libro = this.libros.getAll().find(function (libro) { return libro.id === idLibro; });
        if (!libro)
            return "No existe dicho libro";
        libro.disponible = true;
        var prestamo = this.prestamos
            .getAll()
            .find(function (prestamo) { return prestamo.idLibro === idLibro && !prestamo.fechaDevolucion; });
        if (!prestamo)
            return "No se pudo reaizar el prestamo";
        prestamo.fechaDevolucion = new Date();
        return "Libro devuelto";
    };
    return DevolverLibroCommand;
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
// LA CLASE CONSUMIDORA
var App = /** @class */ (function () {
    function App(menu, controller) {
        this.menu = menu;
        this.controller = controller;
    }
    App.prototype.run = function () {
        var continuar = true;
        while (continuar) {
            this.menu.mostrar();
            var opcion = Number(prompt("Seleccione opción:"));
            continuar = this.controller.ejecutar(opcion);
        }
    };
    return App;
}());
var view = new ConsoleView(opcionesMenu);
var memoriaestudiate = new Memoria();
var memorialibro = new Memoria();
var memoriaprestamo = new Memoria();
var servicioestudiante = new Servicio(memoriaestudiate);
var serviciolibro = new Servicio(memorialibro);
var servicioprestamos = new Servicio(memoriaprestamo);
var comandos = new Map(); // TOCA MIRAR LOS COMANDOS
comandos.set(1, new RegistrarEstudianteCommand(servicioestudiante));
comandos.set(2, new EliminarEstudiantesCommand(servicioestudiante));
comandos.set(3, new VerEstudiantesCommand(servicioestudiante));
comandos.set(4, new ActualizarEstudiantesCommand(servicioestudiante));
comandos.set(5, new RegistrarLibroCommand(serviciolibro));
comandos.set(6, new EliminarLibroCommand(serviciolibro));
comandos.set(7, new VerLibrosCommand(serviciolibro));
comandos.set(8, new ActualizarLibroCommand(serviciolibro));
comandos.set(9, new PrestarLibroCommand(serviciolibro, servicioestudiante, servicioprestamos));
comandos.set(10, new DevolverLibroCommand(serviciolibro, servicioestudiante, servicioprestamos));
var menuController = new MenuController(comandos);
var app = new App(view, menuController);
app.run();
