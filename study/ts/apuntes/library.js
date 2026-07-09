"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.ConsoleView = exports.MenuAccion = exports.Memoria = void 0;
var promptSync = require("prompt-sync");
var prompt = promptSync();
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
        if (index !== -1) {
            this.memoria.splice(index, 1);
        }
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
    Memoria.prototype.buscarporid = function (id) {
        return this.memoria.filter(function (item) { return item.id === id; });
    };
    return Memoria;
}());
exports.Memoria = Memoria;
var MenuAccion = /** @class */ (function () {
    function MenuAccion(servicioEstudiante, servicioLibro, servicioPrestamo) {
        this.servicioEstudiante = servicioEstudiante;
        this.servicioLibro = servicioLibro;
        this.servicioPrestamo = servicioPrestamo;
    }
    MenuAccion.prototype.ejecutar = function () {
        var continuar = true;
        while (continuar) {
            this.mostrarMenu();
            var opcion = Number(prompt("Seleccione opción: "));
            switch (opcion) {
                case 1:
                    this.registrarEstudiante();
                    this.pause();
                    break;
                case 2:
                    this.eliminarEstudiante();
                    this.pause();
                    break;
                case 3:
                    console.table(this.servicioEstudiante.mostrar());
                    this.pause();
                    break;
                case 4:
                    this.actualizarEstudiante();
                    this.pause();
                    break;
                case 5:
                    this.buscarEstudiante();
                    this.pause();
                    break;
                case 6:
                    this.registrarLibro();
                    this.pause();
                    break;
                case 7:
                    this.elmiminarLibro();
                    this.pause();
                    break;
                case 8:
                    this.mostrarLibros();
                    this.pause();
                    break;
                case 9:
                    this.actualizarlibro();
                    this.pause();
                    break;
                case 10:
                    this.buscarLibro();
                    this.pause();
                    break;
                case 11:
                    this.prestarLibrob();
                    this.pause();
                    break;
                case 12:
                    this.devolverLibrob();
                    this.pause();
                    break;
                case 13:
                    this.mostrarPrestamos();
                    this.pause();
                    break;
                case 14:
                    this.encontrarPrestamoPorLibro();
                    this.pause();
                    break;
                case 15:
                    this.actualizarPrestamo();
                    this.pause();
                    break;
                case 0:
                    continuar = false;
                    break;
                default:
                    console.log("Opción inválida");
                    this.pause();
            }
        }
    };
    MenuAccion.prototype.mostrarMenu = function () {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        var opciones = [
            "1. Registrar Estudiante",
            "2. Eliminar Estudiante",
            "3. Ver Estudiantes",
            "4. Actualizar Estudiante",
            "5. Buscar Estudiante",
            "6. Registrar Libro",
            "7. Eliminar Libro",
            "8. Ver Libros",
            "9. Actualizar Libros",
            "10. Buscar Libro",
            "11. Prestar Libro",
            "12. Devolver Libro",
            "13. Mostrar Prestamos",
            "14. Buscar Prestamo",
            "15. Actualizar Prestamo",
            "0. Salir"
        ];
        for (var _i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
            var opcion = opciones_1[_i];
            console.log(opcion);
        }
    };
    MenuAccion.prototype.registrarEstudiante = function () {
        var id = String(prompt("ID: "));
        var nombre = String(prompt("Nombre: "));
        var identificacion = String(prompt("Identificación: "));
        var grado = String(prompt("Grado: "));
        var registrandoestudiante = {
            id: id,
            nombre: nombre,
            identificacion: identificacion,
            grado: grado
        };
        var estudianteregistrado = this.servicioEstudiante.guardar(registrandoestudiante);
        if (estudianteregistrado) {
            console.log("Estudiante registrado");
        }
        else {
            console.log("El estudiante ya existe con este ID");
        }
    };
    MenuAccion.prototype.eliminarEstudiante = function () {
        var id = String(prompt("ID: "));
        this.servicioEstudiante.eliminar(id);
        console.log("Estudiante Eliminado");
    };
    MenuAccion.prototype.actualizarEstudiante = function () {
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
        var estudianteactualizado = this.servicioEstudiante.actualizar(estudiantexistente);
        if (estudianteactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuAccion.prototype.buscarEstudiante = function () {
        var id = String(prompt("ID Estudiante: "));
        var result = this.servicioEstudiante.buscarporid(id);
        if (result.length === 0) {
            console.log("Estudiante no encontrado");
            return;
        }
        console.log("\n===== RESULTADO =====");
        result.forEach(function (estudiante) { return console.log(estudiante); });
    };
    MenuAccion.prototype.registrarLibro = function () {
        var id = String(prompt("ID Libro: "));
        var titulo = String(prompt("Título: "));
        var autor = String(prompt("Autor: "));
        var registrandolibro = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        var libroregistrado = this.servicioLibro.guardar(registrandolibro);
        if (libroregistrado) {
            console.log("Libro registrado");
        }
        else {
            console.log("El Libro ya existe con este ID");
        }
    };
    MenuAccion.prototype.elmiminarLibro = function () {
        var idLibro = String(prompt("ID Libro: "));
        this.servicioLibro.eliminar(idLibro);
    };
    MenuAccion.prototype.actualizarlibro = function () {
        var id = String(prompt("ID Libro: "));
        var titulo = String(prompt("Título: "));
        var autor = String(prompt("Autor: "));
        var libroexistente = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        var libroactualizado = this.servicioLibro.actualizar(libroexistente);
        if (libroactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuAccion.prototype.mostrarLibros = function () {
        var libros = this.servicioLibro.mostrar();
        var librosVista = libros.map(function (libro) { return ({
            id: libro.id,
            titulo: libro.titulo,
            autor: libro.autor,
            disponible: libro.disponible ? "Sí" : "No"
        }); });
        console.table(librosVista);
    };
    MenuAccion.prototype.buscarLibro = function () {
        var id = String(prompt("ID Libro: "));
        var result = this.servicioLibro.buscarporid(id);
        if (result.length === 0) {
            console.log("Libro no encontrado");
            return;
        }
        console.log("\n===== RESULTADO =====");
        result.forEach(function (libro) { return console.log(libro); });
    };
    MenuAccion.prototype.prestarLibrob = function () {
        var idLibro = String(prompt("ID Libro: "));
        var idEstudiante = String(prompt("ID Estudiante: "));
        var libro = this.servicioLibro.buscarporid(idLibro)[0];
        if (!libro) {
            console.log("Libro no existe");
            return;
        }
        if (!libro.disponible) {
            console.log("Libro no disponible");
            return;
        }
        var estudiante = this.servicioEstudiante.buscarporid(idEstudiante)[0];
        if (!estudiante) {
            console.log("Estudiante no existe");
            return;
        }
        var prestamo = {
            id: Math.random().toString(),
            libro: libro,
            estudiante: estudiante,
            fechaPrestamo: new Date()
        };
        var estado = this.servicioPrestamo.guardar(prestamo);
        if (!estado) {
            console.log("Error al prestar libro");
            return;
        }
        libro.disponible = false;
        this.servicioLibro.actualizar(libro);
        console.log("Libro prestado correctamente");
    };
    MenuAccion.prototype.devolverLibrob = function () {
        var idLibro = String(prompt("ID Libro: "));
        var prestamos = this.servicioPrestamo.mostrar();
        var prestamo = prestamos.find(function (prestado) {
            return prestado.libro.id === idLibro && !prestado.fechaDevolucion;
        });
        if (!prestamo) {
            console.log("No hay préstamo activo para este libro");
            return;
        }
        prestamo.fechaDevolucion = new Date();
        this.servicioPrestamo.actualizar(prestamo);
        prestamo.libro.disponible = true;
        this.servicioLibro.actualizar(prestamo.libro);
        console.log("Libro devuelto correctamente");
    };
    MenuAccion.prototype.mostrarPrestamos = function () {
        var prestamos = this.servicioPrestamo.mostrar();
        console.log("\n===== PRÉSTAMOS =====");
        if (prestamos.length === 0) {
            console.log("No hay préstamos");
            return;
        }
        prestamos.forEach(function (p) {
            console.log({
                id: p.id,
                libro: p.libro.titulo,
                estudiante: p.estudiante.nombre,
                fechaPrestamo: p.fechaPrestamo,
                fechaDevolucion: p.fechaDevolucion || "Pendiente"
            });
        });
    };
    MenuAccion.prototype.encontrarPrestamoPorLibro = function () {
        var idLibro = String(prompt("ID Libro: "));
        var prestamos = this.servicioPrestamo.mostrar();
        var prestamo = prestamos.find(function (p) {
            return p.libro.id === idLibro && !p.fechaDevolucion;
        });
        if (!prestamo) {
            console.log("Libro disponible (no prestado)");
            return;
        }
        console.log("\n===== PRÉSTAMO ACTIVO =====");
        console.log({
            libro: prestamo.libro.titulo,
            estudiante: prestamo.estudiante.nombre,
            fecha: prestamo.fechaPrestamo
        });
    };
    MenuAccion.prototype.actualizarPrestamo = function () {
        var id = String(prompt("ID del prestamo: "));
        var prestamos = this.servicioPrestamo.mostrar();
        var prestamo = prestamos.find(function (prestado) { return prestado.id === id; });
        if (!prestamo) {
            console.log("Préstamo no encontrado");
            return;
        }
        var fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):");
        prestamo.fechaDevolucion = new Date(fecha);
        var status = this.servicioPrestamo.actualizar(prestamo);
        console.log(status ? "Préstamo actualizado" : "Error");
    };
    MenuAccion.prototype.pause = function () {
        prompt("\nPresiona ENTER para continuar...");
    };
    return MenuAccion;
}());
exports.MenuAccion = MenuAccion;
var ConsoleView = /** @class */ (function () {
    function ConsoleView() {
    }
    ConsoleView.prototype.mensaje = function () {
        var opciones = [
            "1. Registrar Estudiante",
            "2. Eliminar Estudiante",
            "3. Ver Estudiantes",
            "4. Actualizar Estudiante",
            "5. Buscar Estudiante",
            "6. Registrar Libro",
            "7. Eliminar Libro",
            "8. Ver Libros",
            "9. Actualizar Libros",
            "10. Buscar Libro",
            "11. Prestar Libro",
            "12. Devolver Libro",
            "13. Mostrar Prestamos",
            "14. Buscar Prestamo",
            "15. Actualizar Prestamo",
            "0. Salir"
        ];
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        for (var _i = 0, opciones_2 = opciones; _i < opciones_2.length; _i++) {
            var opcion = opciones_2[_i];
            console.log(opcion);
        }
    };
    return ConsoleView;
}());
exports.ConsoleView = ConsoleView;
var App = /** @class */ (function () {
    function App(menu) {
        this.menu = menu;
    }
    App.prototype.run = function () {
        this.menu.ejecutar();
    };
    return App;
}());
exports.App = App;
var memoriaLibro = new Memoria();
var memoriaEstudiante = new Memoria();
var memoriaPrestamo = new Memoria();
var menu = new MenuAccion(memoriaEstudiante, memoriaLibro, memoriaPrestamo);
var app = new App(menu);
app.run();
