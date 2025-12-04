import promptSync from 'prompt-sync';
const prompt = promptSync();

interface IIdentificableLibro {
  getId(): number;
  getTitulo(): string;
  getAutor(): string;
}

interface IIdentificableUsuario {
  getNombre(): string;
}

class Libro implements IIdentificableLibro {
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
    return this.autor;
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

abstract class Usuario implements IIdentificableUsuario{
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
    } 
  }

  public devolverLibro(libro: Libro): void {
    
    const index = this.prestamos.indexOf(libro);

    if (index !== -1) {
      libro.devolver();
      this.prestamos.splice(index, 1);
    } 
  }
}

class Bibliotecario extends Usuario {
  private catalogo: Libro[] = [];

  public setCatalogo(libros: Libro[]): void {
    this.catalogo = libros;
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

  private bibliotecario!: Bibliotecario;
  private cliente!: Cliente;

  public setBibliotecario(b: Bibliotecario): void {
    this.bibliotecario = b;
  }

  public setCliente(c: Cliente): void {
    this.cliente = c;
  }

  public iniciar(): void {
    const name = prompt("Identifiquese como Cliente (1) o Bibliotecario (2): ");
    console.log(name);
    if (name == "1"){
        const name:string = prompt("Ingrese su name")
        console.log(name)
        const cliente1 = new Cliente(name)
        cliente1.mostrarInfo()
        this.mostrarDisponibles();
        this.mostrarPrestados();
    }

    }   

  private mostrarDisponibles(): void {
    const disponibles = this.bibliotecario.obtenerDisponibles();
    console.log("📘 Libros disponibles:");
    disponibles.forEach(libro =>
      console.log(`- ${libro.getTitulo()} (${libro.getAutor()})`)
    );
  }

  private mostrarPrestados(): void {
    const prestados = this.bibliotecario.obtenerPrestados();
    console.log("📕 Libros prestados:");
    prestados.forEach(libro =>
      console.log(`- ${libro.getTitulo()} (${libro.getAutor()})`)
    );
  }
}

//----------------------------------------------------

const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
const libro3 = new Libro(3, "El Quijote", "Cervantes");

const bibliotecario1 = new Bibliotecario("Ana");
bibliotecario1.setCatalogo([libro1, libro2, libro3]);

const cliente1 = new Cliente("Randolph");
cliente1.prestarLibro(libro2); // presta Harry Potter

const app = new App();
// app.setBibliotecario(bibliotecario1);
// app.setCliente(cliente1);

app.iniciar();

