"use strict";
// Praticar la abstracion de como realizar un sistema de prestamos en la biblioteca
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar
// Codigo: 
var promptSync = require("prompt-sync");
var prompt = promptSync();
// Detalle de implementacion
var Cliente = /** @class */ (function () {
    function Cliente() {
        this.reservas = [];
        this.prestamos = [];
    }
    Cliente.prototype.registro = function (data) {
        return true;
    };
    Cliente.prototype.prestar = function (data) {
        this.prestamos.push(data);
    };
    Cliente.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    Cliente.prototype.reservar = function (data) {
        this.reservas.push(data);
    };
    return Cliente;
}());
var Estudiante = /** @class */ (function (_super) {
    __extends(Estudiante, _super);
    function Estudiante() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Estudiante;
}(Cliente));
var Profesor = /** @class */ (function (_super) {
    __extends(Profesor, _super);
    function Profesor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Profesor;
}(Cliente));
var Directivo = /** @class */ (function (_super) {
    __extends(Directivo, _super);
    function Directivo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Directivo;
}(Cliente));
// Clase consumo
var App = /** @class */ (function () {
    function App() {
        // private estudiantes!: Estudiante[]
        this.catalogo = [];
    }
    App.prototype.run = function () {
        console.log("📚 Bienvenio al Sistema de biblioteca");
        console.log("Registrese: ");
        var name = String(prompt("👉 Ingresa su nombre : "));
        var age = Number(prompt("👉 Ingresa su edad: "));
        var nacionality = String(prompt("👉 Ingresa su nacionalidad: "));
        var usuario = {
            nombre: name,
            edad: age,
            nacionalidad: nacionality
        };
        var libro1 = {
            id: 1,
            titulo: "Juego de tronos",
            autor: "George R.R Martin",
            disponible: true
        };
        var libro2 = {
            id: 2,
            titulo: "Harry Potter",
            autor: "J. K. Rowling",
            disponible: true
        };
        var libro3 = {
            id: 3,
            titulo: "Don Quijote",
            autor: "J. K. Rowling",
            disponible: true
        };
        this.catalogo.push(libro1, libro2, libro3);
        var puesto = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));
        var cliente;
        switch (puesto) {
            case 1:
                cliente = new Estudiante();
                break;
            case 2:
                cliente = new Profesor();
                break;
            case 3:
                cliente = new Directivo();
                break;
            default:
                console.log("Puesto no válido");
                return;
        }
        cliente.registro(usuario);
        this.menuAcciones(cliente);
    };
    App.prototype.menuAcciones = function (cliente) {
        var salir = false;
        while (!salir) {
            var accion = Number(prompt("\nDesea: (0) Ver libros (1) Prestar (2) Devolver (3) Reservar (4) Salir: "));
            switch (accion) {
                case 0:
                    console.log(this.catalogo);
                    this.pausa();
                    break;
                case 1:
                    this.prestarLibro(cliente);
                    this.pausa();
                    break;
                case 2:
                    this.devolverLibro(cliente);
                    this.pausa();
                    break;
                case 3:
                    this.reservarLibro(cliente);
                    this.pausa();
                    break;
                case 4:
                    console.log("👋 Gracias por usar el sistema de biblioteca");
                    salir = true;
                    break;
                default:
                    console.log("❌ Acción no válida");
                    break;
            }
        }
    };
    App.prototype.prestarLibro = function (cliente) {
        console.log("📚 Catálogo de libros:");
        this.catalogo.forEach(function (lib) { return console.log("".concat(lib.id, " - ").concat(lib.titulo, " (").concat(lib.disponible ? "Disponible" : "Prestado", ")")); });
        var busqueda = String(prompt("👉 Ingresa el título o autor del libro que deseas prestar: ")).toLowerCase();
        var libro = this.catalogo.find(function (l) { return l.titulo.toLowerCase().includes(busqueda) || l.autor.toLowerCase().includes(busqueda); });
        if (!libro) {
            console.log("❌ No se encontró ningún libro.");
            return;
        }
        if (!libro.disponible) {
            console.log("❌ El libro ya está prestado.");
            return;
        }
        cliente.prestar(libro);
        libro.disponible = false;
        console.log("\uD83D\uDCD8 El libro \"".concat(libro.titulo, "\" fue prestado exitosamente."));
    };
    App.prototype.devolverLibro = function (cliente) {
        if (cliente.prestamos.length === 0) {
            console.log("❌ No tienes libros prestados.");
            return;
        }
        console.log("📕 Libros prestados:");
        cliente.prestamos.forEach(function (lib, index) { return console.log("".concat(index + 1, " - ").concat(lib.titulo, " (").concat(lib.autor, ")")); });
        var opcion = Number(prompt("👉 Ingresa el número del libro a devolver (0 para cancelar): "));
        if (opcion === 0)
            return;
        var index = opcion - 1;
        if (index < 0 || index >= cliente.prestamos.length) {
            console.log("❌ Opción inválida.");
            return;
        }
        var libro = cliente.prestamos[index];
        cliente.devolver(libro);
        libro.disponible = true;
        console.log("\uD83D\uDCD7 El libro \"".concat(libro.titulo, "\" fue devuelto correctamente."));
    };
    App.prototype.reservarLibro = function (cliente) {
        var busqueda = String(prompt("👉 Ingresa el título o autor del libro a reservar: ")).toLowerCase();
        var libro = this.catalogo.find(function (l) { return l.titulo.toLowerCase().includes(busqueda) || l.autor.toLowerCase().includes(busqueda); });
        if (!libro) {
            console.log("❌ Libro no encontrado.");
            return;
        }
        if (libro.disponible) {
            console.log("📌 Libro reservado.");
            cliente.reservar(libro);
            return;
        }
        console.log("📌 El libro está disponible, no requiere reserva.");
    };
    App.prototype.pausa = function () {
        prompt("\nPresiona ENTER para continuar...");
    };
    return App;
}());
var app = new App();
app.run();
// Ejemplo del objeto a crear del bibliotecario
// console.log(`Ingrese el libro al catalogo: `);
// const ide: number = prompt("👉 Ingresa su id : ")
// const title: string = prompt("👉 Ingresa su titulo : ");
// const author: string = prompt("👉 Ingresa su autor: ");
//const disponible: string = prompt("👉 Ingresa su nacionalidad: ");
// const libro: libro = {
//    id: ide,
//    titulo: title,
//    autor: author,
//    disponible: true
//  }
// prestamos
//  if (true){
//   console.log(estudiante.prestamos)
//  }
