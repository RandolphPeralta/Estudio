abstract class Database {
  abstract create<T>(data: T): void
}

class MSQL extends Database{
  create<T>(data: T){
    //
  }
}

//------------------------------

interface IPrestable {
  prestar(): void;
  devolver(): void;
  estaDisponible(): boolean;
}

class Libro implements IPrestable{
  private id: number;
  private titulo: string;
  private autor: string;
  private disponible: boolean = true;

  constructor(id: number, titulo: string, autor: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
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

abstract class Identificacion {
  private nombre: string;
  private cedula: string;
  private nacionalidad: string;

  constructor(nombre: string, cedula: string, nacionalidad: string){
    this.nombre = nombre
    this.cedula = cedula
    this.nacionalidad = nacionalidad
  }
}

class CPrestable {
  prestamos: Libro[] = [];

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

class Estudiante extends Identificacion{}

class Profesor extends Identificacion{}

class Directivo extends Identificacion{}


class Bibliotecario extends Identificacion{
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

// import * as promptSync from "prompt-sync";
// const prompt = (promptSync as any)();

// class App {
//   private bibliotecario: Bibliotecario = new Bibliotecario("Sin asignar");
//   private cliente: Cliente = new Cliente("Sin asignar");

//   private clientes: Cliente[] = [];
//   private bibliotecarios: Bibliotecario[] = [];

//   private prompt = prompt;

//   public iniciar(): void {
//     console.clear();
//     console.log("📚 SISTEMA DE BIBLIOTECA");
//     const resp = this.prompt("¿Quién eres? (1) Cliente  (2) Bibliotecario 👉 ");

//     if (resp === "1") {
//       console.log("\n👤 Antes de continuar, debes identificarte como Cliente.");
//       return this.opcionCambiaroCrearCliente();
//     }

//     if (resp === "2") {
//       console.log("\n📘 Antes de continuar, debes identificarte como Bibliotecario.");
//       return this.opcionCambiaroCrearBibliotecario();
//     }

//     return this.cerrar("Opción no válida.");
//   }

//   private menuCliente(): void {
//     console.clear();
//     console.log(`👤 Cliente: ${this.cliente.getNombre()}
// 1. Ver libros disponibles
// 2. Prestar libro
// 3. Devolver libro
// 4. Cambiar/Crear Cliente
// 5. Volver al menú inicio
// 6. Salir`);

//     const op = this.prompt("👉 Selecciona una opción: ");

//     switch (op) {
//       case "1":
//         this.mostrarDisponibles();
//         this.pausa();
//         return this.menuCliente();
//       case "2":
//         return this.opcionPrestar();
//       case "3":
//         return this.opcionDevolver();
//       case "4":
//         return this.opcionCambiaroCrearCliente();
//       case "5":
//         return this.iniciar();
//       case "6":
//         return this.cerrar("👋 Saliendo...");
//       default:
//         return this.menuCliente();
//     }
//   }

//   private menuBibliotecario(): void {
//     console.clear();
//     console.log(`📘 Bibliotecario: ${this.bibliotecario.getNombre()}
// 1. Ver libros disponibles
// 2. Ver libros prestados
// 3. Agregar libro al catálogo
// 4. Cambiar/Crear Bibliotecario
// 5. Volver a inicio
// 6. Salir`);

//     const op = this.prompt("👉 Selecciona una opción: ");

//     switch (op) {
//       case "1":
//         this.mostrarDisponibles();
//         this.pausa();
//         return this.menuBibliotecario();
//       case "2":
//         this.mostrarPrestados();
//         this.pausa();
//         return this.menuBibliotecario();
//       case "3":
//         return this.opcionAgregarLibro();
//       case "4":
//         return this.opcionCambiaroCrearBibliotecario();
//       case "5":
//         return this.iniciar();
//       case "6":
//         return this.cerrar("👋 Saliendo...");
//       default:
//         return this.menuBibliotecario();
//     }
//   }

//   private opcionPrestar(): void {
//     const disponibles = this.bibliotecario.obtenerDisponibles();
//     if (disponibles.length === 0) {
//       console.log("❌ No hay libros disponibles");
//       this.pausa();
//       return this.menuCliente();
//     }

//     console.log("\n📘 Libros disponibles:");
//     disponibles.forEach(l => console.log(`${l.getId()}. ${l.getTitulo()}`));

//     const id = Number(this.prompt("👉 Ingresa el ID del libro a prestar: "));
//     const libro = disponibles.find(l => l.getId() === id);

//     if (!libro) console.log("❌ ID no válido.");
//     else {
//       this.cliente.prestarLibro(libro);
//       console.log(`✔ Has prestado: ${libro.getTitulo()}`);
//     }

//     this.pausa();
//     return this.menuCliente();
//   }

//   private opcionDevolver(): void {
//     const prestados = this.bibliotecario.obtenerPrestados();

//     if (prestados.length === 0) {
//       console.log("❌ No tienes libros prestados.");
//       this.pausa();
//       return this.menuCliente();
//     }

//     console.log("\n📕 Libros prestados:");
//     prestados.forEach(l => console.log(`${l.getId()}. ${l.getTitulo()}`));

//     const id = Number(this.prompt("👉 Ingresa el ID del libro a devolver: "));
//     const libro = prestados.find(l => l.getId() === id);

//     if (!libro) console.log("❌ ID no válido.");
//     else {
//       this.cliente.devolverLibro(libro);
//       console.log(`✔ Has devuelto: ${libro.getTitulo()}`);
//     }

//     this.pausa();
//     return this.menuCliente();
//   }

//   private opcionAgregarLibro(): void {
//     console.log("📗 Agregar libro al catálogo");

//     const id = Number(this.prompt("👉 Ingresa el ID del libro: "));
//     const titulo = this.prompt("👉 Ingresa el título del libro: ");
//     const autor = this.prompt("👉 Ingresa el autor del libro: ");

//     const nuevoLibro = new Libro(id, titulo, autor);

//     const catalogo = this.bibliotecario.getCatalogo();
//     catalogo.push(nuevoLibro);
//     this.bibliotecario.setCatalogo(catalogo);

//     console.log(`✔ Libro añadido: ${titulo} (${autor})`);

//     this.pausa();
//     return this.menuBibliotecario();
//   }

//   private opcionCambiaroCrearCliente(): void {
//     const nombre = this.prompt("👉 Ingresa el nombre del nuevo cliente: ");

//     const existente = this.clientes.find(c => c.getNombre() === nombre);

//     if (existente) {
//       console.log(`✔ Cliente existente seleccionado: ${nombre}`);
//       this.cliente = existente;
//     } else {
//       const nuevo = new Cliente(nombre);
//       this.clientes.push(nuevo);
//       this.cliente = nuevo;
//       console.log(`✔ Cliente creado: ${nombre}`);
//     }

//     this.pausa();
//     return this.menuCliente();
//   }

//   private opcionCambiaroCrearBibliotecario(): void {
//     const nombre = this.prompt("👉 Ingresa el nombre del nuevo bibliotecario: ");

//     const existente = this.bibliotecarios.find(b => b.getNombre() === nombre);

//     if (existente) {
//       console.log(`✔ Bibliotecario existente seleccionado: ${nombre}`);
//       this.bibliotecario = existente;
//     } else {
//       const nuevo = new Bibliotecario(nombre);
//       nuevo.setCatalogo(this.bibliotecario.getCatalogo());
//       this.bibliotecarios.push(nuevo);
//       this.bibliotecario = nuevo;
//       console.log(`✔ Bibliotecario creado: ${nombre}`);
//     }

//     this.pausa();
//     return this.menuBibliotecario();
//   }

//   private mostrarDisponibles(): void {
//     const disponibles = this.bibliotecario.obtenerDisponibles();
//     console.log("📘 Libros disponibles:");
//     disponibles.forEach(l => console.log(`- ${l.getTitulo()} (${l.getAutor()})`));
//   }

//   private mostrarPrestados(): void {
//     const prestados = this.bibliotecario.obtenerPrestados();
//     console.log("📕 Libros prestados:");
//     prestados.forEach(l => console.log(`- ${l.getTitulo()} (${l.getAutor()})`));
//   }

//   private pausa(): void {
//     this.prompt("\nPresiona ENTER para continuar...");
//   }

//   private cerrar(msg: string): void {
//     console.log(msg);
//     process.exit(0);
//   }
// }


// const libro1 = new Libro(1, "Clean Code", "Robert C. Martin");
// const libro2 = new Libro(2, "Harry Potter", "J. K. Rowling");
// const libro3 = new Libro(3, "El Quijote", "Cervantes");

// const bibliotecario1 = new Bibliotecario("Ana");
// bibliotecario1.setCatalogo([libro1, libro2, libro3]);

// const cliente1 = new Cliente("Randolph");

// const app = new App();
// app.setBibliotecario(bibliotecario1);
// app.setCliente(cliente1);

// app.iniciar();
