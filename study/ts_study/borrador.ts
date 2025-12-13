// Praticar la abstracion de como realizar un sistema de prestamos en la biblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor, para prestar, devolver, reservar
// O directivo para manejar el inventario de la biblioteca

// Codigo: 
import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

// Interfaces
interface IAcciones {
  registro<T>(data: T): boolean;
  prestar<T>(data: T): void;
  devolver<T>(data: T): void;
  reservar<T>(data: T): void;
}

// Detalle de implementacion
class Estudiante implements IAcciones{
  public reservas: Array<any> = [];
  public prestamos: Array<any> = []

  registro<T>(data: T): boolean {
    return true
  }

  prestar<T>(data: T): void {
    if (this.prestamos.length <= 3){
      this.prestamos.push(data)
    }
  }

  devolver<T>(data: T): void {
    const index = this.prestamos.indexOf(data);
    if (index !== -1) {
      this.prestamos.splice(index, 1);
    }
  }

  reservar<T>(data: T): void {
    if  (this.reservas.length <= 3){
      this.reservas.push(data);
    } 
  }
}

class Profesor implements IAcciones{
  public reservas: Array<any> = [];
  public prestamos: Array<any> = []

  registro<T>(data: T): boolean {
    return true
  }

  prestar<T>(data: T): void {
    if (this.prestamos.length <= 5){
      this.prestamos.push(data)
    }
  }

  devolver<T>(data: T): void {
    const index = this.prestamos.indexOf(data);
    if (index !== -1) {
      this.prestamos.splice(index, 1);
    }
  }

  reservar<T>(data: T): void {
    if  (this.reservas.length <= 5){
      this.reservas.push(data);
    } 
  }
}

class Directivo {
  agregar<T>(item: T): void {}

  eliminar<T>(item: T): void {}

  actualizar<T>(item: T): void {}

}

// Modelo de guardado

type libro = {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean
}

type EstudianteInfo = {
  nombre: string;
  identificacion: string
  edad: number
  nacionalidad: string
  grado: string
}

type ProfesorInfo = {
  nombre: string;
  identificacion: string
  edad: number
  nacionalidad: string
  curso: string
}

// Clase consumo

class App {
   // private estudiantes!: Estudiante[]
  private catalogo: libro[] = []

   run(): void {
     console.log("📚 Bienvenio al Sistema de biblioteca")

     console.log(`Registrese: `);
     const name= String(prompt("👉 Ingresa su nombre : "));
     const identification = String(prompt("👉 Ingresa su identificacion : "));
     const age = Number(prompt("👉 Ingresa su edad: "));
     const nacionality = String(prompt("👉 Ingresa su nacionalidad: "));
     const position = (prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "))
     switch(position){

     }
     const degree = String(prompt("👉 Que grado cursas: "))
     const course = String(prompt("👉 Que curso estas dictando: "))
   }

}


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