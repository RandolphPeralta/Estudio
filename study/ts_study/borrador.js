"use strict";
// Praticar la abstracion de como realizar un sistema de prestamos en la biblioteca
Object.defineProperty(exports, "__esModule", { value: true });
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor, para prestar, devolver, reservar
// O directivo para manejar el inventario de la biblioteca
// Codigo: 
var promptSync = require("prompt-sync");
var prompt = promptSync();
var Estudiante = /** @class */ (function () {
    function Estudiante() {
        this.informacion = [];
        this.reservas = [];
        this.prestamos = [];
    }
    Estudiante.prototype.registro = function (data) {
        this.informacion.push(data);
        return true;
    };
    Estudiante.prototype.prestar = function (data) {
        if (this.prestamos.length >= 2) {
            return false;
        }
        this.prestamos.push(data);
        return true;
    };
    Estudiante.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    Estudiante.prototype.reservar = function (data) {
        if (this.reservas.length <= 2) {
            this.reservas.push(data);
        }
    };
    return Estudiante;
}());
var Profesor = /** @class */ (function () {
    function Profesor() {
        this.informacion = [];
        this.reservas = [];
        this.prestamos = [];
    }
    Profesor.prototype.registro = function (data) {
        this.informacion.push(data);
        return true;
    };
    Profesor.prototype.prestar = function (data) {
        if (this.prestamos.length >= 3) {
            return false;
        }
        this.prestamos.push(data);
        return true;
    };
    Profesor.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    Profesor.prototype.reservar = function (data) {
        if (this.reservas.length <= 3) {
            this.reservas.push(data);
        }
    };
    return Profesor;
}());
var Directivo = /** @class */ (function () {
    function Directivo(inventario) {
        if (inventario === void 0) { inventario = []; }
        this.inventario = inventario;
        this.informacion = [];
    }
    Directivo.prototype.registro = function (data) {
        this.informacion.push(data);
        return true;
    };
    Directivo.prototype.agregar = function (item) {
        this.inventario.push(item);
    };
    Directivo.prototype.eliminar = function (item) {
        var index = this.inventario.indexOf(item);
        if (index !== -1) {
            this.inventario.splice(index, 1);
        }
    };
    return Directivo;
}());
//--------------------------------------------------
var libro1 = {
    id: 1,
    titulo: "Juego de tronos",
    autor: "George R.R Martin",
    disponible: true
};
var libro2 = {
    id: 2,
    titulo: "Harry Potter",
    autor: "J. K. Rowling",
    disponible: true
};
var libro3 = {
    id: 3,
    titulo: "Don Quijote",
    autor: "J. K. Rowling",
    disponible: true
};
var libro4 = {
    id: 4,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    disponible: true
};
var App = /** @class */ (function () {
    function App() {
        this.usuariosRegistrados = [];
        this.catalogo = [];
    }
    App.prototype.run = function () {
        this.catalogo.push(libro1, libro2, libro3, libro4);
        var continuar = true;
        while (continuar) {
            console.log("\n📚 Sistema de Biblioteca");
            console.log("1. Registrar usuario\n0. Salir");
            var opcion = Number(prompt("👉 Selecione una opción: "));
            switch (opcion) {
                case 1:
                    this.registrarUsuario();
                    break;
                case 0:
                    continuar = false;
                    console.log("👋 Gracias por usar el sistema");
                    break;
                default:
                    console.log("❌ Opción inválida");
            }
        }
    };
    App.prototype.registrarUsuario = function () {
        console.log("📝 Registro de usuario");
        var name = String(prompt("👉 Ingresa su nombre : "));
        var identification = String(prompt("👉 Ingresa su identificacion : "));
        var gender = String(prompt("👉 Ingresa su genero : "));
        var age = Number(prompt("👉 Ingresa su edad: "));
        var nacionality = String(prompt("👉 Ingresa su nacionalidad: "));
        var position = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));
        var usuario;
        if (this.usuariosRegistrados.includes(identification)) {
            console.log("❌ Usuario ya registrado");
            return;
        }
        switch (position) {
            case 1: {
                var degree = String(prompt("👉 Grado: "));
                var data = {
                    nombre: name,
                    identificacion: identification,
                    genero: gender,
                    edad: age,
                    nacionalidad: nacionality,
                    grado: degree
                };
                usuario = new Estudiante();
                usuario.registro(data);
                this.menuAcciones(usuario);
                break;
            }
            case 2: {
                var course = String(prompt("👉 Que curso estas dictando: "));
                var data = {
                    nombre: name,
                    identificacion: identification,
                    genero: gender,
                    edad: age,
                    nacionalidad: nacionality,
                    curso: course
                };
                usuario = new Profesor();
                usuario.registro(data);
                this.menuAcciones(usuario);
                break;
            }
            case 3: {
                var job = String(prompt("👉 Que puesto de trabajo ocupa: "));
                var data = {
                    nombre: name,
                    identificacion: identification,
                    genero: gender,
                    edad: age,
                    nacionalidad: nacionality,
                    puesto: job
                };
                usuario = new Directivo();
                usuario.registro(data);
                this.menuInventario(usuario);
                break;
            }
            default:
                console.log("❌ Opción inválida");
        }
        this.usuariosRegistrados.push(identification);
    };
    App.prototype.menuAcciones = function (usuario) {
        var continuar = true;
        var _loop_1 = function () {
            var opcion = Number(prompt("👉 (1) Prestar (2) Devolver (3) Reservar (0) Salir: "));
            switch (opcion) {
                case 1: {
                    console.log("📚 Libros disponibles:");
                    this_1.catalogo.forEach(function (l) {
                        if (l.disponible)
                            console.log("".concat(l.id, ". ").concat(l.titulo));
                    });
                    var idLibro_1 = Number(prompt("👉 ID del libro: "));
                    var libro = this_1.catalogo.find(function (l) { return l.id === idLibro_1 && l.disponible; });
                    if (!libro) {
                        console.log("❌ Libro no disponible");
                        break;
                    }
                    var prestado = usuario.prestar(libro);
                    if (!prestado) {
                        console.log("❌ Has alcanzado el límite de préstamos");
                        break;
                    }
                    libro.disponible = false;
                    console.log("✅ Libro prestado");
                    break;
                }
                case 2: {
                    var idLibro_2 = Number(prompt("👉 ID del libro a devolver: "));
                    var libro = this_1.catalogo.find(function (l) { return l.id === idLibro_2; });
                    if (!libro) {
                        console.log("❌ Libro no encontrado");
                        break;
                    }
                    usuario.devolver(libro);
                    libro.disponible = true;
                    console.log("📘 Libro devuelto");
                    break;
                }
                case 3: {
                    var idLibro_3 = Number(prompt("👉 ID del libro a reservar: "));
                    var libro = this_1.catalogo.find(function (l) { return l.id === idLibro_3; });
                    if (!libro) {
                        console.log("❌ Libro no encontrado");
                        break;
                    }
                    usuario.reservar(libro);
                    console.log("📌 Libro reservado");
                    break;
                }
                case 0:
                    continuar = false;
                    break;
                default:
                    console.log("❌ Opción inválida");
            }
        };
        var this_1 = this;
        while (continuar) {
            _loop_1();
        }
    };
    App.prototype.menuInventario = function (usuario) {
        var continuar = true;
        var _loop_2 = function () {
            var opcion = Number(prompt("👉 (1) Agregar (2) Eliminar (3) Ver (0) Salir: "));
            switch (opcion) {
                case 1: {
                    var id_1 = Number(prompt("👉 ID del libro: "));
                    if (this_2.catalogo.some(function (l) { return l.id === id_1; })) {
                        console.log("❌ Ya existe un libro con ese ID");
                        break;
                    }
                    var titulo = String(prompt("👉 Titulo: "));
                    var autor = String(prompt("👉 Autor: "));
                    var nuevoLibro = {
                        id: id_1,
                        titulo: titulo,
                        autor: autor,
                        disponible: true
                    };
                    this_2.catalogo.push(nuevoLibro);
                    usuario.agregar(nuevoLibro);
                    console.log("✅ Libro agregado");
                    break;
                }
                case 2: {
                    var idLibro_4 = Number(prompt("👉 ID del libro a eliminar: "));
                    var index = this_2.catalogo.findIndex(function (l) { return l.id === idLibro_4; });
                    if (index === -1) {
                        console.log("❌ Libro no encontrado");
                        break;
                    }
                    var libro = this_2.catalogo[index];
                    usuario.eliminar(libro);
                    this_2.catalogo.splice(index, 1);
                    console.log("🗑️ Libro eliminado");
                    break;
                }
                case 3:
                    console.log("📚 Catálogo:");
                    this_2.catalogo.forEach(function (l) { return console.log("".concat(l.id, ". ").concat(l.titulo, " - ").concat(l.autor)); });
                    break;
                case 0:
                    continuar = false;
                    break;
                default:
                    console.log("❌ Opción inválida");
            }
        };
        var this_2 = this;
        while (continuar) {
            _loop_2();
        }
    };
    return App;
}());
var app = new App();
app.run();
