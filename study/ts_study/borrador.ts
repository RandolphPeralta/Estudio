// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el libro mostrar la disponibilidad
// Codigo: 

// Interfaces
interface RegistroBiblioteca {
  registro<T>(data: T): boolean;
}

interface IAccionesCliente{
  prestar<T>(id: number, data: T): void;
  devolver<T>(id: number, data: T): void;
  reservar<T>(id: number, data: T): void;
}

interface IAccionesBibliotecario{
  prestados(): void;
  disponibles(): void;
  reservados(): void;
}

class Estudiante implements RegistroBiblioteca {
  registro<Usuario>(data: Usuario): boolean {
    return true
  }
}

class Profesor {
 registro<Usuario>(data: Usuario): boolean {
    return true
  }
}

class Directivo {
registro<Usuario>(data: Usuario): boolean {
    return true
  }
}

class Bibliotecario {
registro<Usuario>(data: Usuario): boolean {
    return true
  }
}

// Modelo 

class Usuario {
  constructor(
    private nombre: string, 
    private edad: number, 
    private nacionalidad: string)
    {
    this.nombre = nombre
    this.edad = edad
    this.nacionalidad = nacionalidad
  }
}

class Libro{
  constructor(
    private id: number,
    private titulo: string,
    private autor: string)
    {
    this.id = id 
    this.titulo = titulo
    this.autor = autor
  }
}

// Clase consumo

class App {

}