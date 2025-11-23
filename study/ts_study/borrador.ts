// 1. interface 

interface IPrestable {
    prestar(): void;
    devolver(): void;
    estaDisponible(): boolean;
}

// 2. abstract clase disponibilidad

class EstadoPrestamo implements IPrestable{
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

    constructor(titulo:string, autor: string, codigo:number){
        this.titulo = titulo
        this.autor = autor
        this.codigo = codigo
        this.estado = new EstadoPrestamo()
    }
  
  getTitulo(){
    return this.titulo
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
    protected nombre: string

    constructor (nombre: string){
        this.nombre = nombre
    }

}

// 4. clase de estudiante

class Estudiante extends Usuario{
    private prestamos: Libro[] = []

    mostrarInfo(): void {
    console.log(
      `👤 Cliente: ${this.nombre}, Libros prestados: ${this.prestamos.length}`
    );
  }

  prestarLibro(libro: Libro): void {
    if (libro.estaDisponible()) {
      libro.prestar();
      this.prestamos.push(libro);
    } else {
      console.log(`⚠️ ${this.nombre} no puede prestar "${libro.getTitulo()}".`);
    }
  }

  devolverLibro(libro: Libro): void {
    const index = this.prestamos.indexOf(libro);

    if (index !== -1) {
      libro.devolver();
      this.prestamos.splice(index, 1);
    } else {
      console.log(`⚠️ ${this.nombre} no tenía prestado "${libro.getTitulo()}".`);
    }
  }
}


const libro1 = new Libro("Cien Años de Soledad", "Gabo",1);
// const libro2 = new Libro( "El Principito", "Saint-Exupéry",2);

const cliente = new Estudiante("Randolph Peralta");

cliente.mostrarInfo();

libro1.estaDisponible();

// cliente.prestarLibro(libro1);
// cliente.prestarLibro(libro2);
// cliente.devolverLibro(libro1);

// cliente.mostrarInfo();