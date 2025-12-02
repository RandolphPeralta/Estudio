interface IIdentificable {
  getId(): number;
  getTitulo(): string;
  getAutor(): string;
}

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

abstract class Usuario {
  private nombre: string; 

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }

}

class Cliente extends Usuario {
  private prestamos: Libro[] = [];

  public mostrarInfo(): void {
  }

  public prestarLibro(libro: Libro): void {
    if (libro.estaDisponible()) {
      libro.prestar();
      this.prestamos.push(libro);

    } else {

    }
  }

  public devolverLibro(libro: Libro): void {
    
    const index = this.prestamos.indexOf(libro);

    if (index !== -1) {
      libro.devolver();
      this.prestamos.splice(index, 1);

    } 
    else {
          }
  }
}

class Bibliotecario extends Usuario {
  private catalogo: Libro[] = [];

  constructor(nombre: string, catalogo: Libro[]) {
    super(nombre);
    this.catalogo = catalogo;
  }

  public obtenerDisponibles(): Libro[] {
    return this.catalogo.filter(libro => libro.estaDisponible());
  }

  public obtenerPrestados(): Libro[] {
    return this.catalogo.filter(libro => !libro.estaDisponible());
  }
}


//--------------------------------------------------------------
// Clase consumidora o app


class App {
  private bibliotecario: Bibliotecario;
  private cliente: Cliente;

  constructor(bibliotecario: Bibliotecario, cliente: Cliente) {
    this.bibliotecario = bibliotecario;
    this.cliente = cliente;
  }

  public iniciar(): void {
    this.mostrarDisponibles();
    this.mostrarPrestados();
  }

  private mostrarDisponibles(): void {
    const disponibles = this.bibliotecario.obtenerDisponibles();
    console.log("📘 Libros disponibles:");

    disponibles.forEach(libro => {
      console.log(`- ${libro.getTitulo()} (${libro.getAutor()})`);
    });
  }

  private mostrarPrestados(): void {
    const prestados = this.bibliotecario.obtenerPrestados();
    console.log("📕 Libros prestados:");

    prestados.forEach(libro => {
      console.log(`- ${libro.getTitulo()} (${libro.getAutor()})`);
    });
  }
}


const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
const libro3 = new Libro(3, "El Quijote", "Cervantes");

const catalogo1 = [libro1, libro2, libro3];

const bibliotecario = new Bibliotecario("Ana", catalogo1);

const cliente = new Cliente("Randolph");
cliente.prestarLibro(libro2); // presta Harry Potter

// Crear la app
const app = new App(bibliotecario, cliente);

// Iniciar
app.iniciar();

