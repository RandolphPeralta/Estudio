// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar, y ver si no esta sancionado
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el libro mostrar la disponibilidad

interface SistemaRegistroBiblioteca {
  registro(): void;
}

interface Iprestable {
  prestar(): void;
  devolver(): void;
  reservar(): void;
  Disponibilidad(): void;
}

class Estudiante implements SistemaRegistroBiblioteca {
  registro(){
  // registro de estudiante
  }
}

class Profesor implements SistemaRegistroBiblioteca{
  registro(){
    // registro de profesor
  }
}

class Directivo implements SistemaRegistroBiblioteca {
  registro(){
    // registro directivo
  }
}

class Bibliotecario implements SistemaRegistroBiblioteca {
  registro(){
    // registro de bibliotecario
  }
}
