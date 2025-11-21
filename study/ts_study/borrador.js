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
    function Libro(titulo, autor, codigo) {
        this.titulo = titulo;
        this.autor = autor;
        this.codigo = codigo;
    }
    Libro.prototype.prestado = function () {
        return true;
    };
    return Libro;
}());
var Usuario = /** @class */ (function () {
    function Usuario(nombre, oficio) {
        this.nombre = nombre;
        this.oficio = oficio;
    }
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getOficio = function () {
        return this.oficio;
    };
    return Usuario;
}());
var Estudiante = /** @class */ (function (_super) {
    __extends(Estudiante, _super);
    function Estudiante() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LibrosPrestados = [];
        return _this;
    }
    Estudiante.prototype.prestar = function () {
        this.LibrosPrestados.push();
        return "Libro prestado";
    };
    Estudiante.prototype.devolver = function () {
        return "Libro devuelto";
    };
    return Estudiante;
}(Usuario));
var estudiante1 = new Estudiante("Randolph", "Estudiante");
console.log(estudiante1.getNombre());
