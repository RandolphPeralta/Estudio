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
    Usuario.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
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
        this.clientes = [];
        this.bibliotecarios = [];
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
        console.log("\uD83D\uDC64 Cliente: ".concat(this.cliente.getNombre(), "\n1. Ver libros disponibles\n2. Prestar libro\n3. Devolver libro\n4. Salir\n5. Cambiar/Crear Cliente"));
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
                case "5":
                    return _this.opcionCambiarCliente();
                default:
                    return _this.menuCliente();
            }
        });
    };
    App.prototype.menuBibliotecario = function () {
        var _this = this;
        console.clear();
        console.log("\uD83D\uDCD8 Bibliotecario: ".concat(this.bibliotecario.getNombre(), "\n1. Ver libros disponibles\n2. Ver libros prestados\n3. Agregar libro al cat\u00E1logo\n4. Salir\n5. Cambiar/Crear Bibliotecario"));
        this.rl.question("👉 Selecciona una opción: ", function (op) {
            switch (op) {
                case "1":
                    _this.mostrarDisponibles();
                    return _this.pausa(function () { return _this.menuBibliotecario(); });
                case "2":
                    _this.mostrarPrestados();
                    return _this.pausa(function () { return _this.menuBibliotecario(); });
                case "3":
                    return _this.opcionAgregarLibro();
                case "4":
                    return _this.cerrar("👋 Saliendo...");
                case "5":
                    return _this.opcionCambiarBibliotecario();
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
    App.prototype.opcionAgregarLibro = function () {
        var _this = this;
        console.log("📗 Agregar libro al catálogo");
        this.rl.question("👉 Ingresa el ID del libro: ", function (idInput) {
            var id = Number(idInput);
            _this.rl.question("👉 Ingresa el título del libro: ", function (titulo) {
                _this.rl.question("👉 Ingresa el autor del libro: ", function (autor) {
                    var nuevoLibro = new Libro(id, titulo, autor);
                    var catalogo = _this.bibliotecario.getCatalogo();
                    catalogo.push(nuevoLibro);
                    _this.bibliotecario.setCatalogo(catalogo);
                    console.log("\u2714 Libro a\u00F1adido: ".concat(titulo, " (").concat(autor, ")"));
                    _this.pausa(function () { return _this.menuBibliotecario(); });
                });
            });
        });
    };
    App.prototype.opcionCambiarCliente = function () {
        var _this = this;
        this.rl.question("👉 Ingresa el nombre del nuevo cliente: ", function (nombre) {
            // Verificar si ya existe
            var existente = _this.clientes.find(function (c) { return c.getNombre() === nombre; });
            if (existente) {
                console.log("\u2714 Cliente existente seleccionado: ".concat(nombre));
                _this.cliente = existente;
            }
            else {
                var nuevo = new Cliente(nombre);
                _this.clientes.push(nuevo);
                _this.cliente = nuevo;
                console.log("\u2714 Cliente creado: ".concat(nombre));
            }
            _this.pausa(function () { return _this.menuCliente(); });
        });
    };
    App.prototype.opcionCambiarBibliotecario = function () {
        var _this = this;
        this.rl.question("👉 Ingresa el nombre del nuevo bibliotecario: ", function (nombre) {
            var existente = _this.bibliotecarios.find(function (b) { return b.getNombre() === nombre; });
            if (existente) {
                console.log("\u2714 Bibliotecario existente seleccionado: ".concat(nombre));
                _this.bibliotecario = existente;
            }
            else {
                var nuevo = new Bibliotecario(nombre);
                nuevo.setCatalogo(_this.bibliotecario.getCatalogo());
                _this.bibliotecarios.push(nuevo);
                _this.bibliotecario = nuevo;
                console.log("\u2714 Bibliotecario creado: ".concat(nombre));
            }
            _this.pausa(function () { return _this.menuBibliotecario(); });
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
