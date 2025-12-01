// 1. Interfaces
interface IIdentificable {
  getId(): number;
}

// 2. Clase Libro 
class Libro implements IIdentificable {
  private id: number;
  private titulo: string;
  private autor: string;
  private disponible: boolean = true;

  constructor(id: number, titulo: string, autor: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
  }

  public getId(): number {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getAutor(): string {
    return this.autor
  }

  public prestar(): void {
      this.disponible = false;
  }

  public devolver(): void {
    this.disponible = true;
  }

  public estaDisponible(): boolean {
    return this.disponible;
  }
}

// 4. Clase abstracta Usuario — base para herencia
abstract class Usuario {
  private nombre: string; // AHORA PRIVATE

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Encapsulamiento mediante getter
  public getNombre(): string {
    return this.nombre;
  }

}

// =============================================================
// 5. Clase Cliente que hereda de Usuario y aplica POLIMORFISMO
// =============================================================
class Cliente extends Usuario {
  private prestamos: Libro[] = [];

  public mostrarInfo(): void {
    console.log(
      `👤 Cliente: ${this.getNombre()}, Libros prestados: ${this.prestamos.length}`
    );
  }

  public prestarLibro(libro: Libro): void {
    if (libro.estaDisponible()) {
      libro.prestar();
      this.prestamos.push(libro);
    } else {
      console.log(`⚠️ ${this.getNombre()} no puede prestar "${libro.getTitulo()}".`);
    }
  }

  public devolverLibro(libro: Libro): void {
    const index = this.prestamos.indexOf(libro);

    if (index !== -1) {
      libro.devolver();
      this.prestamos.splice(index, 1);
    } else {
      console.log(`⚠️ ${this.getNombre()} no tenía prestado "${libro.getTitulo()}".`);
    }
  }
}

// =============================================================
// 6. Programa principal (ejemplo de uso)
// =============================================================
const libro1 = new Libro(1, "Cien Años de Soledad", "Gabo");
const libro2 = new Libro(2, "El Principito", "Saint-Exupéry");

const cliente = new Cliente("Randolph Peralta");

cliente.mostrarInfo();

cliente.prestarLibro(libro1);
cliente.prestarLibro(libro2);
cliente.devolverLibro(libro1);

cliente.mostrarInfo();
