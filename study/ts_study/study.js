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
    function Libro(titulo, autor, codigo, disponible) {
        this.titulo = "";
        this.autor = "";
        this.codigo = 0;
        this.disponible = true;
        this.titulo = titulo;
        this.autor = autor;
        this.codigo = codigo;
        this.disponible = disponible;
    }
    Libro.prototype.getTitulo = function () {
        return this.titulo;
    };
    Libro.prototype.getDisponibilidad = function () {
        return this.disponible;
    };
    Libro.prototype.prestarLibro = function (libro) {
        if (libro.getDisponibilidad()) {
            this.disponible == false;
        }
        else if (libro.getDisponibilidad() == false) {
            return "No esta disponible el libro";
        }
    };
    Libro.prototype.devolverLibro = function () {
        this.disponible == true;
    };
    return Libro;
}());
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
var Estudiante = /** @class */ (function (_super) {
    __extends(Estudiante, _super);
    function Estudiante(nombre) {
        var _this = _super.call(this, nombre) || this;
        _this.librosPrestados = [];
        return _this;
    }
    Estudiante.prototype.prestar = function (libro) {
        if (libro.getDisponibilidad() == true) {
            libro.prestarLibro;
            this.librosPrestados.push(libro);
            return "El libro ".concat(libro.getTitulo(), " ha sido prestado");
        }
    };
    Estudiante.prototype.devolver = function (libro) {
        if (libro.getDisponibilidad() == false) {
            var index = this.librosPrestados.indexOf(libro);
            if (index !== -1) {
                libro.devolverLibro();
                this.librosPrestados.splice(index, 1);
            }
            else {
                return "\u26A0\uFE0F ".concat(this.nombre, " no tiene prestado \"").concat(libro.getTitulo(), "\".");
            }
        }
    };
    Estudiante.prototype.mostrar = function () {
        return this.librosPrestados;
    };
    return Estudiante;
}(Usuario));
var libro = new Libro("El señor de los anillos", "J. R. R. Tolkien", 1, true);
var estudiante = new Estudiante("Alan");
console.log(estudiante.prestar(libro));
console.log(estudiante.mostrar());
// class Estudiante {
//   private nombre: string = ""
//   private grado: number = 0
//   private librosPrestados: Libro[] = []
//   setNombre(nombre: string){
//     this.nombre = nombre
//   }
//   setGrado(grado: number){
//     this.grado = grado
//   }
//   prestar(libro: Libro){
//     if (libro.getDisponibilidad() == true){
//       libro.prestarLibro
//       this.librosPrestados.push(libro)
//       return `El libro ${libro.getTitulo()} ha sido prestado`
//     }
//    }
//   devolver(libro: Libro) {
//     if (libro.getDisponibilidad() == false){
//       const index = this.librosPrestados.indexOf(libro);
//       if (index !== -1) {
//         libro.devolverLibro();
//         this.librosPrestados.splice(index, 1);
//       } 
//       else {
//       return `⚠️ ${this.nombre} no tiene prestado "${libro.getTitulo()}".`;
//           }
//         }
//       }
//   mostrar(): Libro[] {
//     return this.librosPrestados
//     }
//   }
// const libro = new Libro("El señor de los anillos", "J. R. R. Tolkien", 1, true) 
// const estudiante = new Estudiante()
// estudiante.setNombre("Alan")
// estudiante.setGrado(11)
// console.log(estudiante.prestar(libro));
// console.log(estudiante.mostrar());
