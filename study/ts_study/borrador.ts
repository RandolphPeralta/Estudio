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
  prestar<T>(data: T): void;
  devolver<T>(data: T): void;
  reservar<T>(data: T): void;
}

interface IAccionesBibliotecario{
  prestados(): void;
  disponibles(): void;
  reservados(): void;
}

class Cliente implements IAccionesCliente{
  constructor(
    private nombre: string, 
    private edad: number, 
    private nacionalidad: string)
    { }

    private prestamos: Array<any> = []

    prestar<T>(data: T): void {
      // prestar
    }

    devolver<T>(data: T): void {
      // devolver
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

class Bibliotecario {
}

// Modelo de guardado

type Libro = {
  id: number;
  titulo: string;
  autor: string;
}

// Clase consumo

class App {

}