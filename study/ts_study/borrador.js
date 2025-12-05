"use strict";
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
var readline = require("readline");
var Libro = /** @class */ (function () {
    function Libro(id, titulo, autor) {
        this.disponible = true;
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
    }
    Libro.prototype.getId = function () {
        return this.id;
    };
    Libro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libro.prototype.getAutor = function () {
        return this.autor;
    };
    Libro.prototype.prestar = function () {
        this.disponible = false;
    };
    Libro.prototype.devolver = function () {
        this.disponible = true;
    };
    Libro.prototype.estaDisponible = function () {
        return this.disponible;
    };
    return Libro;
}());
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    return Usuario;
}());
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prestamos = [];
        return _this;
    }
    Cliente.prototype.prestarLibro = function (libro) {
        if (libro.estaDisponible()) {
            libro.prestar();
            this.prestamos.push(libro);
        }
    };
    Cliente.prototype.devolverLibro = function (libro) {
        var index = this.prestamos.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.prestamos.splice(index, 1);
        }
    };
    return Cliente;
}(Usuario));
var Bibliotecario = /** @class */ (function (_super) {
    __extends(Bibliotecario, _super);
    function Bibliotecario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.catalogo = [];
        return _this;
    }
    Bibliotecario.prototype.setCatalogo = function (libros) {
        this.catalogo = libros;
    };
    Bibliotecario.prototype.obtenerDisponibles = function () {
        return this.catalogo.filter(function (l) { return l.estaDisponible(); });
    };
    Bibliotecario.prototype.obtenerPrestados = function () {
        return this.catalogo.filter(function (l) { return !l.estaDisponible(); });
    };
    Bibliotecario.prototype.getCatalogo = function () {
        return this.catalogo;
    };
    return Bibliotecario;
}(Usuario));
var App = /** @class */ (function () {
    function App() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    App.prototype.setBibliotecario = function (b) {
        this.bibliotecario = b;
    };
    App.prototype.setCliente = function (c) {
        this.cliente = c;
    };
    App.prototype.iniciar = function () {
        var _this = this;
        console.log("📚 SISTEMA DE BIBLIOTECA");
        this.rl.question("¿Quién eres? (1) Cliente  (2) Bibliotecario 👉 ", function (resp) {
            if (resp === "1")
                _this.menuCliente();
            else if (resp === "2")
                _this.menuBibliotecario();
            else
                _this.cerrar("Opción no válida.");
        });
    };
    App.prototype.menuCliente = function () {
        var _this = this;
        console.clear();
        console.log("\uD83D\uDC64 Cliente: ".concat(this.cliente.getNombre()));
        console.log("1. Ver libros disponibles");
        console.log("2. Prestar libro");
        console.log("3. Devolver libro");
        console.log("4. Salir");
        this.rl.question("👉 Selecciona una opción: ", function (op) {
            switch (op) {
                case "1":
                    _this.mostrarDisponibles();
                    return _this.pausa(function () { return _this.menuCliente(); });
                case "2":
                    return _this.opcionPrestar();
                case "3":
                    return _this.opcionDevolver();
                case "4":
                    return _this.cerrar("👋 Saliendo...");
                default:
                    return _this.menuCliente();
            }
        });
    };
    App.prototype.menuBibliotecario = function () {
        var _this = this;
        console.clear();
        console.log("\uD83D\uDCD8 Bibliotecario: ".concat(this.bibliotecario.getNombre()));
        console.log("1. Ver libros disponibles");
        console.log("2. Ver libros prestados");
        console.log("3. Salir");
        this.rl.question("👉 Selecciona una opción: ", function (op) {
            switch (op) {
                case "1":
                    _this.mostrarDisponibles();
                    return _this.pausa(function () { return _this.menuBibliotecario(); });
                case "2":
                    _this.mostrarPrestados();
                    return _this.pausa(function () { return _this.menuBibliotecario(); });
                case "3":
                    return _this.cerrar("👋 Saliendo...");
                default:
                    return _this.menuBibliotecario();
            }
        });
    };
    App.prototype.opcionPrestar = function () {
        var _this = this;
        var disponibles = this.bibliotecario.obtenerDisponibles();
        if (disponibles.length === 0) {
            console.log("❌ No hay libros disponibles");
            return this.pausa(function () { return _this.menuCliente(); });
        }
        console.log("\n📘 Libros disponibles para prestar:");
        disponibles.forEach(function (l) { return console.log("".concat(l.getId(), ". ").concat(l.getTitulo())); });
        this.rl.question("👉 Ingresa el ID del libro a prestar: ", function (id) {
            var libro = disponibles.find(function (l) { return l.getId() === Number(id); });
            if (!libro) {
                console.log("❌ ID no válido.");
            }
            else {
                _this.cliente.prestarLibro(libro);
                console.log("\u2714 Has prestado: ".concat(libro.getTitulo()));
            }
            _this.pausa(function () { return _this.menuCliente(); });
        });
    };
    App.prototype.opcionDevolver = function () {
        var _this = this;
        var prestados = this.bibliotecario.obtenerPrestados()
            .filter(function (l) { return !l.estaDisponible(); });
        if (prestados.length === 0) {
            console.log("❌ No tienes libros prestados.");
            return this.pausa(function () { return _this.menuCliente(); });
        }
        console.log("\n📕 Libros prestados:");
        prestados.forEach(function (l) { return console.log("".concat(l.getId(), ". ").concat(l.getTitulo())); });
        this.rl.question("👉 Ingresa el ID del libro a devolver: ", function (id) {
            var libro = prestados.find(function (l) { return l.getId() === Number(id); });
            if (!libro) {
                console.log("❌ ID no válido.");
            }
            else {
                _this.cliente.devolverLibro(libro);
                console.log("\u2714 Has devuelto: ".concat(libro.getTitulo()));
            }
            _this.pausa(function () { return _this.menuCliente(); });
        });
    };
    App.prototype.mostrarDisponibles = function () {
        var disponibles = this.bibliotecario.obtenerDisponibles();
        console.log("📘 Libros disponibles:");
        disponibles.forEach(function (l) { return console.log("- ".concat(l.getTitulo(), " (").concat(l.getAutor(), ")")); });
    };
    App.prototype.mostrarPrestados = function () {
        var prestados = this.bibliotecario.obtenerPrestados();
        console.log("📕 Libros prestados:");
        prestados.forEach(function (l) { return console.log("- ".concat(l.getTitulo(), " (").concat(l.getAutor(), ")")); });
    };
    App.prototype.pausa = function (callback) {
        this.rl.question("\nPresiona ENTER para continuar...", function () { return callback(); });
    };
    App.prototype.cerrar = function (msg) {
        console.log(msg);
        this.rl.close();
    };
    return App;
}());
var libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
var libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
var libro3 = new Libro(3, "El Quijote", "Cervantes");
var bibliotecario1 = new Bibliotecario("Ana");
bibliotecario1.setCatalogo([libro1, libro2, libro3]);
var cliente1 = new Cliente("Randolph");
var app = new App();
app.setBibliotecario(bibliotecario1);
app.setCliente(cliente1);
app.iniciar();
