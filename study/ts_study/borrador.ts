// Praticar la abstracion de como realizar un sistema de prestamos en la biblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor, para prestar, devolver, reservar
// O directivo para manejar el inventario de la biblioteca

// Codigo: 
import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface IRegistro {
  registro<T>(data: T): boolean;
}

interface IAcciones {
  prestar<T>(data: T): boolean;
  devolver<T>(data: T): void;
  reservar<T>(data: T): void;
}

interface IInventario {
  agregar<T>(item: T): void;
  eliminar<T>(item: T): void;
  actualizar<T>(item: T): void;
}

class Estudiante implements IAcciones, IRegistro {
  private informacion: Array<any> = []
  public reservas: Array<any> = [];
  public prestamos: Array<any> = [];

  registro<T>(data: T): boolean {
    this.informacion.push(data)
    return true
  }

  prestar<T>(data: T): boolean {
    if (this.prestamos.length >= 2) {
      return false;
    }
    this.prestamos.push(data);
    return true;
  }

  devolver<T>(data: T): void {
    const index = this.prestamos.indexOf(data);
    if (index !== -1) {
      this.prestamos.splice(index, 1);
    }
  }

  reservar<T>(data: T): void {
    if (this.reservas.length <= 2) {
      this.reservas.push(data);
    }
  }
}

class Profesor implements IAcciones, IRegistro {

  private informacion: Array<any> = []
  public reservas: Array<any> = [];
  public prestamos: Array<any> = []

  registro<T>(data: T): boolean {
    this.informacion.push(data)
    return true
  }

  prestar<T>(data: T): boolean {
    if (this.prestamos.length >= 3) {
      return false;
    }
    this.prestamos.push(data);
    return true;
  }

  devolver<T>(data: T): void {
    const index = this.prestamos.indexOf(data);
    if (index !== -1) {
      this.prestamos.splice(index, 1);
    }
  }

  reservar<T>(data: T): void {
    if (this.reservas.length <= 3) {
      this.reservas.push(data);
    }
  }
}

class Directivo implements IInventario, IRegistro {
  private informacion: Array<any> = []

  constructor(private inventario: Array<any> = []) { }

  registro<T>(data: T): boolean {
    this.informacion.push(data)
    return true
  }

  agregar<T>(item: T): void {
    this.inventario.push(item);
  }

  eliminar<T>(item: T): void {
    const index = this.inventario.indexOf(item);
    if (index !== -1) {
      this.inventario.splice(index, 1);
    }
  }

  actualizar<T>(item: T): void {
    const index = this.inventario.findIndex(i => i === item);
    if (index !== -1) {
      this.inventario[index] = item;}
  }
}

type libro = {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean
}

type EstudianteInfo = {
  nombre: string;
  identificacion: string
  genero: string
  edad: number
  nacionalidad: string
  grado: string
}

type ProfesorInfo = {
  nombre: string;
  identificacion: string
  genero: string
  edad: number
  nacionalidad: string
  curso: string
}

type DirectivoInfo = {
  nombre: string;
  identificacion: string
  genero: string
  edad: number
  nacionalidad: string
  puesto: string
}

//--------------------------------------------------

const libro1: libro = {
  id: 1,
  titulo: "Juego de tronos",
  autor: "George R.R Martin",
  disponible: true
}

const libro2: libro = {
  id: 2,
  titulo: "Harry Potter",
  autor: "J. K. Rowling",
  disponible: true
}

const libro3: libro = {
  id: 3,
  titulo: "Don Quijote",
  autor: "Cervantes",
  disponible: true
}

const libro4: libro = {
  id: 4,
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  disponible: true
}

const libro5: libro = {
  id: 5,
  titulo: "Orgullo y prejuicio",
  autor: "Jane Austen",
  disponible: true
}

// class App {
//   private usuariosRegistrados: string[] = [];
//   private catalogo: libro[] = []

//   run(): void {

//     this.catalogo.push(libro1, libro2, libro3, libro4, libro5);

//     let continuar = true;

//     while (continuar) {

//       console.log("\n📚 Sistema de Biblioteca");
//       console.log("1. Registrar usuario\n0. Salir")

//       const opcion = Number(prompt("👉 Selecione una opción: "));

//       switch (opcion) {
//         case 1:
//           this.registrarUsuario();
//           break;

//         case 0:
//           continuar = false;
//           console.log("👋 Gracias por usar el sistema");
//           break;

//         default:
//           console.log("❌ Opción inválida");
//       }
//     }
//   }

// private registrarUsuario(): void {

//     console.log("📝 Registro de usuario");

//     const name = String(prompt("👉 Ingresa su nombre : "));
//     const identification = String(prompt("👉 Ingresa su identificacion : "));
//     const gender = String(prompt("👉 Ingresa su genero : "));
//     const age = Number(prompt("👉 Ingresa su edad: "));
//     const nacionality = String(prompt("👉 Ingresa su nacionalidad: "));
//     const position = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));

//     let usuario: any;
//     if (this.usuariosRegistrados.includes(identification)) {
//       console.log("❌ Usuario ya registrado");
//       return;
//     }

//     switch (position) {

//       case 1: {
//         const degree = String(prompt("👉 Grado: "));

//         const data: EstudianteInfo = {
//           nombre: name,
//           identificacion: identification,
//           genero: gender,
//           edad: age,
//           nacionalidad: nacionality,
//           grado: degree
//         };

//         usuario = new Estudiante();
//         usuario.registro(data);
//         this.menuAcciones(usuario);
//         break;
//       }

//       case 2: {
//         const course = String(prompt("👉 Que curso estas dictando: "));

//         const data: ProfesorInfo = {
//           nombre: name,
//           identificacion: identification,
//           genero: gender,
//           edad: age,
//           nacionalidad: nacionality,
//           curso: course
//         };

//         usuario = new Profesor();
//         usuario.registro(data);
//         this.menuAcciones(usuario);
//         break;
//       }

//       case 3: {
//         const job = String(prompt("👉 Que puesto de trabajo ocupa: "));

//         const data: DirectivoInfo = {
//           nombre: name,
//           identificacion: identification,
//           genero: gender,
//           edad: age,
//           nacionalidad: nacionality,
//           puesto: job
//         };

//         usuario = new Directivo();
//         usuario.registro(data);
//         this.menuInventario(usuario);
//         break;
//       }

//       default:
//         console.log("❌ Opción inválida");
//     }

//     this.usuariosRegistrados.push(identification);
// }

// private menuAcciones(usuario: IAcciones): void {

//     let continuar = true;

//     while (continuar) {

//       const opcion = Number(prompt("👉 (1) Prestar (2) Devolver (3) Reservar (0) Salir: "));

//       switch (opcion) {

//         case 1: {
//           console.log("📚 Libros disponibles:");
//           this.catalogo.forEach(l => {
//             if (l.disponible) console.log(`${l.id}. ${l.titulo}`);
//           });

//           const idLibro = Number(prompt("👉 ID del libro: "));
//           const libro = this.catalogo.find(l => l.id === idLibro && l.disponible);

//           if (!libro) {
//             console.log("❌ Libro no disponible");
//             break;
//           }

//           const prestado = usuario.prestar(libro);

//           if (!prestado) {
//             console.log("❌ Has alcanzado el límite de préstamos");
//             break;
//           }

//           libro.disponible = false;
//           console.log("✅ Libro prestado");

//           break;
//         }

//         case 2: {
//           const idLibro = Number(prompt("👉 ID del libro a devolver: "));
//           const libro = this.catalogo.find(l => l.id === idLibro);

//           if (!libro) {
//             console.log("❌ Libro no encontrado");
//             break;
//           }

//           usuario.devolver(libro);
//           libro.disponible = true;
//           console.log("📘 Libro devuelto");
//           break;
//         }

//         case 3: {
//           const idLibro = Number(prompt("👉 ID del libro a reservar: "));
//           const libro = this.catalogo.find(l => l.id === idLibro);

//           if (!libro) {
//             console.log("❌ Libro no encontrado");
//             break;
//           }

//           usuario.reservar(libro);
//           libro.disponible = false;
//           console.log("📌 Libro reservado");
//           break;
//         }

//         case 0:
//           continuar = false;
//           break;

//         default:
//           console.log("❌ Opción inválida");
//       }
//     }
//   }

// private menuInventario(usuario: IInventario): void {

//     let continuar = true;

//     while (continuar) {

//       const opcion = Number(prompt("👉 (1) Agregar (2) Eliminar (3) Ver (4) Actualizar (0) Salir: "));

//       switch (opcion) {

//         case 1: {
//           const id = Number(prompt("👉 ID del libro: "));

//           if (this.catalogo.some(l => l.id === id)) {
//             console.log("❌ Ya existe un libro con ese ID");
//             break;
//           }

//           const titulo = String(prompt("👉 Titulo: "));
//           const autor = String(prompt("👉 Autor: "));

//           const nuevoLibro: libro = {
//             id,
//             titulo,
//             autor,
//             disponible: true
//           };

//           this.catalogo.push(nuevoLibro);
//           usuario.agregar(nuevoLibro);

//           console.log("✅ Libro agregado");
//           break;
//         }

//         case 2: {
//           const idLibro = Number(prompt("👉 ID del libro a eliminar: "));
//           const index = this.catalogo.findIndex(l => l.id === idLibro);

//           if (index === -1) {
//             console.log("❌ Libro no encontrado");
//             break;
//           }

//           const libro = this.catalogo[index];
//           usuario.eliminar(libro);
//           this.catalogo.splice(index, 1);

//           console.log("🗑️ Libro eliminado");
//           break;
//         }

//         case 3:
//           console.log("📚 Catálogo:");
//           this.catalogo.forEach(l => console.log(`${l.id}. ${l.titulo} - ${l.autor}`)
//           );
//           break;
        
//         case 4: {
//           const idLibro = Number(prompt("👉 ID del libro a actualizar: "));
//           const index = this.catalogo.findIndex(l => l.id === idLibro);

//           if (index === -1) {
//             console.log("❌ Libro no encontrado");
//             break;
//             }

//           const libroActual = this.catalogo[index];

//           const nuevoTitulo = String(prompt(`👉 Nuevo título (${libroActual.titulo}): `));
//           const nuevoAutor = String(prompt(`👉 Nuevo autor (${libroActual.autor}): `));

//           const libroActualizado: libro = {
//             id: libroActual.id,
//             titulo: nuevoTitulo || libroActual.titulo,
//             autor: nuevoAutor || libroActual.autor,
//             disponible: libroActual.disponible
//           };

//           this.catalogo[index] = libroActualizado;

//           usuario.actualizar(libroActualizado);

//           console.log("✏️ Libro actualizado correctamente");
//           break;
//         }


//         case 0:
//           continuar = false;
//           break;

//         default:
//           console.log("❌ Opción inválida");
//       }
//     }
//   }
// }

// const app = new App();
// app.run()
