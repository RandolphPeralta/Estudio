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
// Gestion de prestacion de libros
var Libro = /** @class */ (function () {
    function Libro(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.prestado = false;
    }
    Libro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libro.prototype.getAutor = function () {
        return this.autor;
    };
    Libro.prototype.esPrestado = function () {
        return this.prestado;
    };
    Libro.prototype.setPrestado = function (prestado) {
        this.prestado = prestado;
    };
    return Libro;
}());
// Clase LibroFiccion que hereda de Libro
var LibroFiccion = /** @class */ (function (_super) {
    __extends(LibroFiccion, _super);
    function LibroFiccion(titulo, autor) {
        return _super.call(this, titulo, autor) || this;
    }
    return LibroFiccion;
}(Libro));
// Clase Estudiante
var Estudiante = /** @class */ (function () {
    function Estudiante(nombre) {
        this.nombre = nombre;
        this.librosPrestados = [];
    }
    Estudiante.prototype.prestarLibro = function (libro) {
        if (!libro.esPrestado()) {
            libro.setPrestado(true);
            this.librosPrestados.push(libro);
            console.log("Libro ".concat(libro.getTitulo(), " prestado a ").concat(this.nombre));
        }
        else {
            console.log("Libro ".concat(libro.getTitulo(), " no disponible"));
        }
    };
    Estudiante.prototype.devolverLibro = function (libro) {
    };
    return Estudiante;
}());
// Clase biblioteca
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.libros = [];
        this.estudiantes = [];
    }
    Biblioteca.prototype.agregarLibro = function (libro) {
        this.libros.push(libro);
        console.log("Libro agregado");
    };
    Biblioteca.prototype.mostrarLibros = function () {
        return this.libros;
    };
    Biblioteca.prototype.agregarEstudiante = function (estudiante) {
        this.estudiantes.push(estudiante);
        console.log("Estudiante agregado");
    };
    Biblioteca.prototype.prestarLibro = function (estudiante, libro) {
        estudiante.prestarLibro(libro);
        console.log("Libro prestado");
    };
    Biblioteca.prototype.devolverLibro = function (estudiante, libro) {
        estudiante.devolverLibro(libro);
        console.log("Libro devuelto");
    };
    return Biblioteca;
}());
// crear biblioteca
var biblioteca = new Biblioteca();
// agregar libro 
var libro1 = new LibroFiccion("El señor de los anillos", "J.R.R Tolkien");
biblioteca.agregarLibro(libro1);
// agregar estudiante
var estudiante1 = new Estudiante("Pepito");
biblioteca.agregarEstudiante(estudiante1);
biblioteca.prestarLibro(estudiante1, libro1);
biblioteca.mostrarLibros();
