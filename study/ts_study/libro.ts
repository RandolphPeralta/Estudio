// Interfaces modificadas para usar return en lugar de console.log
interface Prestable {
    prestar(): void; 
    devolver(): void;
    estaDisponible(): boolean;
}

interface Identificable {
    getId(): number;
}

// Clase que aplica COMPOSICIÓN - modificada para usar return
class EstadoPrestamo {
    private disponible: boolean = true;

    public prestar(): void {
        if (this.disponible) {
            this.disponible = false;
            console.log("📕 El recurso ha sido prestado")
        } else {
            console.log("❌ El recurso no está disponible")
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

// Clase Libro usando Composicion e interfaces

class Libro implements Prestable, Identificable {
    private id: number;
    private titulo: string;
    private autor: string;
    private estado: EstadoPrestamo;

  constructor(id: number, titulo: string, autor: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.estado = new EstadoPrestamo(); // COMPOSICIÓN
  }

  getId(): number {
    return this.id;
  }

  getTitulo(): string {
    return this.titulo;
  }

  getAutor(): string {
    return this.autor
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

// Clase abstracta Usuario - base para herencia
abstract class Usuario {
  private nombre: string;  // ahora es PRIVATE

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Getter para que las clases hijas puedan leer el nombre
  public getNombre(): string {
    return this.nombre;
  }

  abstract mostrarInfo(): void;
}

// Clase Cliente que hereda de Usuario y aplica polimorfismo
class Cliente extends Usuario {
  private prestamos: Libro[] = [];

  mostrarInfo(): void {
    console.log(
      `👤 Cliente: ${this.getNombre()}, Libros prestados: ${this.prestamos.length}`
    );
  }

  prestarLibro(libro: Libro): void {
    if (libro.estaDisponible()) {
      libro.prestar();
      this.prestamos.push(libro);
    } else {
      console.log(
        `⚠️ ${this.getNombre()} no puede prestar "${libro.getTitulo()}".`
      );
    }
  }

  devolverLibro(libro: Libro): void {
    const index = this.prestamos.indexOf(libro);

    if (index !== -1) {
      libro.devolver();
      this.prestamos.splice(index, 1);
    } else {
      console.log(
        `⚠️ ${this.getNombre()} no tenía prestado "${libro.getTitulo()}".`
      );
    }
  }
}

const libro1 = new Libro(1, "Cien Años de Soledad", "Gabo");
const libro2 = new Libro(2, "El Principito", "Saint-Exupéry");

const cliente = new Cliente("Randolph Peralta");

cliente.mostrarInfo();

cliente.prestarLibro(libro1);
cliente.prestarLibro(libro2);
cliente.devolverLibro(libro1);

cliente.mostrarInfo();