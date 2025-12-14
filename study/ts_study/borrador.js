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
// Detalle de implementacion
var Estudiante = /** @class */ (function () {
    function Estudiante() {
        this.reservas = [];
        this.prestamos = [];
    }
    Estudiante.prototype.registro = function (data) {
        return true;
    };
    Estudiante.prototype.prestar = function (data) {
        if (this.prestamos.length <= 3) {
            this.prestamos.push(data);
        }
    };
    Estudiante.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    Estudiante.prototype.reservar = function (data) {
        if (this.reservas.length <= 3) {
            this.reservas.push(data);
        }
    };
    return Estudiante;
}());
var Profesor = /** @class */ (function () {
    function Profesor() {
        this.reservas = [];
        this.prestamos = [];
    }
    Profesor.prototype.registro = function (data) {
        return true;
    };
    Profesor.prototype.prestar = function (data) {
        if (this.prestamos.length <= 5) {
            this.prestamos.push(data);
        }
    };
    Profesor.prototype.devolver = function (data) {
        var index = this.prestamos.indexOf(data);
        if (index !== -1) {
            this.prestamos.splice(index, 1);
        }
    };
    Profesor.prototype.reservar = function (data) {
        if (this.reservas.length <= 5) {
            this.reservas.push(data);
        }
    };
    return Profesor;
}());
var Directivo = /** @class */ (function () {
    function Directivo(inventario) {
        if (inventario === void 0) { inventario = []; }
        this.inventario = inventario;
    }
    Directivo.prototype.registro = function (data) {
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
// Clase consumo
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
var App = /** @class */ (function () {
    function App() {
        // private estudiantes!: Estudiante[]
        this.catalogo = [];
    }
    App.prototype.run = function () {
        this.catalogo.push(libro1, libro2, libro3);
        console.log("📚 Bienvenio al Sistema de biblioteca");
        console.log("Registrese: ");
        var name = String(prompt("👉 Ingresa su nombre : "));
        var identification = String(prompt("👉 Ingresa su identificacion : "));
        var age = Number(prompt("👉 Ingresa su edad: "));
        var nacionality = String(prompt("👉 Ingresa su nacionalidad: "));
        var position = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));
        var usuario;
        switch (position) {
            case 1: {
                var degree = String(prompt("👉 Grado: "));
                var data = {
                    nombre: name,
                    identificacion: identification,
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
                    edad: age,
                    nacionalidad: nacionality,
                    puesto: job
                };
                usuario = new Directivo();
                usuario.registro(data);
                this.menuInventario(usuario);
                break;
            }
        }
    };
    App.prototype.menuAcciones = function (usuario) {
        var opcion = Number(prompt("👉 (1) Prestar libro, (2) Devolver libro, (3) Reservar libro: "));
        switch (opcion) {
            case 1: {
                console.log("📚 Libros disponibles:");
                this.catalogo.forEach(function (l) {
                    if (l.disponible)
                        console.log("".concat(l.id, ". ").concat(l.titulo));
                });
                var idLibro_1 = Number(prompt("👉 ID del libro: "));
                var libro = this.catalogo.find(function (l) { return l.id === idLibro_1 && l.disponible; });
                if (!libro) {
                    console.log("❌ Libro no disponible");
                    return;
                }
                usuario.prestar(libro);
                libro.disponible = false;
                console.log("✅ Libro prestado");
                break;
            }
            case 2: {
                var idLibro_2 = Number(prompt("👉 ID del libro a devolver: "));
                var libro = this.catalogo.find(function (l) { return l.id === idLibro_2; });
                if (!libro) {
                    console.log("❌ Libro no encontrado");
                    return;
                }
                usuario.devolver(libro);
                libro.disponible = true;
                console.log("📘 Libro devuelto");
                break;
            }
            case 3: {
                var idLibro_3 = Number(prompt("👉 ID del libro a reservar: "));
                var libro = this.catalogo.find(function (l) { return l.id === idLibro_3; });
                if (!libro) {
                    console.log("❌ Libro no encontrado");
                    return;
                }
                usuario.reservar(libro);
                console.log("📌 Libro reservado");
                break;
            }
        }
    };
    App.prototype.menuInventario = function (usuario) {
        var opcion = Number(prompt("👉 (1) Agregar libro, (2) Eliminar libro, (3) Ver catalogo: "));
        switch (opcion) {
            case 1: {
                var id = Number(prompt("👉 ID del libro: "));
                var titulo = String(prompt("👉 Titulo: "));
                var autor = String(prompt("👉 Autor: "));
                var nuevoLibro = {
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    disponible: true
                };
                usuario.agregar(nuevoLibro);
                console.log("✅ Libro agregado");
                break;
            }
            case 2: {
                var idLibro_4 = Number(prompt("👉 ID del libro a eliminar: "));
                var libroEliminar = this.catalogo.find(function (l) { return l.id === idLibro_4; });
                if (!libroEliminar) {
                    console.log("❌ Libro no encontrado");
                    return;
                }
                usuario.eliminar(libroEliminar);
                console.log("🗑️ Libro eliminado");
                break;
            }
            case 3: {
                console.log("📚 Catalogo actual:");
                this.catalogo.forEach(function (l) {
                    return console.log("".concat(l.id, ". ").concat(l.titulo, " - ").concat(l.autor));
                });
                break;
            }
        }
    };
    return App;
}());
var app = new App;
app.run();
// private menuAcciones(usuario: Estudiante| Profesor | Directivo): void {
//   let salir = false;
//   while (!salir) {
//     const accion = Number(prompt("\nDesea: (0) Ver libros (1) Prestar (2) Devolver (3) Reservar (4) Salir: "));
//     switch (accion) {
//       case 0:
//         console.log(this.catalogo);
//         this.pausa();
//         break;
//        case 1:
//         this.prestarLibro(cliente);
//         this.pausa();
//          break;
//        case 2:
//         this.devolverLibro(cliente);
//         this.pausa();
//         break;
//        case 3:
//          this.reservarLibro(cliente);
//          this.pausa();
//          break;
//        case 4:
//          console.log("👋 Gracias por usar el sistema de biblioteca");
//           salir = true;
//           break;
//        default:
//          console.log("❌ Acción no válida");
//          break;
//      }
//    }
// const directivo = new Directivo(this.catalogo)
//      directivo.agregar({
//       id: 1,
//       titulo: "Clean Code",
//       autor: "Robert C. Martin",
//       disponible: true
//       });
//       console.log(this.catalogo);
// const estudiante: EstudianteInfo = {
//        nombre: name,
//        identificacion: identification,
//        edad: age,
//        nacionalidad: nacionality,
//        grado: degree
//      }
//     const usuario: Usuario = {
//       nombre: name,
//       edad: age,
//       nacionalidad: nacionality
//     }
//     const libro1: libro = {
//        id: 1,
//        titulo: "Juego de tronos",
//        autor: "George R.R Martin",
//        disponible: true
//      }
//      const libro2: libro = {
//        id: 2,
//        titulo: "Harry Potter",
//        autor: "J. K. Rowling",
//        disponible: true
//      }
//      const libro3: libro = {
//        id: 3,
//        titulo: "Don Quijote",
//        autor: "J. K. Rowling",
//        disponible: true
//      }
//     this.catalogo.push(libro1, libro2, libro3)
//     const puesto = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));
//     let cliente: Cliente;
//     switch (puesto) {
//       case 1:
//         cliente = new Estudiante();
//         break;
//       case 2:
//         cliente = new Profesor();
//         break;
//       case 3:
//         cliente = new Directivo();
//         break;
//       default:
//         console.log("Puesto no válido");
//         return;
//       }
//       cliente.registro(usuario);
//       this.menuAcciones(cliente);
// }
// private menuAcciones(cliente: Cliente): void {
//   let salir = false;
//   while (!salir) {
//     const accion = Number(prompt("\nDesea: (0) Ver libros (1) Prestar (2) Devolver (3) Reservar (4) Salir: "));
//     switch (accion) {
//       case 0:
//         console.log(this.catalogo);
//         this.pausa();
//         break;
//       case 1:
//         this.prestarLibro(cliente);
//         this.pausa();
//         break;
//       case 2:
//         this.devolverLibro(cliente);
//         this.pausa();
//         break;
//       case 3:
//         this.reservarLibro(cliente);
//         this.pausa();
//         break;
//       case 4:
//         console.log("👋 Gracias por usar el sistema de biblioteca");
//         salir = true;
//         break;
//       default:
//         console.log("❌ Acción no válida");
//         break;
//     }
//   }
// }
// private prestarLibro(cliente: Cliente): void {
//   console.log("📚 Catálogo de libros:");
//   this.catalogo.forEach(lib => console.log(`${lib.id} - ${lib.titulo} (${lib.disponible ? "Disponible" : "Prestado"})`));
//   const busqueda = String(prompt("👉 Ingresa el título o autor del libro que deseas prestar: ")).toLowerCase();
//   const libro = this.catalogo.find(
//     l => l.titulo.toLowerCase().includes(busqueda) || l.autor.toLowerCase().includes(busqueda));
//   if (!libro) {
//     console.log("❌ No se encontró ningún libro.");
//     return;
//   }
//   if (!libro.disponible) {
//     console.log("❌ El libro ya está prestado.");
//     return;
//   }
//   cliente.prestar(libro);
//   libro.disponible = false;
//   console.log(`📘 El libro "${libro.titulo}" fue prestado exitosamente.`);
// }
// private devolverLibro(cliente: Cliente): void {
//   if (cliente.prestamos.length === 0) {
//     console.log("❌ No tienes libros prestados.");
//     return;
//   }
//   console.log("📕 Libros prestados:");
//   cliente.prestamos.forEach((lib, index) => console.log(`${index + 1} - ${lib.titulo} (${lib.autor})`));
//   const opcion = Number(prompt("👉 Ingresa el número del libro a devolver (0 para cancelar): "));
//   if (opcion === 0) return;
//   const index = opcion - 1;
//   if (index < 0 || index >= cliente.prestamos.length) {
//     console.log("❌ Opción inválida.");
//     return;
//   }
//   const libro = cliente.prestamos[index];
//   cliente.devolver(libro);
//   libro.disponible = true;
//   console.log(`📗 El libro "${libro.titulo}" fue devuelto correctamente.`);
// }
// private reservarLibro(cliente: Cliente): void {
//   const busqueda = String(prompt("👉 Ingresa el título o autor del libro a reservar: ")).toLowerCase();
//   const libro = this.catalogo.find(l => l.titulo.toLowerCase().includes(busqueda) || l.autor.toLowerCase().includes(busqueda));
//   if (!libro) {
//     console.log("❌ Libro no encontrado.");
//     return;
//   }
//   if (libro.disponible) {
//     console.log("📌 Libro reservado.");
//     cliente.reservar(libro);
//     return 
//   }
//   console.log("📌 El libro está disponible, no requiere reserva.");
// }
// private pausa(): void {
//     prompt("\nPresiona ENTER para continuar...");
//   }
// }
// const app = new App()
// app.run()
// Ejemplo del objeto a crear del bibliotecario
// console.log(`Ingrese el libro al catalogo: `);
// const ide: number = prompt("👉 Ingresa su id : ")
// const title: string = prompt("👉 Ingresa su titulo : ");
// const author: string = prompt("👉 Ingresa su autor: ");
//const disponible: string = prompt("👉 Ingresa su nacionalidad: ");
// const libro: libro = {
//    id: ide,
//    titulo: title,
//    autor: author,
//    disponible: true
//  }
// prestamos
//  if (true){
//   console.log(estudiante.prestamos)
//  }
// type EstudianteInfo = {
//   grado: number
// }
// type ProfesorInfo = {
//   cursos: Array<any>
// }
// type DirectivoInfo = {
//   cargo: "Secretaria" | "Coordinador" | "Rector";
// }
