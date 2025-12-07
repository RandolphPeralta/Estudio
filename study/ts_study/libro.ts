import * as readline from "readline";

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

abstract class Usuario implements IIdentificableUsuario {
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre:string){
    this.nombre = nombre
  }
}

class Cliente extends Usuario {
  private prestamos: Libro[] = [];

  public prestarLibro(libro: Libro): void {
    if (libro.estaDisponible()) {
      libro.prestar()
      this.prestamos.push(libro) 
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
    return this.catalogo.filter(l => l.estaDisponible());
  }

  public obtenerPrestados(): Libro[] {
    return this.catalogo.filter(l => !l.estaDisponible());
  }

  public getCatalogo(): Libro[] {
    return this.catalogo;
  }
}

//------------------------------------------------------------------

class App {
  private bibliotecario: Bibliotecario = new Bibliotecario("Sin asignar");
  private cliente: Cliente = new Cliente("Sin asignar");

  private clientes: Cliente[] = [];
  private bibliotecarios: Bibliotecario[] = [];


  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  public setBibliotecario(b: Bibliotecario): void {
    this.bibliotecario = b;
  }

  public setCliente(c: Cliente): void {
    this.cliente = c;
  }

  public iniciar(): void {
  console.clear();
  console.log("📚 SISTEMA DE BIBLIOTECA");
  this.rl.question("¿Quién eres? (1) Cliente  (2) Bibliotecario 👉 ", (resp) => {

    if (resp === "1") {
      console.log("\n👤 Antes de continuar, debes identificarte como Cliente.");
      return this.opcionCambiarCliente();
    }

    if (resp === "2") {
      console.log("\n📘 Antes de continuar, debes identificarte como Bibliotecario.");
      return this.opcionCambiarBibliotecario();
    }

    return this.cerrar("Opción no válida.");
    });
  }
  
  private menuCliente(): void {
    console.clear();
    console.log(`👤 Cliente: ${this.cliente.getNombre()}\n1. Ver libros disponibles\n2. Prestar libro\n3. Devolver libro\n4. Cambiar/Crear Cliente\n5. Volver al menu inicio\n6. Salir`);
    this.rl.question("👉 Selecciona una opción: ", (op) => {
      switch (op) {
        case "1":
          this.mostrarDisponibles();
          return this.pausa(() => this.menuCliente());
        case "2":
          return this.opcionPrestar();
        case "3":
          return this.opcionDevolver();
        case "4":
          return this.opcionCambiarCliente();
        case "5":
          return this.iniciar();
        case "6":
          return this.cerrar("👋 Saliendo...");

        default:
          return this.menuCliente();
      }
    });
  }

  private menuBibliotecario(): void {
    console.clear();
    console.log(`📘 Bibliotecario: ${this.bibliotecario.getNombre()}\n1. Ver libros disponibles\n2. Ver libros prestados\n3. Agregar libro al catálogo\n4. Cambiar/Crear Bibliotecario\n5. Volver a inicio\n6. Salir`);
    this.rl.question("👉 Selecciona una opción: ", (op) => {
      switch (op) {
        case "1":
          this.mostrarDisponibles();
          return this.pausa(() => this.menuBibliotecario());
        case "2":
          this.mostrarPrestados();
          return this.pausa(() => this.menuBibliotecario());
        case "3":
          return this.opcionAgregarLibro();
        case "4":
          return this.opcionCambiarBibliotecario();
        case "5":
          return this.iniciar();
        case "6":
          return this.cerrar("👋 Saliendo...");
        
        default:
          return this.menuBibliotecario();

      }
    });
  }

  private opcionPrestar(): void {
    const disponibles = this.bibliotecario.obtenerDisponibles();

    if (disponibles.length === 0) {
      console.log("❌ No hay libros disponibles");
      return this.pausa(() => this.menuCliente());
    }

    console.log("\n📘 Libros disponibles para prestar:");
    disponibles.forEach(l => console.log(`${l.getId()}. ${l.getTitulo()}`));

    this.rl.question("👉 Ingresa el ID del libro a prestar: ", id => {
      const libro = disponibles.find(l => l.getId() === Number(id));
      if (!libro) {
        console.log("❌ ID no válido.");
      } else {
        this.cliente.prestarLibro(libro);
        console.log(`✔ Has prestado: ${libro.getTitulo()}`);
      }
      this.pausa(() => this.menuCliente());
    });
  }

  private opcionDevolver(): void {
    const prestados = this.bibliotecario.obtenerPrestados()
      .filter(l => !l.estaDisponible());

    if (prestados.length === 0) {
      console.log("❌ No tienes libros prestados.");
      return this.pausa(() => this.menuCliente());
    }

    console.log("\n📕 Libros prestados:");
    prestados.forEach(l => console.log(`${l.getId()}. ${l.getTitulo()}`));

    this.rl.question("👉 Ingresa el ID del libro a devolver: ", id => {
      const libro = prestados.find(l => l.getId() === Number(id));
      if (!libro) {
        console.log("❌ ID no válido.");
      } else {
        this.cliente.devolverLibro(libro);
        console.log(`✔ Has devuelto: ${libro.getTitulo()}`);
      }
      this.pausa(() => this.menuCliente());
    });
  }

  private opcionAgregarLibro(): void {
    console.log("📗 Agregar libro al catálogo");

    this.rl.question("👉 Ingresa el ID del libro: ", (idInput) => {
      const id = Number(idInput);

      this.rl.question("👉 Ingresa el título del libro: ", (titulo) => {

        this.rl.question("👉 Ingresa el autor del libro: ", (autor) => {

          const nuevoLibro = new Libro(id, titulo, autor);

          const catalogo = this.bibliotecario.getCatalogo();
          catalogo.push(nuevoLibro);
          this.bibliotecario.setCatalogo(catalogo);

          console.log(`✔ Libro añadido: ${titulo} (${autor})`);

          this.pausa(() => this.menuBibliotecario());
        });
      });
    });
  }

  private opcionCambiarCliente(): void {
  this.rl.question("👉 Ingresa el nombre del nuevo cliente: ", (nombre) => {

    const existente = this.clientes.find(c => c.getNombre() === nombre);

    if (existente) {
      console.log(`✔ Cliente existente seleccionado: ${nombre}`);
      this.cliente = existente;
    } else {
      const nuevo = new Cliente(nombre);
      this.clientes.push(nuevo);
      this.cliente = nuevo;
      console.log(`✔ Cliente creado: ${nombre}`);
    }

    this.pausa(() => this.menuCliente());
  });
  }

  private opcionCambiarBibliotecario(): void {
  this.rl.question("👉 Ingresa el nombre del nuevo bibliotecario: ", (nombre) => {

    const existente = this.bibliotecarios.find(b => b.getNombre() === nombre);

    if (existente) {
      console.log(`✔ Bibliotecario existente seleccionado: ${nombre}`);
      this.bibliotecario = existente;
    } else {
      const nuevo = new Bibliotecario(nombre);
      nuevo.setCatalogo(this.bibliotecario.getCatalogo());
      this.bibliotecarios.push(nuevo);
      this.bibliotecario = nuevo;
      console.log(`✔ Bibliotecario creado: ${nombre}`);
    }

    this.pausa(() => this.menuBibliotecario());
  });
  }

  private mostrarDisponibles(): void {
    const disponibles = this.bibliotecario.obtenerDisponibles();
    console.log("📘 Libros disponibles:");
    disponibles.forEach(l => console.log(`- ${l.getTitulo()} (${l.getAutor()})`));
  }

  private mostrarPrestados(): void {
    const prestados = this.bibliotecario.obtenerPrestados();
    console.log("📕 Libros prestados:");
    prestados.forEach(l => console.log(`- ${l.getTitulo()} (${l.getAutor()})`));
  }

  private pausa(callback: Function): void {
    this.rl.question("\nPresiona ENTER para continuar...", () => callback());
  }

  private cerrar(msg: string): void {
    console.log(msg);
    this.rl.close();
  }
}

// const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
// const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
// const libro3 = new Libro(3, "El Quijote", "Cervantes");

// const bibliotecario1 = new Bibliotecario("Ana");
// bibliotecario1.setCatalogo([libro1, libro2, libro3]);

// const cliente1 = new Cliente("Randolph");

const app = new App();
// app.setBibliotecario(bibliotecario1);
// app.setCliente(cliente1);

app.iniciar();
