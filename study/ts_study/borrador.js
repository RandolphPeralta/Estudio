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
    Cliente.prototype.mostrarInfo = function () {
    };
    Cliente.prototype.prestarLibro = function (libro) {
        if (libro.estaDisponible()) {
            libro.prestar();
            this.prestamos.push(libro);
        }
        else {
        }
    };
    Cliente.prototype.devolverLibro = function (libro) {
        var index = this.prestamos.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.prestamos.splice(index, 1);
        }
        else {
        }
    };
    return Cliente;
}(Usuario));
var Bibliotecario = /** @class */ (function (_super) {
    __extends(Bibliotecario, _super);
    function Bibliotecario(nombre, catalogo) {
        var _this = _super.call(this, nombre) || this;
        _this.catalogo = [];
        _this.catalogo = catalogo;
        return _this;
    }
    Bibliotecario.prototype.obtenerDisponibles = function () {
        return this.catalogo.filter(function (libro) { return libro.estaDisponible(); });
    };
    Bibliotecario.prototype.obtenerPrestados = function () {
        return this.catalogo.filter(function (libro) { return !libro.estaDisponible(); });
    };
    return Bibliotecario;
}(Usuario));
//--------------------------------------------------------------
// Clase consumidora o app
var App = /** @class */ (function () {
    function App(bibliotecario, cliente) {
        this.bibliotecario = bibliotecario;
        this.cliente = cliente;
    }
    App.prototype.iniciar = function () {
        this.mostrarDisponibles();
        this.mostrarPrestados();
    };
    App.prototype.mostrarDisponibles = function () {
        var disponibles = this.bibliotecario.obtenerDisponibles();
        console.log("📘 Libros disponibles:");
        disponibles.forEach(function (libro) {
            console.log("- ".concat(libro.getTitulo(), " (").concat(libro.getAutor(), ")"));
        });
    };
    App.prototype.mostrarPrestados = function () {
        var prestados = this.bibliotecario.obtenerPrestados();
        console.log("📕 Libros prestados:");
        prestados.forEach(function (libro) {
            console.log("- ".concat(libro.getTitulo(), " (").concat(libro.getAutor(), ")"));
        });
    };
    return App;
}());
var libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
var libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
var libro3 = new Libro(3, "El Quijote", "Cervantes");
var catalogo1 = [libro1, libro2, libro3];
var bibliotecario = new Bibliotecario("Ana", catalogo1);
var cliente = new Cliente("Randolph");
cliente.prestarLibro(libro2); // presta Harry Potter
// Crear la app
var app = new App(bibliotecario, cliente);
// Iniciar
app.iniciar();
