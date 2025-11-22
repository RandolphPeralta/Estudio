// 1. interface 

interface IPrestable {
    prestar(): void;
    devolver(): void;
}

// 2. abstract clase disponibilidad

class EstadoPrestamo {
  private disponible: boolean = true;

  public prestar(): void {
    if (this.disponible) {
      this.disponible = false;
      console.log("📕 El recurso ha sido prestado.");
    } else {
      console.log("❌ El recurso no está disponible.");
    }
  }

  public devolver(): void {
    this.disponible = true;
    console.log("📗 El recurso ha sido devuelto.");
  }

  public estaDisponible(): boolean {
    return this.disponible;
  }
}

// 3. Clase diseño del libro

class Libro implements IPrestable{
    private titulo: string
    private autor: string
    private codigo: number
    private estado: EstadoPrestamo

    constructor(titulo:string, autor: string, codigo:number, estado: EstadoPrestamo){
        this.titulo = titulo
        this.autor = autor
        this.codigo = codigo
        this.estado = new EstadoPrestamo()
    }

    prestar(): void {
    this.estado.prestar();
  }

  devolver(): void {
    this.estado.devolver();
  }

  estaDisponible(): boolean {
    return this.estado.estaDisponible();
  }
}

// 3. abstract Clase de Usuario

abstract class Usuario {
    private nombre: string

    constructor (nombre: string){
        this.nombre = nombre
    }
}

// 4. clase de estudiante

class Estudiante {
    private LibroPrestado: Libro[] = []

    PrestarLibro(libro: Libro){
            this.LibroPrestado.push(libro)
        
    }
}