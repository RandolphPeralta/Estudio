// 1. interface 
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
// 2. abstract clase disponibilidad
var EstadoPrestamo = /** @class */ (function () {
    function EstadoPrestamo() {
        this.disponible = true;
    }
    EstadoPrestamo.prototype.prestar = function () {
        if (this.disponible) {
            this.disponible = false;
            console.log("📕 El recurso ha sido prestado.");
        }
        else {
            console.log("❌ El recurso no está disponible.");
        }
    };
    EstadoPrestamo.prototype.devolver = function () {
        this.disponible = true;
        console.log("📗 El recurso ha sido devuelto.");
    };
    EstadoPrestamo.prototype.estaDisponible = function () {
        return this.disponible;
    };
    return EstadoPrestamo;
}());
// 3. Clase diseño del libro
var Libro = /** @class */ (function () {
    function Libro(titulo, autor, codigo) {
        this.titulo = titulo;
        this.autor = autor;
        this.codigo = codigo;
        this.estado = new EstadoPrestamo();
    }
    Libro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libro.prototype.prestar = function () {
        this.estado.prestar();
    };
    Libro.prototype.devolver = function () {
        this.estado.devolver();
    };
    Libro.prototype.estaDisponible = function () {
        return this.estado.estaDisponible();
    };
    return Libro;
}());
// 3. abstract Clase de Usuario
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    return Usuario;
}());
// 4. clase de estudiante
var Estudiante = /** @class */ (function (_super) {
    __extends(Estudiante, _super);
    function Estudiante() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prestamos = [];
        return _this;
    }
    Estudiante.prototype.mostrarInfo = function () {
        console.log("\uD83D\uDC64 Cliente: ".concat(this.nombre, ", Libros prestados: ").concat(this.prestamos.length));
    };
    Estudiante.prototype.prestarLibro = function (libro) {
        if (libro.estaDisponible()) {
            libro.prestar();
            this.prestamos.push(libro);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no puede prestar \"").concat(libro.getTitulo(), "\"."));
        }
    };
    Estudiante.prototype.devolverLibro = function (libro) {
        var index = this.prestamos.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.prestamos.splice(index, 1);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no ten\u00EDa prestado \"").concat(libro.getTitulo(), "\"."));
        }
    };
    return Estudiante;
}(Usuario));
var libro1 = new Libro("Cien Años de Soledad", "Gabo", 1);
// const libro2 = new Libro( "El Principito", "Saint-Exupéry",2);
var cliente = new Estudiante("Randolph Peralta");
cliente.mostrarInfo();
libro1.estaDisponible();
// cliente.prestarLibro(libro1);
// cliente.prestarLibro(libro2);
// cliente.devolverLibro(libro1);
// cliente.mostrarInfo();
