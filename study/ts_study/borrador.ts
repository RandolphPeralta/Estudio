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
  prestados(): void;
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
  registro<T>(data: T): boolean {
    return true
  }

  prestados(): void {
    
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

  constructor(private estudiante: Estudiante, private profesor: Profesor, private directivo: Directivo, private bibliotecario: Bibliotecario){}

  run(): void {
    console.log("Sistema de biblioteca")
    // Registro
    const usuario: Usuario = {
      nombre: "Randolph",
      edad: 30,
      nacionalidad: "Colombiano"
    }
    const estudiante = new Estudiante()
    estudiante.registro(usuario)
    
    // Ejemplo del objeto 
    // const libro: libro = {
    //   id: 1,
    //   titulo: "Juego de tronos",
    //   autor: "George R.R Martin",
    //   disponible: true
    // }

    // if (true){
    //   this.estudiante.prestar(libro)
    //   console.log(this.estudiante.prestamos)
    // }
  }
}
