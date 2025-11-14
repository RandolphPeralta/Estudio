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
// Clase Libro: aplica encapsulamiento
var Libro = /** @class */ (function () {
    function Libro(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponible = true;
    }
    Libro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libro.prototype.isDisponible = function () {
        return this.disponible;
    };
    Libro.prototype.prestar = function () {
        if (this.disponible) {
            this.disponible = false;
            console.log("\uD83D\uDCDA El libro \"".concat(this.titulo, "\" ha sido prestado."));
        }
        else {
            console.log("\u274C El libro \"".concat(this.titulo, "\" no est\u00E1 disponible."));
        }
    };
    Libro.prototype.devolver = function () {
        this.disponible = true;
        console.log("\u2705 El libro \"".concat(this.titulo, "\" ha sido devuelto."));
    };
    return Libro;
}());
// Clase base Usuario (herencia base)
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    Usuario.prototype.mostrarInfo = function () {
        console.log("\uD83D\uDC64 Usuario: ".concat(this.nombre));
    };
    return Usuario;
}());
// Clase Cliente que hereda de Usuario y aplica polimorfismo
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente(nombre) {
        var _this = _super.call(this, nombre) || this;
        _this.librosPrestados = [];
        return _this;
    }
    Cliente.prototype.prestarLibro = function (libro) {
        if (libro.isDisponible()) {
            libro.prestar();
            this.librosPrestados.push(libro);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no puede prestar \"").concat(libro.getTitulo(), "\" porque no est\u00E1 disponible."));
        }
    };
    Cliente.prototype.devolverLibro = function (libro) {
        var index = this.librosPrestados.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.librosPrestados.splice(index, 1);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no tiene prestado \"").concat(libro.getTitulo(), "\"."));
        }
    };
    // Polimorfismo: redefinimos mostrarInfo()
    Cliente.prototype.mostrarInfo = function () {
        console.log("\uD83D\uDC64 Cliente: ".concat(this.nombre, " | Libros prestados: ").concat(this.librosPrestados.length));
    };
    return Cliente;
}(Usuario));
// Programa principal
var libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez");
var libro2 = new Libro("El Principito", "Antoine de Saint-Exupéry");
var cliente1 = new Cliente("Randolph Peralta");
cliente1.mostrarInfo();
cliente1.prestarLibro(libro1);
cliente1.prestarLibro(libro2);
cliente1.devolverLibro(libro1);
cliente1.mostrarInfo();
