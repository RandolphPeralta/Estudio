"use strict";
// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el data mostrar la disponibilidad
// Codigo: 
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
var promptSync = require("prompt-sync");
var prompt = promptSync();
// Detalle de implementacion
var Cliente = /** @class */ (function () {
    function Cliente() {
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
        // reservar 
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
        // Registro
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
        // Despues de esta opcion se crean los objetos y sus funcionalides
        switch (puesto) {
            case 1: {
                var estudiante = new Estudiante();
                estudiante.registro(usuario);
                var accion = Number(prompt("Desea: (0) Ver libros (1) Prestar, (2) Devolver, (3) Reservar: "));
                switch (accion) {
                    case 0:
                        console.log(this.catalogo);
                        break;
                    case 1:
                        console.log("Aquí prestaría un libro…");
                        break;
                    case 2:
                        console.log("Aquí devolvería un libro…");
                        break;
                    case 3:
                        console.log("Aquí reservaría un libro…");
                        break;
                    default:
                        console.log("Acción no válida");
                        break;
                }
                break;
            }
            case 2: {
                var profesor = new Profesor();
                profesor.registro(usuario);
                break;
            }
            case 3: {
                var directivo = new Directivo();
                directivo.registro(usuario);
                break;
            }
            default: {
                console.log("Puesto no válido");
                break;
            }
        }
    };
    return App;
}());
var app = new App();
app.run();
// Ejemplo del objeto 
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
// prestar
//  if (true){
//    estudiante.prestar(libro)
//    libro.disponible = false
//    console.log(`El libro ${libro.titulo} fue prestado`)
//  }
//  if (false){
//   estudiante.devolver(libro)
//   libro.disponible = true
//   console.log(`El libro ${libro.titulo} fue devuelto`)
//  }
// prestamos
//  if (true){
//   console.log(estudiante.prestamos)
//  }
