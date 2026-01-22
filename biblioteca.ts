// Praticar la abstracion de como realizar sistema de gestion de prestamo para una biblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de prestamo para una biblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el INVENTARIO

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface IAccion<T>{
    guardar(some: any): any;
    eliminar(id: any): any;
    actualizar(some: any): any;
    mostrar(): T[];
}

// ------------------------------------------------------

// EN MEMORIA RAM
class Memoria<T> implements IAccion<T>{
    private memoria: T[] = []

    guardar(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
          return false;
        }

        this.memoria.push(some)
        return true;
        }

    eliminar(id: any) 
      {const index = this.memoria.findIndex((item: any) => item.id === id);

      if (index !== -1) {
        this.memoria.splice(index, 1);
          }}

    actualizar(some: any): boolean {
      const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index === -1) {
          return false;
        }

        this.memoria[index] = some;
        return true;
          }

    mostrar(){
        return this.memoria
        }
}

// EN BASE DE DATOS
class RepositoryDB<T extends { id: string }> implements IAccion<T> {

  guardar(algo: T): boolean {
    // INSERT INTO tabla ...
    return true;
  }

  eliminar(id: string): void {
    // DELETE FROM tabla WHERE id = ?
  }

  actualizar(algo: T): boolean {
    // UPDATE tabla SET ...
    return true;
  }

  mostrar(): T[] {
    // SELECT * FROM tabla
    return [];
  }
}

type Libro = {
  id: string
  titulo: string
  autor: string
  disponible: boolean
}

type Estudiante = {
  id: string
  nombre: string;
  identificacion: string
  grado: string
}

class ServicioLibro{
    constructor(private memoria: Memoria<Libro>){}
    
    register(libro: Libro): boolean {
      return this.memoria.guardar(libro)
    }

    delete(id: string): void{
      this.memoria.eliminar(id)
    }

    update(libro: Libro): boolean {
      return this.memoria.actualizar(libro);
      }

    getAll(){
      return this.memoria.mostrar()
    }
}

class ServicioEstudiante {
  constructor(private memoria: Memoria<Estudiante>){}

  register(estudiante: Estudiante): boolean {
      return this.memoria.guardar(estudiante)
       
    }

  delete(id: string): void{
      this.memoria.eliminar(id)
    }

  update(estudiante: Estudiante): boolean {
    return this.memoria.actualizar(estudiante);
  }

  getAll(){
      return this.memoria.mostrar()
    }
}

class ServicioPrestamo {

  prestamos: Array<any> = [];

  prestar(idLibro: string, idCliente: string): boolean {
      this.prestamos.push({idLibro,idCliente})
      return true;
    }

  devolver(idLibro: string): boolean {
    const prestamoIndex = this.prestamos.findIndex(prestado => prestado.idLibro === idLibro);

    if (prestamoIndex === -1) 
      return false;

    this.prestamos.splice(prestamoIndex, 1);

    return true;
    }

}

class MenuOpcion {
  static REGISTRAR_ESTUDIANTE = 1;
  static ELIMINAR_ESTUDIANTE = 2;
  static VER_ESTUDIANTES = 3;
  static ACTUALIZAR_ESTUDIANTE = 4;

  static REGISTRAR_LIBRO = 5;
  static ELIMINAR_LIBRO = 6;
  static VER_LIBROS = 7;
  static ACTUALIZAR_LIBRO = 8;

  static PRESTAR_LIBRO = 9;
  static DEVOLVER_LIBRO = 10;

  static SALIR = 0;
}


class MenuAccion {
  constructor(
    private servicioCliente: ServicioEstudiante, // || ServicioProfesor
    private servicioLibro: ServicioLibro,
    private servicioPrestamo: ServicioPrestamo
  ) {}

  ejecutar(opcion: number): boolean {
    switch (opcion) {
      case MenuOpcion.REGISTRAR_ESTUDIANTE:
        this.registrarEstudiante();
        this.pause();
        break;
      
      case MenuOpcion.ELIMINAR_ESTUDIANTE:
        this.eliminarEstudiante();
        this.pause();
        break

      case MenuOpcion.VER_ESTUDIANTES:
        console.table(this.servicioCliente.getAll());
        this.pause();
        break;

      case MenuOpcion.ACTUALIZAR_ESTUDIANTE:
        this.actualizarEstudiante()
        this.pause();
        break;

      case MenuOpcion.REGISTRAR_LIBRO:
        this.registrarLibro();
        this.pause();
        break;
      
      case MenuOpcion.ELIMINAR_LIBRO:
        this.elmiminarLibro();
        this.pause();
        break

      case MenuOpcion.VER_LIBROS:
        this.mostrarLibros();
        this.pause();
        break;

      
      case MenuOpcion.ACTUALIZAR_LIBRO:
        this.actualizarlibro();
        this.pause();
        break;

      case MenuOpcion.PRESTAR_LIBRO:
        this.prestarLibro();
        this.pause();
        break;

      case MenuOpcion.DEVOLVER_LIBRO:
        this.devolverLibro();
        this.pause();
        break;

      case MenuOpcion.SALIR:
        return false;

      default:
        console.log("Opción inválida");
    }

    return true;
  }

  private registrarEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiante: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    }
    
    const estudianteregistrado = this.servicioCliente.register(estudiante);

    if (estudianteregistrado) {
      console.log("Estudiante registrado");
      } else {
      console.log("El estudiante ya existe con este ID");
      }
  }

  private eliminarEstudiante(){
    const id = String(prompt("ID: "));
    this.servicioCliente.delete(id)
    console.log("Estudiante Eliminado")
  }

  private actualizarEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiantexistente: Estudiante = {
    id: id,
    nombre: nombre,
    identificacion: identificacion,
    grado: grado
    };

    const estudianteactualizado = this.servicioCliente.update(estudiantexistente);

    if (estudianteactualizado) {
      console.log("Libro actualizado");
      } else {
      console.log("No existe un libro con ese ID");
      }
    }
  
  private registrarLibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const libro: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    }

    const libroregistrado = this.servicioLibro.register(libro);
    if (libroregistrado) {
      console.log("Estudiante registrado");
      } else {
      console.log("El estudiante ya existe con este ID");
      }
  }

  private elmiminarLibro(){
    const idLibro = String(prompt("ID Libro: "));
    this.servicioLibro.delete(idLibro)
  }

  private actualizarlibro() {
  const id = String(prompt("ID Libro: "));
  const titulo = String(prompt("Título: "));
  const autor = String(prompt("Autor: "));

  const libroexistente: Libro = {
    id: id,
    titulo: titulo,
    autor: autor,
    disponible: true
  };

  const libroactualizado = this.servicioLibro.update(libroexistente);

  if (libroactualizado) {
    console.log("Libro actualizado");
    } else {
    console.log("No existe un libro con ese ID");
    }
  }

  private mostrarLibros(): void {
  const libros = this.servicioLibro.getAll();

  const librosVista = libros.map(libro => ({
    id: libro.id,
    titulo: libro.titulo,
    autor: libro.autor,
    disponible: libro.disponible ? "Sí" : "No"
  }));

  console.table(librosVista); 
  }

  private prestarLibro() {
  const idLibro = String(prompt("ID Libro: "));
  const idEstudiante = String(prompt("ID Estudiante: "));

  const libros = this.servicioLibro.getAll();
  const clientes = this.servicioCliente.getAll();

  const libro = libros.find(librop => librop.id === idLibro);
  if (!libro) {
    console.log("No se pudo prestar: el libro no existe");
    return;
  }

  if (!libro.disponible) {
    console.log("No se pudo prestar: el libro no está disponible");
    return;
  }

  const cliente = clientes.find(estudiantep => estudiantep.id === idEstudiante);
  if (!cliente) {
    console.log("No se pudo prestar: el estudiante no existe");
    return;
  }

  libro.disponible = false;

  const ok = this.servicioPrestamo.prestar(idLibro, idEstudiante);

  console.log(
    ok ? "Préstamo exitoso" : "No se pudo prestar"
  );
}

  private devolverLibro() {
    const idLibro = String(prompt("ID Libro: "));
    const ok = this.servicioPrestamo.devolver(idLibro);

    const libros = this.servicioLibro.getAll();
    const libro = libros.find(book => book.id === idLibro);

    if (!libro){
      console.log("No se pudo devolver, No esxite el libro")
      return;
    }   

    libro.disponible = true;
      console.log(ok ? "Libro devuelto" : "No se pudo devolver");
    }

  private pause() {
    console.log("\nPresiona ENTER para continuar...");
    prompt("");
  }
}

class ConsoleView {
  mensaje(): void {
    const opciones: string[] = [
      "1. Registrar Estudiante",
      "2. Eliminar Estudiante",
      "3. Ver Estudiantes",
      "4. Actualizar Estudiante",
      "5. Registrar Libro",
      "6. Eliminar Libro",
      "7. Ver Libros",
      "8. Actualizar Libros",
      "9. Prestar Libro",
      "10. Devolver Libro",
      "0. Salir"
    ];

    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }
}

class App{
  run(): void{
  
  let continuar = true;

  while (continuar) {
    view.mensaje();
    const opcion = Number(prompt("Seleccione opción: "));
    continuar = menu.ejecutar(opcion);
    }
  }
}

const memoriaLibro = new Memoria<Libro>();
const memoriaEstudiante = new Memoria<Estudiante>();

const servicioLibro = new ServicioLibro(memoriaLibro);
const servicioCliente = new ServicioEstudiante(memoriaEstudiante);

const servicioPrestamo = new ServicioPrestamo();

const view = new ConsoleView();
const menu = new MenuAccion(servicioCliente, servicioLibro, servicioPrestamo);

const app = new App()
app.run()


//--------------------------------
//PROBANDO LOS PRESTAMOS

// const memoriaLibro = new Memoria<Libro>();
// const memoriaEstudiante = new Memoria<Estudiante>();

// const servicioLibro = new ServicioLibro(memoriaLibro);
// const servicioCliente = new ServicioEstudiante(memoriaEstudiante);

// const servicioPrestamo = new ServicioPrestamo(servicioLibro,servicioCliente);

// servicioLibro.register("L1", "1984", "Orwell");
// servicioLibro.register("L2", "Harry Potter", "J. K. Rowling")
// servicioCliente.register("E1", "Juan", "123", "11");

// // SI SE PUEDE PRESTAR
// console.log(servicioPrestamo.prestar("L1", "E1")); // true
// console.log(servicioPrestamo.prestar("L2", "E1")); // TRUE
// console.log(servicioPrestamo.devolver("L1"));      // true

// console.log(servicioPrestamo.getAll());


//---------------------------------------
// PROBANDO POR LOS ESTUDIANTES
//const memoriasitorioestudiante = new Memoria<Estudiante>
//const servicioestudiante = new ServicioEstudiante(memoriasitorioestudiante)

//servicioestudiante.register("1","Sara","1132456789","11")
//servicioestudiante.register("2","Laura","12356789","11")

//YA SE PUEDE ELMINAR POR ID
//servicioestudiante.delete("2")
//console.log(servicioestudiante.getAll())

// YA SE PUEDE ACTUALIZAR POR EL ID
//servicioestudiante.update("2","Laura","1235678964573","11")
//console.log(servicioestudiante.getAll())

//-----------------------------------------
//PROBANDO POR EL INVENTARIO DE LIBROS EN LA BIBLIOTECA
//const memoriasitoriobiblioteca = new Memoria<Libro>
//const serviciolibro = new ServicioLibro(memoriasitoriobiblioteca)

// YA SE PUEDE REGISTRAR
//serviciolibro.register("1", "IT", "Sthephen King")
//console.log(memoriasitoriobiblioteca.mostrar())

//YA SE PUEDE ELMINAR POR ID
//serviciolibro.delete("1")
//console.log(memoriasitoriobiblioteca.mostrar())

// YA SE PUEDE ACTUALIZAR POR EL ID
//serviciolibro.update("1", "IT (Edición Especial)", "Stephen King")
//console.log(serviciolibro.getAll())




// ACA SE IMPLEMENTO LA INTERFACE DE memoriaSITORIO


//class ServicioLibro {
//    constructor(private memoria: Memoria<Libro>)

//    register(id: string, title:string, author: string) {
//        const book = {
//            id,
//            title,
//            author,
//            available: true
//        }
    
    // eliminar(id: string): void{
    // this.memoriasitory.guardar(book)}

    //getById(id:string): Book | null {
    // return this.memoriasitory.getById(id)}

    //getAll(): Book[]{
    // return this.memoriasitory.getAll()}

//    prestar(book: Book): void{
//        book.available = false;
//    }
    // this.memoriasitory.update(book)
    //}

    // devolver(book: Book): void{
    // book.available = true;
    //  this.memoriasitory.update(book)}
    

//    }

// actualizar(criterio: (item: T) => boolean, nuevo: T): void {
//     const index = this.memoria.findIndex(criterio);

//     if (index !== -1) {
//       this.memoria[index] = nuevo;}
//       }


// const libro1: Libro = {
//   id: 1,
//   titulo: "Juego de tronos",
//   autor: "George R.R Martin",
//   disponible: true
// }

// const libro2: Libro = {
//   id: 2,
//   titulo: "Harry Potter",
//   autor: "J. K. Rowling",
//   disponible: true
// }

// const libro3: Libro = {
//   id: 3,
//   titulo: "Don Quijote",
//   autor: "Cervantes",
//   disponible: true
// }

// const libro4: Libro = {
//   id: 4,
//   titulo: "Cien años de soledad",
//   autor: "Gabriel García Márquez",
//   disponible: true
// }

// const libro5: Libro = {
//   id: 5,
//   titulo: "Orgullo y prejuicio",
//   autor: "Jane Austen",
//   disponible: true
// }

// const Libros = [libro1, libro2, libro3, libro4, libro5]

// type Profesor = {
//   id: string
//   nombre: string;
//   identificacion: string
//   curso: string
// }

// class ServicioProfesor{
//   constructor(private memoria: Memoria<Profesor>){}

//   register(profesor: Profesor): boolean {
//       return this.memoria.guardar(profesor)
       
//     }

//   delete(id: string): void{
//       this.memoria.eliminar(id)
//     }

//   update(profesor: Profesor): boolean {
//     return this.memoria.actualizar(profesor);
//   }

//   getAll(){
//       return this.memoria.mostrar()
//     }
// }