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
// =============================================================
// 2. Clase que aplica COMPOSICIÓN (preferida sobre herencia)
// =============================================================
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
// =============================================================
// 3. Clase Libro usando COMPOSICIÓN e interfaces
// =============================================================
var Libro = /** @class */ (function () {
    function Libro(id, titulo, autor) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.estado = new EstadoPrestamo(); // COMPOSICIÓN
    }
    Libro.prototype.getId = function () {
        return this.id;
    };
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
// =============================================================
// 4. Clase abstracta Usuario — base para herencia
// =============================================================
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    return Usuario;
}());
// =============================================================
// 5. Clase Cliente que hereda de Usuario y aplica POLIMORFISMO
// =============================================================
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prestamos = [];
        return _this;
    }
    Cliente.prototype.mostrarInfo = function () {
        console.log("\uD83D\uDC64 Cliente: ".concat(this.nombre, ", Libros prestados: ").concat(this.prestamos.length));
    };
    Cliente.prototype.prestarLibro = function (libro) {
        if (libro.estaDisponible()) {
            libro.prestar();
            this.prestamos.push(libro);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no puede prestar \"").concat(libro.getTitulo(), "\"."));
        }
    };
    Cliente.prototype.devolverLibro = function (libro) {
        var index = this.prestamos.indexOf(libro);
        if (index !== -1) {
            libro.devolver();
            this.prestamos.splice(index, 1);
        }
        else {
            console.log("\u26A0\uFE0F ".concat(this.nombre, " no ten\u00EDa prestado \"").concat(libro.getTitulo(), "\"."));
        }
    };
    return Cliente;
}(Usuario));
// =============================================================
// 6. Programa principal (ejemplo de uso)
// =============================================================
var libro1 = new Libro(1, "Cien Años de Soledad", "Gabo");
var libro2 = new Libro(2, "El Principito", "Saint-Exupéry");
var cliente = new Cliente("Randolph Peralta");
cliente.mostrarInfo();
cliente.prestarLibro(libro1);
cliente.prestarLibro(libro2);
cliente.devolverLibro(libro1);
cliente.mostrarInfo();
