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
var promptSync = require("prompt-sync");
var prompt = promptSync();
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
//------------------------------------------------------------------
var App = /** @class */ (function () {
    function App() {
        this.bibliotecario = new Bibliotecario("Sin asignar");
        this.cliente = new Cliente("Sin asignar");
        this.clientes = [];
        this.bibliotecarios = [];
        this.prompt = prompt;
    }
    App.prototype.iniciar = function () {
        console.clear();
        console.log("📚 SISTEMA DE BIBLIOTECA");
        var resp = this.prompt("¿Quién eres? (1) Cliente  (2) Bibliotecario 👉 ");
        if (resp === "1") {
            console.log("\n👤 Antes de continuar, debes identificarte como Cliente.");
            return this.opcionCambiaroCrearCliente();
        }
        if (resp === "2") {
            console.log("\n📘 Antes de continuar, debes identificarte como Bibliotecario.");
            return this.opcionCambiaroCrearBibliotecario();
        }
        return this.cerrar("Opción no válida.");
    };
    App.prototype.menuCliente = function () {
        console.clear();
        console.log("\uD83D\uDC64 Cliente: ".concat(this.cliente.getNombre(), "\n1. Ver libros disponibles\n2. Prestar libro\n3. Devolver libro\n4. Cambiar/Crear Cliente\n5. Volver al men\u00FA inicio\n6. Salir"));
        var op = this.prompt("👉 Selecciona una opción: ");
        switch (op) {
            case "1":
                this.mostrarDisponibles();
                this.pausa();
                return this.menuCliente();
            case "2":
                return this.opcionPrestar();
            case "3":
                return this.opcionDevolver();
            case "4":
                return this.opcionCambiaroCrearCliente();
            case "5":
                return this.iniciar();
            case "6":
                return this.cerrar("👋 Saliendo...");
            default:
                return this.menuCliente();
        }
    };
    App.prototype.menuBibliotecario = function () {
        console.clear();
        console.log("\uD83D\uDCD8 Bibliotecario: ".concat(this.bibliotecario.getNombre(), "\n1. Ver libros disponibles\n2. Ver libros prestados\n3. Agregar libro al cat\u00E1logo\n4. Cambiar/Crear Bibliotecario\n5. Volver a inicio\n6. Salir"));
        var op = this.prompt("👉 Selecciona una opción: ");
        switch (op) {
            case "1":
                this.mostrarDisponibles();
                this.pausa();
                return this.menuBibliotecario();
            case "2":
                this.mostrarPrestados();
                this.pausa();
                return this.menuBibliotecario();
            case "3":
                return this.opcionAgregarLibro();
            case "4":
                return this.opcionCambiaroCrearBibliotecario();
            case "5":
                return this.iniciar();
            case "6":
                return this.cerrar("👋 Saliendo...");
            default:
                return this.menuBibliotecario();
        }
    };
    App.prototype.opcionPrestar = function () {
        var disponibles = this.bibliotecario.obtenerDisponibles();
        if (disponibles.length === 0) {
            console.log("❌ No hay libros disponibles");
            this.pausa();
            return this.menuCliente();
        }
        console.log("\n📘 Libros disponibles:");
        disponibles.forEach(function (l) { return console.log("".concat(l.getId(), ". ").concat(l.getTitulo())); });
        var id = Number(this.prompt("👉 Ingresa el ID del libro a prestar: "));
        var libro = disponibles.find(function (l) { return l.getId() === id; });
        if (!libro)
            console.log("❌ ID no válido.");
        else {
            this.cliente.prestarLibro(libro);
            console.log("\u2714 Has prestado: ".concat(libro.getTitulo()));
        }
        this.pausa();
        return this.menuCliente();
    };
    App.prototype.opcionDevolver = function () {
        var prestados = this.bibliotecario.obtenerPrestados();
        if (prestados.length === 0) {
            console.log("❌ No tienes libros prestados.");
            this.pausa();
            return this.menuCliente();
        }
        console.log("\n📕 Libros prestados:");
        prestados.forEach(function (l) { return console.log("".concat(l.getId(), ". ").concat(l.getTitulo())); });
        var id = Number(this.prompt("👉 Ingresa el ID del libro a devolver: "));
        var libro = prestados.find(function (l) { return l.getId() === id; });
        if (!libro)
            console.log("❌ ID no válido.");
        else {
            this.cliente.devolverLibro(libro);
            console.log("\u2714 Has devuelto: ".concat(libro.getTitulo()));
        }
        this.pausa();
        return this.menuCliente();
    };
    App.prototype.opcionAgregarLibro = function () {
        console.log("📗 Agregar libro al catálogo");
        var id = Number(this.prompt("👉 Ingresa el ID del libro: "));
        var titulo = this.prompt("👉 Ingresa el título del libro: ");
        var autor = this.prompt("👉 Ingresa el autor del libro: ");
        var nuevoLibro = new Libro(id, titulo, autor);
        var catalogo = this.bibliotecario.getCatalogo();
        catalogo.push(nuevoLibro);
        this.bibliotecario.setCatalogo(catalogo);
        console.log("\u2714 Libro a\u00F1adido: ".concat(titulo, " (").concat(autor, ")"));
        this.pausa();
        return this.menuBibliotecario();
    };
    App.prototype.opcionCambiaroCrearCliente = function () {
        var nombre = this.prompt("👉 Ingresa el nombre del nuevo cliente: ");
        var existente = this.clientes.find(function (c) { return c.getNombre() === nombre; });
        if (existente) {
            console.log("\u2714 Cliente existente seleccionado: ".concat(nombre));
            this.cliente = existente;
        }
        else {
            var nuevo = new Cliente(nombre);
            this.clientes.push(nuevo);
            this.cliente = nuevo;
            console.log("\u2714 Cliente creado: ".concat(nombre));
        }
        this.pausa();
        return this.menuCliente();
    };
    App.prototype.opcionCambiaroCrearBibliotecario = function () {
        var nombre = this.prompt("👉 Ingresa el nombre del nuevo bibliotecario: ");
        var existente = this.bibliotecarios.find(function (b) { return b.getNombre() === nombre; });
        if (existente) {
            console.log("\u2714 Bibliotecario existente seleccionado: ".concat(nombre));
            this.bibliotecario = existente;
        }
        else {
            var nuevo = new Bibliotecario(nombre);
            nuevo.setCatalogo(this.bibliotecario.getCatalogo());
            this.bibliotecarios.push(nuevo);
            this.bibliotecario = nuevo;
            console.log("\u2714 Bibliotecario creado: ".concat(nombre));
        }
        this.pausa();
        return this.menuBibliotecario();
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
    App.prototype.pausa = function () {
        this.prompt("\nPresiona ENTER para continuar...");
    };
    App.prototype.cerrar = function (msg) {
        console.log(msg);
        process.exit(0);
    };
    return App;
}());
// const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
// const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
// const libro3 = new Libro(3, "El Quijote", "Cervantes");
// const bibliotecario1 = new Bibliotecario("Ana");
// bibliotecario1.setCatalogo([libro1, libro2, libro3]);
// const cliente1 = new Cliente("Randolph");
var app = new App();
// app.setBibliotecario(bibliotecario1);
// app.setCliente(cliente1);
app.iniciar();
