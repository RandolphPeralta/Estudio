"use strict";
// Praticar la abstracion de como realizar sistema de gestion de prestamo para una biblioteca
Object.defineProperty(exports, "__esModule", { value: true });
// Escribiendo el programa
// Quiero un programa de sistema de gestion de prestamo para una biblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el INVENTARIO
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
    return Memoria;
}());
// EN BASE DE DATOS
var RepositoryDB = /** @class */ (function () {
    function RepositoryDB() {
    }
    RepositoryDB.prototype.guardar = function (algo) {
        // INSERT INTO tabla ...
        return true;
    };
    RepositoryDB.prototype.eliminar = function (id) {
        // DELETE FROM tabla WHERE id = ?
    };
    RepositoryDB.prototype.actualizar = function (algo) {
        // UPDATE tabla SET ...
        return true;
    };
    RepositoryDB.prototype.mostrar = function () {
        // SELECT * FROM tabla
        return [];
    };
    return RepositoryDB;
}());
var ServicioLibro = /** @class */ (function () {
    function ServicioLibro(memoria) {
        this.memoria = memoria;
    }
    ServicioLibro.prototype.register = function (libro) {
        return this.memoria.guardar(libro);
    };
    ServicioLibro.prototype.delete = function (id) {
        this.memoria.eliminar(id);
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
        this.memoria.eliminar(id);
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
    function ServicioPrestamo() {
        this.prestamos = [];
    }
    ServicioPrestamo.prototype.prestar = function (idLibro, idCliente) {
        this.prestamos.push({ idLibro: idLibro, idCliente: idCliente });
        return true;
    };
    ServicioPrestamo.prototype.devolver = function (idLibro) {
        var prestamoIndex = this.prestamos.findIndex(function (prestado) { return prestado.idLibro === idLibro; });
        if (prestamoIndex === -1)
            return false;
        this.prestamos.splice(prestamoIndex, 1);
        return true;
    };
    return ServicioPrestamo;
}());
var MenuOpcion = /** @class */ (function () {
    function MenuOpcion() {
    }
    MenuOpcion.REGISTRAR_ESTUDIANTE = 1;
    MenuOpcion.ELIMINAR_ESTUDIANTE = 2;
    MenuOpcion.VER_ESTUDIANTES = 3;
    MenuOpcion.ACTUALIZAR_ESTUDIANTE = 4;
    MenuOpcion.REGISTRAR_LIBRO = 5;
    MenuOpcion.ELIMINAR_LIBRO = 6;
    MenuOpcion.VER_LIBROS = 7;
    MenuOpcion.ACTUALIZAR_LIBRO = 8;
    MenuOpcion.PRESTAR_LIBRO = 9;
    MenuOpcion.DEVOLVER_LIBRO = 10;
    MenuOpcion.SALIR = 0;
    return MenuOpcion;
}());
var MenuAccion = /** @class */ (function () {
    function MenuAccion(servicioCliente, servicioLibro, servicioPrestamo) {
        this.servicioCliente = servicioCliente;
        this.servicioLibro = servicioLibro;
        this.servicioPrestamo = servicioPrestamo;
    }
    MenuAccion.prototype.ejecutar = function (opcion) {
        switch (opcion) {
            case MenuOpcion.REGISTRAR_ESTUDIANTE:
                this.registrarEstudiante();
                this.pause();
                break;
            case MenuOpcion.ELIMINAR_ESTUDIANTE:
                this.eliminarEstudiante();
                this.pause();
                break;
            case MenuOpcion.VER_ESTUDIANTES:
                console.table(this.servicioCliente.getAll());
                this.pause();
                break;
            case MenuOpcion.ACTUALIZAR_ESTUDIANTE:
                this.actualizarEstudiante();
                this.pause();
                break;
            case MenuOpcion.REGISTRAR_LIBRO:
                this.registrarLibro();
                this.pause();
                break;
            case MenuOpcion.ELIMINAR_LIBRO:
                this.elmiminarLibro();
                this.pause();
                break;
            case MenuOpcion.VER_LIBROS:
                console.table(this.servicioLibro.getAll());
                this.pause();
                break;
            case MenuOpcion.ACTUALIZAR_LIBRO:
                this.actualizarlibro();
                this.pause();
                break;
            case MenuOpcion.PRESTAR_LIBRO:
                this.prestarLibro();
                this.pause();
                break;
            case MenuOpcion.DEVOLVER_LIBRO:
                this.devolverLibro();
                this.pause();
                break;
            case MenuOpcion.SALIR:
                return false;
            default:
                console.log("Opción inválida");
        }
        return true;
    };
    MenuAccion.prototype.registrarEstudiante = function () {
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
        var estudianteregistrado = this.servicioCliente.register(estudiante);
        if (estudianteregistrado) {
            console.log("Estudiante registrado");
        }
        else {
            console.log("El estudiante ya existe con este ID");
        }
    };
    MenuAccion.prototype.eliminarEstudiante = function () {
        var id = String(prompt("ID: "));
        this.servicioCliente.delete(id);
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
        var estudianteactualizado = this.servicioCliente.update(estudiantexistente);
        if (estudianteactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuAccion.prototype.registrarLibro = function () {
        var id = String(prompt("ID Libro: "));
        var titulo = String(prompt("Título: "));
        var autor = String(prompt("Autor: "));
        var libro = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        var libroregistrado = this.servicioLibro.register(libro);
        if (libroregistrado) {
            console.log("Estudiante registrado");
        }
        else {
            console.log("El estudiante ya existe con este ID");
        }
    };
    MenuAccion.prototype.elmiminarLibro = function () {
        var idLibro = String(prompt("ID Libro: "));
        this.servicioLibro.delete(idLibro);
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
        var libroactualizado = this.servicioLibro.update(libroexistente);
        if (libroactualizado) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuAccion.prototype.prestarLibro = function () {
        var idLibro = String(prompt("ID Libro: "));
        var idEstudiante = String(prompt("ID Estudiante: "));
        var libros = this.servicioLibro.getAll();
        var clientes = this.servicioCliente.getAll();
        var libro = libros.find(function (librop) { return librop.id === idLibro; });
        if (!libro) {
            console.log("No se pudo prestar: el libro no existe");
            return;
        }
        if (!libro.disponible) {
            console.log("No se pudo prestar: el libro no está disponible");
            return;
        }
        var cliente = clientes.find(function (estudiantep) { return estudiantep.id === idEstudiante; });
        if (!cliente) {
            console.log("No se pudo prestar: el estudiante no existe");
            return;
        }
        libro.disponible = false;
        var ok = this.servicioPrestamo.prestar(idLibro, idEstudiante);
        console.log(ok ? "Préstamo exitoso" : "No se pudo prestar");
    };
    MenuAccion.prototype.devolverLibro = function () {
        var idLibro = String(prompt("ID Libro: "));
        var ok = this.servicioPrestamo.devolver(idLibro);
        var libros = this.servicioLibro.getAll();
        var libro = libros.find(function (book) { return book.id === idLibro; });
        if (!libro) {
            console.log("No se pudo devolver, No esxite el libro");
            return;
        }
        libro.disponible = true;
        console.log(ok ? "Libro devuelto" : "No se pudo devolver");
    };
    MenuAccion.prototype.pause = function () {
        console.log("\nPresiona ENTER para continuar...");
        prompt("");
    };
    return MenuAccion;
}());
var ConsoleView = /** @class */ (function () {
    function ConsoleView() {
    }
    ConsoleView.prototype.mensaje = function () {
        var opciones = [
            "1. Registrar Estudiante",
            "2. Eliminar Estudiante",
            "3. Ver Estudiantes",
            "4. Actualizar Estudiante",
            "5. Registrar Libro",
            "6. Eliminar Libro",
            "7. Ver Libros",
            "8. Actualizar Libros",
            "9. Prestar Libro",
            "10. Devolver Libro",
            "0. Salir"
        ];
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        for (var _i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
            var opcion = opciones_1[_i];
            console.log(opcion);
        }
    };
    return ConsoleView;
}());
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.run = function () {
        var continuar = true;
        while (continuar) {
            view.mensaje();
            var opcion = Number(prompt("Seleccione opción: "));
            continuar = menu.ejecutar(opcion);
        }
    };
    return App;
}());
var memoriaLibro = new Memoria();
var memoriaEstudiante = new Memoria();
var servicioLibro = new ServicioLibro(memoriaLibro);
var servicioCliente = new ServicioEstudiante(memoriaEstudiante);
var servicioPrestamo = new ServicioPrestamo();
var view = new ConsoleView();
var menu = new MenuAccion(servicioCliente, servicioLibro, servicioPrestamo);
var app = new App();
app.run();
//--------------------------------
//PROBANDO LOS PRESTAMOS
// const memoriaLibro = new Memoria<Libro>();
// const memoriaEstudiante = new Memoria<Estudiante>();
// const servicioLibro = new ServicioLibro(memoriaLibro);
// const servicioCliente = new ServicioEstudiante(memoriaEstudiante);
// const servicioPrestamo = new ServicioPrestamo(servicioLibro,servicioCliente);
// servicioLibro.register("L1", "1984", "Orwell");
// servicioLibro.register("L2", "Harry Potter", "J. K. Rowling")
// servicioCliente.register("E1", "Juan", "123", "11");
// // SI SE PUEDE PRESTAR
// console.log(servicioPrestamo.prestar("L1", "E1")); // true
// console.log(servicioPrestamo.prestar("L2", "E1")); // TRUE
// console.log(servicioPrestamo.devolver("L1"));      // true
// console.log(servicioPrestamo.getAll());
//---------------------------------------
// PROBANDO POR LOS ESTUDIANTES
//const memoriasitorioestudiante = new Memoria<Estudiante>
//const servicioestudiante = new ServicioEstudiante(memoriasitorioestudiante)
//servicioestudiante.register("1","Sara","1132456789","11")
//servicioestudiante.register("2","Laura","12356789","11")
//YA SE PUEDE ELMINAR POR ID
//servicioestudiante.delete("2")
//console.log(servicioestudiante.getAll())
// YA SE PUEDE ACTUALIZAR POR EL ID
//servicioestudiante.update("2","Laura","1235678964573","11")
//console.log(servicioestudiante.getAll())
//-----------------------------------------
//PROBANDO POR EL INVENTARIO DE LIBROS EN LA BIBLIOTECA
//const memoriasitoriobiblioteca = new Memoria<Libro>
//const serviciolibro = new ServicioLibro(memoriasitoriobiblioteca)
// YA SE PUEDE REGISTRAR
//serviciolibro.register("1", "IT", "Sthephen King")
//console.log(memoriasitoriobiblioteca.mostrar())
//YA SE PUEDE ELMINAR POR ID
//serviciolibro.delete("1")
//console.log(memoriasitoriobiblioteca.mostrar())
// YA SE PUEDE ACTUALIZAR POR EL ID
//serviciolibro.update("1", "IT (Edición Especial)", "Stephen King")
//console.log(serviciolibro.getAll())
// ACA SE IMPLEMENTO LA INTERFACE DE memoriaSITORIO
//class ServicioLibro {
//    constructor(private memoria: Memoria<Libro>)
//    register(id: string, title:string, author: string) {
//        const book = {
//            id,
//            title,
//            author,
//            available: true
//        }
// eliminar(id: string): void{
// this.memoriasitory.guardar(book)}
//getById(id:string): Book | null {
// return this.memoriasitory.getById(id)}
//getAll(): Book[]{
// return this.memoriasitory.getAll()}
//    prestar(book: Book): void{
//        book.available = false;
//    }
// this.memoriasitory.update(book)
//}
// devolver(book: Book): void{
// book.available = true;
//  this.memoriasitory.update(book)}
//    }
// actualizar(criterio: (item: T) => boolean, nuevo: T): void {
//     const index = this.memoria.findIndex(criterio);
//     if (index !== -1) {
//       this.memoria[index] = nuevo;}
//       }
// const libro1: Libro = {
//   id: 1,
//   titulo: "Juego de tronos",
//   autor: "George R.R Martin",
//   disponible: true
// }
// const libro2: Libro = {
//   id: 2,
//   titulo: "Harry Potter",
//   autor: "J. K. Rowling",
//   disponible: true
// }
// const libro3: Libro = {
//   id: 3,
//   titulo: "Don Quijote",
//   autor: "Cervantes",
//   disponible: true
// }
// const libro4: Libro = {
//   id: 4,
//   titulo: "Cien años de soledad",
//   autor: "Gabriel García Márquez",
//   disponible: true
// }
// const libro5: Libro = {
//   id: 5,
//   titulo: "Orgullo y prejuicio",
//   autor: "Jane Austen",
//   disponible: true
// }
// const Libros = [libro1, libro2, libro3, libro4, libro5]
// type Profesor = {
//   id: string
//   nombre: string;
//   identificacion: string
//   curso: string
// }
