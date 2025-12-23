// Praticar la abstracion de como realizar un sistema de prestamos en la repositoriobiblioteca
var Cliente = /** @class */ (function () {
    function Cliente() {
        this.informacion = [];
        this.prestamos = [];
    }
    Cliente.prototype.registro = function (data) {
        this.informacion.push(data);
        return true;
    };
    Cliente.prototype.prestar = function (veces, data) {
        if (this.prestamos.length >= veces) {
            return false;
        }
        this.prestamos.push(data);
        return true;
    };
    Cliente.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    return Cliente;
}());
var RepositoriodeMemoria = /** @class */ (function () {
    function RepositoriodeMemoria() {
        this.memoria = [];
    }
    RepositoriodeMemoria.prototype.guardar = function (some) {
        this.memoria.push(some);
    };
    RepositoriodeMemoria.prototype.eliminar = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some; });
        if (index !== -1) {
            this.memoria.splice(index, 1);
        }
    };
    RepositoriodeMemoria.prototype.actualizar = function (some) {
        var index = this.memoria.findIndex(function (i) { return i === some; });
        if (index !== -1) {
            this.memoria[index] = some;
        }
    };
    RepositoriodeMemoria.prototype.mostrar = function () {
        return this.memoria;
    };
    return RepositoriodeMemoria;
}());
// ESTA CLASE ES PARA EL INVENTARIO DE LOS LIBROS
var ServicioLibro = /** @class */ (function () {
    function ServicioLibro(memoria) {
        this.memoria = memoria;
    }
    ServicioLibro.prototype.register = function (id, titulo, autor) {
        var libro = { id: id, titulo: titulo, autor: autor, disponible: true };
        this.memoria.guardar(libro);
        return libro;
    };
    ServicioLibro.prototype.delete = function (id) {
        this.memoria.eliminar(id);
    };
    ServicioLibro.prototype.update = function (id, titulo, autor) {
        var libros = this.memoria.mostrar();
        var libroExistente = libros.find(function (l) { return l.id === id; });
        if (!libroExistente) {
            return;
        }
        libroExistente.titulo = titulo;
        libroExistente.autor = autor;
        this.memoria.actualizar(libroExistente);
    };
    ServicioLibro.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioLibro;
}());
var ServicioEstudiante = /** @class */ (function () {
    function ServicioEstudiante(memoria) {
        this.memoria = memoria;
    }
    ServicioEstudiante.prototype.register = function (nombre, identificacion, grado) {
        var estudiante = { nombre: nombre, identificacion: identificacion, grado: grado };
        this.memoria.guardar(estudiante);
        return estudiante;
    };
    ServicioEstudiante.prototype.delete = function (identificacion) {
        var id = identificacion;
        this.memoria.eliminar(id);
    };
    ServicioEstudiante.prototype.update = function (identificacion, nombre, grado) {
        var estudiantes = this.memoria.mostrar();
        var estudianteExistente = estudiantes.find(function (l) { return l.identificacion === identificacion; });
        if (!estudianteExistente) {
            return;
        }
        estudianteExistente.nombre = nombre;
        estudianteExistente.grado = grado;
        this.memoria.actualizar(estudianteExistente);
    };
    ServicioEstudiante.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioEstudiante;
}());
var ServicioPrestamo = /** @class */ (function () {
    function ServicioPrestamo() {
    }
    return ServicioPrestamo;
}());
//---------------------------------------
// PROBANDO POR LOS ESTUDIANTES
var repositorioestudiante = new RepositoriodeMemoria;
var servicioestudiante = new ServicioEstudiante(repositorioestudiante);
servicioestudiante.register("Sara", "1132456789", "11");
servicioestudiante.register("Laura", "12356789", "11");
servicioestudiante.delete("12356789");
console.log(servicioestudiante.getAll());
//PROBANDO POR EL INVENTARIO DE LIBROS EN LA BIBLIOTECA
//const repositoriobiblioteca = new RepositoriodeMemoria<Libro>
//const serviciolibro = new ServicioLibro(repositoriobiblioteca)
//serviciolibro.register("1", "IT", "Sthephen King")
//console.log(repositoriobiblioteca.mostrar())
//YA SE PUEDE ELMINAR POR ID
//serviciolibro.delete("1")
//console.log(repositoriobiblioteca.mostrar())
// ESTAMOS BUSCANDO ACTUALIZAR POR EL ID
//serviciolibro.update("1", "IT (Edición Especial)", "Stephen King")
//console.log(serviciolibro.getAll())
// ACA SE IMPLEMENTO LA INTERFACE DE REPOSITORIO
//class ServicioLibro {
//    constructor(private memoria: RepositoriodeMemoria<Libro>)
//    register(id: string, title:string, author: string) {
//        const book = {
//            id,
//            title,
//            author,
//            available: true
//        }
// eliminar(id: string): void{
// this.repository.guardar(book)}
//getById(id:string): Book | null {
// return this.repository.getById(id)}
//getAll(): Book[]{
// return this.repository.getAll()}
//    prestar(book: Book): void{
//        book.available = false;
//    }
// this.repository.update(book)
//}
// devolver(book: Book): void{
// book.available = true;
//  this.repository.update(book)}
//    }
// actualizar(criterio: (item: T) => boolean, nuevo: T): void {
//     const index = this.memoria.findIndex(criterio);
//     if (index !== -1) {
//       this.memoria[index] = nuevo;}
//       }
// const libro1: Libro = {
//   id: 1,
//   titulo: "Juego de tronos",
//   autor: "George R.R Martin",
//   disponible: true
// }
// const libro2: Libro = {
//   id: 2,
//   titulo: "Harry Potter",
//   autor: "J. K. Rowling",
//   disponible: true
// }
// const libro3: Libro = {
//   id: 3,
//   titulo: "Don Quijote",
//   autor: "Cervantes",
//   disponible: true
// }
// const libro4: Libro = {
//   id: 4,
//   titulo: "Cien años de soledad",
//   autor: "Gabriel García Márquez",
//   disponible: true
// }
// const libro5: Libro = {
//   id: 5,
//   titulo: "Orgullo y prejuicio",
//   autor: "Jane Austen",
//   disponible: true
// }
// const Libros = [libro1, libro2, libro3, libro4, libro5]
