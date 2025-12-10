// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar, y ver si no esta sancionado
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el libro mostrar la disponibilidad

interface Acciones {
  registro<T>(data: T): boolean;
  prestar<T>(data: T): void;
  devolver<T>(data: T): void;
  reservar<T>(data: T): void;
}

// interface RegistroBiblioteca {}

class Estudiante {
  
}

class Profesor {
 
}

class Directivo {

}

class Bibliotecario {

}
