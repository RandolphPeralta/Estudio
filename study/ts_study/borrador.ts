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

interface IAccionesBibliotecario{
  prestados(): Array<any>;
  disponibles(): void;
  reservados(): void;
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

class Bibliotecario implements IAccionesBibliotecario, RegistroBiblioteca{
  private catalogo: Array<any> = []
  
  registro<T>(data: T): boolean {
    return true
  }

  prestados(): Array<any> {
    return this.catalogo
  }

  disponibles(): void {
    
  }

  reservados(): void {
    
  }
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
    const name: string = prompt("👉 Ingresa su nombre : ");
    const age: number = prompt("👉 Ingresa su edad: ");
    const nacionality: string = prompt("👉 Ingresa su nacionalidad: ");

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

     this.catalogo.push(libro1)

    const puesto: number = prompt("👉 Eres (1) Estudiante, (2) Profesor, (3) Directivo, (4) Bibliotecario: ");
    // Despues de esta opcion se crean los objetos y sus funcionalides
    switch(puesto){
      case 1:
        const estudiante = new Estudiante()
        estudiante.registro(usuario)

      case 2:
        const profesor = new Profesor()
        profesor.registro(usuario)
        
      case 3:
        const directivo = new Directivo()
        directivo.registro(usuario)

      case 4:
        const bibliotecario = new Bibliotecario
        bibliotecario.registro(usuario)

         // La funciones para bibliotecario
    }

    const accion: number = prompt("Desea: (0) Ver libros(1) Prestar, (2) Devolver, (3) Reservar");
        switch(accion){
          case 0:
            console.log(this.catalogo)
        }

    function prestar(){

    }

    const estudiante = new Estudiante()
    // const profesor = new Profesor()
    // const directivo = new Directivo()
    // const bibliotecario = new Bibliotecario
    estudiante.registro(usuario)
    // profesor.registro(usuario)
    // directivo.registro(usuario)
    // bibliotecario.registro(usuario)
    
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
  }
}

const app = new App()
app.run()