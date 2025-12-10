// Praticar la abstracion de como realizar un sistema de biblioteca
// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, profesor  o directivo, para prestar, devolver, reservar, y ver si no esta sancionado
// o bibliotecario (empleado) para mostrar el registro de prestados, reservados, disponibles
// Para el libro mostrar la disponibilidad

interface Acciones {
  registro(): void;
  prestar(): void;
  devolver(): void;
  reservar(): void;
}

class Estudiante implements Acciones {
  registro(){
  // registro de estudiante
  }

  prestar(): void {
    // prestar como estudiante
  }

  devolver(): void {
    // devolver como estudiante
  }

  reservar(): void {
    // reservar como estudiante
  }
}

class Profesor implements Acciones{
  registro(){
    // registro de profesor
  }

  prestar(): void{
    // prestar como profesor
  }

  devolver(): void {
    // devolver como profesor
  }

  reservar(): void {
    // reservar como profesor
  }
}

class Directivo implements Acciones {
  registro(){
    // registro directivo
  }

  prestar(): void{
    // prestar como directivo
  }

  devolver(): void {
    // devolver como directivo
  }

  reservar(): void {
    // reservar como directivo
  }
}

class Bibliotecario {

}
