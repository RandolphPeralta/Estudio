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
            console.log("Eliminado");
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
var ServicioLibro = /** @class */ (function () {
    function ServicioLibro(memoria) {
        this.memoria = memoria;
    }
    ServicioLibro.prototype.register = function (id, titulo, autor) {
        var libro = {
            id: id,
            titulo: titulo,
            autor: autor,
            disponible: true
        };
        this.memoria.guardar(libro);
        return libro;
    };
    ServicioLibro.prototype.delete = function (id) {
        this.memoria.eliminar(id);
    };
    ServicioLibro.prototype.getAll = function () {
        this.memoria.mostrar();
    };
    return ServicioLibro;
}());
//---------------------------------------
var estudiante = new Cliente;
var profesor = new Cliente;
var repositoriobiblioteca = new RepositoriodeMemoria;
var serviciolibro = new ServicioLibro(repositoriobiblioteca);
serviciolibro.register(1, "IT", "Sthephen King");
console.log(repositoriobiblioteca.mostrar());
serviciolibro.delete(1);
console.log(repositoriobiblioteca.mostrar());
//repositoriobiblioteca.guardar(libro1)
//console.log(repositoriobiblioteca.mostrar())
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
