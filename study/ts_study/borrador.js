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
var Bibliotecario = /** @class */ (function () {
    function Bibliotecario() {
    }
    Bibliotecario.prototype.registro = function (data) {
        return true;
    };
    Bibliotecario.prototype.prestados = function () {
    };
    Bibliotecario.prototype.disponibles = function () {
    };
    Bibliotecario.prototype.reservados = function () {
    };
    return Bibliotecario;
}());
// Clase consumo
var App = /** @class */ (function () {
    function App() {
    }
    //private estudiantes!: Estudiante[]
    App.prototype.run = function () {
        console.log("Sistema de biblioteca");
        // Registro
        console.log("Registrese}");
        var nombre = prompt("👉 Ingresa su nombre : ");
        var edad = prompt("👉 Ingresa su edad: ");
        var nacionalidad = prompt("👉 Ingresa su nacionalidad: ");
        var puesto = prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo, (4) Bibliotecario: ");
        // Despues de esta opcion se crean los objetos
        var usuario = {
            nombre: nombre,
            edad: edad,
            nacionalidad: nacionalidad
        };
        var estudiante = new Estudiante();
        // const profesor = new Profesor()
        // const directivo = new Directivo()
        // const bibliotecario = new Bibliotecario
        estudiante.registro(usuario);
        // profesor.registro(usuario)
        // directivo.registro(usuario)
        // bibliotecario.registro(usuario)
        // Ejemplo del objeto 
        var libro = {
            id: 1,
            titulo: "Juego de tronos",
            autor: "George R.R Martin",
            disponible: true
        };
        if (true) {
            estudiante.prestar(libro);
            //console.log(this.estudiante.prestamos)
            libro.disponible = false;
            console.log("El libro ".concat(libro.titulo, " fue prestado"));
        }
        if (false) {
            estudiante.devolver(libro);
            libro.disponible = true;
            console.log("El libro ".concat(libro.titulo, " fue devuelto"));
        }
        if (true) {
            console.log(estudiante.prestamos);
        }
    };
    return App;
}());
var app = new App();
app.run();
