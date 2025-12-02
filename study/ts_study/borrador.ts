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
    //Mostrar la informacion del cliente
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

const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
const libro3 = new Libro(3, "El Quijote", "Cervantes");

const catalogo1 = [libro1, libro2, libro3]

const bibliotecario = new Bibliotecario("Ana", catalogo1);

const cliente = new Cliente("Randolph");
cliente.prestarLibro(libro2);

console.log("Disponibles:");
console.log(bibliotecario.obtenerDisponibles())//.map(l => l.getTitulo()));

console.log("Prestados:");
console.log(bibliotecario.obtenerPrestados())//.map(l => l.getTitulo()));


