// Clase Libro: aplica encapsulamiento
class Libro {
  private titulo: string;
  private autor: string;
  private disponible: boolean;

  constructor(titulo: string, autor: string) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponible = true;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public isDisponible(): boolean {
    return this.disponible;
  }

  public prestar(): void {
    if (this.disponible) {
      this.disponible = false;
      console.log(`📚 El libro "${this.titulo}" ha sido prestado.`);
    } else {
      console.log(`❌ El libro "${this.titulo}" no está disponible.`);
    }
  }

  public devolver(): void {
    this.disponible = true;
    console.log(`✅ El libro "${this.titulo}" ha sido devuelto.`);
  }
}

// Clase base Usuario (herencia base)
class Usuario {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public mostrarInfo(): void {
    console.log(`👤 Usuario: ${this.nombre}`);
  }
}

// Clase Cliente que hereda de Usuario y aplica polimorfismo
class Cliente extends Usuario {
  private librosPrestados: Libro[];

  constructor(nombre: string) {
    super(nombre);
    this.librosPrestados = [];
  }

  public prestarLibro(libro: Libro): void {
    if (libro.isDisponible()) {
      libro.prestar();
      this.librosPrestados.push(libro);
    } else {
      console.log(`⚠️ ${this.nombre} no puede prestar "${libro.getTitulo()}" porque no está disponible.`);
    }
  }

  public devolverLibro(libro: Libro): void {
    const index = this.librosPrestados.indexOf(libro);
    if (index !== -1) {
      libro.devolver();
      this.librosPrestados.splice(index, 1);
    } else {
      console.log(`⚠️ ${this.nombre} no tiene prestado "${libro.getTitulo()}".`);
    }
  }

  // Polimorfismo: redefinimos mostrarInfo()
  public override mostrarInfo(): void {
    console.log(`👤 Cliente: ${this.nombre} | Libros prestados: ${this.librosPrestados.length}`);
  }
}

// Programa principal
const libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez");
const libro2 = new Libro("El Principito", "Antoine de Saint-Exupéry");

const cliente1 = new Cliente("Randolph Peralta");

cliente1.mostrarInfo();
cliente1.prestarLibro(libro1);
cliente1.prestarLibro(libro2);
cliente1.devolverLibro(libro1);
cliente1.mostrarInfo();
