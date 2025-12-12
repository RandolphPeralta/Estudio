// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el data mostrar la disponibilidad
// Codigo: 

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

// Interfaces
interface RegistroBiblioteca {
  registro<T>(data: T): boolean;
}

interface IAccionesCliente{
  prestar<T>(data: T): void;
  devolver<T>(data: T): void;
  reservar<T>(data: T): void;
}

// Detalle de implementacion
class Cliente implements IAccionesCliente, RegistroBiblioteca{
  
  public prestamos: Array<any> = []

  registro<T>(data: T): boolean {
    return true
  }

  prestar<T>(data: T): void {
    this.prestamos.push(data)
  }

  devolver<T>(data: T): void {
    const index = this.prestamos.indexOf(data);
    if (index !== -1) {
      this.prestamos.splice(index, 1);
    }
  }

  reservar<T>(data: T): void {
      // reservar 
    }
}

class Estudiante extends Cliente{
}

class Profesor extends Cliente{
}

class Directivo extends Cliente{
}


// Modelo de guardado

type libro = {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean
}

type Usuario = {
  nombre: string;
  edad: number
  nacionalidad: string
}

// Clase consumo

class App {
  
  // private estudiantes!: Estudiante[]
   public catalogo: libro[] = []

  run(): void {
    console.log("📚 Bienvenio al Sistema de biblioteca")
    // Registro
    console.log(`Registrese: `);
    const name= String(prompt("👉 Ingresa su nombre : "));
    const age = Number(prompt("👉 Ingresa su edad: "));
    const nacionality = String(prompt("👉 Ingresa su nacionalidad: "));

    const usuario: Usuario = {
      nombre: name,
      edad: age,
      nacionalidad: nacionality
    }

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
       autor: "J. K. Rowling",
       disponible: true
     }

     this.catalogo.push(libro1, libro2, libro3)

    const puesto = Number(prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo: "));
    // Despues de esta opcion se crean los objetos y sus funcionalides
    switch (puesto) {
      case 1: {
      const estudiante = new Estudiante();
      estudiante.registro(usuario);

      const accion: number = Number(
        prompt("Desea: (0) Ver libros (1) Prestar, (2) Devolver, (3) Reservar: ")
        );

        switch (accion) {
          case 0:
          console.log(this.catalogo);
          break;

          case 1:
          //    estudiante.prestar(libro)
          //    libro.disponible = false
          //    console.log(`El libro ${libro.titulo} fue prestado`);
          break;

          case 2:
          console.log("Aquí devolvería un libro…");
          break;

          case 3:
          console.log("Aquí reservaría un libro…");
          break;

          default:
          console.log("Acción no válida");
          break;
          }

        break;
        }

    case 2: {
      const profesor = new Profesor();
      profesor.registro(usuario);
      break;
    }

    case 3: {
      const directivo = new Directivo();
      directivo.registro(usuario);
      break;
    }

    default:{
      console.log("Puesto no válido");
      break;
    }
    }


  }
}

const app = new App()
app.run()

 // Ejemplo del objeto 

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

    // prestar
    //  if (true){
    //    estudiante.prestar(libro)
    //    libro.disponible = false
    //    console.log(`El libro ${libro.titulo} fue prestado`)
    //  }
    
    //  if (false){
    //   estudiante.devolver(libro)
    //   libro.disponible = true
    //   console.log(`El libro ${libro.titulo} fue devuelto`)
    //  }
    
    // prestamos
    //  if (true){
    //   console.log(estudiante.prestamos)
    //  }