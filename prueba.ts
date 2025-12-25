// Praticar la abstracion de como realizar un sistema de prestamos en la repositoriobiblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de repositoriobiblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el INVENTARIO

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface IAccionMemoria<T>{
    guardar(some: T): void;
    eliminar(id: T): void;
    actualizar(some: T): void;
    mostrar(): T[]
}

class MemoriaCRUD<T> implements IAccionMemoria<T>{
    private memoria: T[] = []

    guardar<T>(some: any) {
        this.memoria.push(some)
    }

    eliminar(id: any) 
    {
      const index = this.memoria.findIndex(
        (item: any) => item.id === id
          );

      if (index !== -1) {
        this.memoria.splice(index, 1);
      }}

    actualizar(some: T): void {
      const index = this.memoria.findIndex(i => i === some);
      if (index !== -1) {
        this.memoria[index] = some;}
    }

    mostrar(){
        return this.memoria
      }
}

// ---------------------------------------------
type Libro = {
  id: string;
  titulo: string;
  autor: string;
  disponible: boolean
}

type Estudiante = {
  id: string
  nombre: string;
  identificacion: string
  grado: string
}

class ServicioLibro{
    constructor(private memoria: MemoriaCRUD<Libro>){}
    
    register(id: string, titulo: string, autor: string): Libro {
      const libro: Libro = {id,titulo,autor,disponible: true}
      this.memoria.guardar(libro)
      return libro
    }

    delete(id: string): void{
      this.memoria.eliminar(id)
    }

    update(id: string, titulo: string, autor: string): void {
    const libros = this.memoria.mostrar();
    const libroExistente = libros.find(l => l.id === id);

    if (!libroExistente) {
      return;
      }

    libroExistente.titulo = titulo;
    libroExistente.autor = autor;

    this.memoria.actualizar(libroExistente);
  }

    getAll(){
      return this.memoria.mostrar()
    }
}

class ServicioEstudiante {
  constructor(private memoria: MemoriaCRUD<Estudiante>){}

  register(id: string, nombre: string, identificacion: string, grado: string): Estudiante {
      const estudiante: Estudiante = {id, nombre,identificacion,grado}
      this.memoria.guardar(estudiante)
      return estudiante
    }

  delete(id: string): void{
      this.memoria.eliminar(id)
    }

  update(id: string, nombre: string, identificacion: string, grado: string): void {
    const estudiantes = this.memoria.mostrar();
    const estudianteExistente = estudiantes.find(l => l.id === id);

    if (!estudianteExistente) {
      return;
      }
    
    estudianteExistente.nombre = nombre;
    estudianteExistente.identificacion = identificacion
    estudianteExistente.grado = grado;

    this.memoria.actualizar(estudianteExistente);
  }

    getAll(){
      return this.memoria.mostrar()
    }
}

class ServicioPrestamo {
  prestamos: Array<any> = [];

  constructor(
    private servicioLibro: ServicioLibro,
    private servicioCliente: ServicioEstudiante 
  ) {}

  prestarLibro(idLibro: string, idCliente: string): boolean {
  const libros = this.servicioLibro.getAll();
  const clientes = this.servicioCliente.getAll();

  const libro = libros.find(l => l.id === idLibro);
  if (!libro || !libro.disponible) 
    return false;

  const cliente = clientes.find(e => e.id === idCliente);
  if (!cliente) 
    return false;

  libro.disponible = false

  this.prestamos.push({
    idLibro,
    idCliente
  });

  return true;
  }

  devolverLibro(idLibro: string): boolean {
  const prestamoIndex = this.prestamos.findIndex(p => p.idLibro === idLibro);

  if (prestamoIndex === -1) 
    return false;

  const libros = this.servicioLibro.getAll();
  const libro = libros.find(l => l.id === idLibro);

  if (!libro) 
    return false;

  libro.disponible = true;
  this.prestamos.splice(prestamoIndex, 1);

  return true;
  }

  getAll(){
    return this.prestamos
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
    private servicioCliente: ServicioEstudiante,
    private servicioLibro: ServicioLibro,
    private servicioPrestamo: ServicioPrestamo
  ) {}

  ejecutar(opcion: number): boolean {
    switch (opcion) {
      case MenuOpcion.REGISTRAR_ESTUDIANTE:
        this.registrarEstudiante();
        break;
      
      case MenuOpcion.ELIMINAR_ESTUDIANTE:
        this.eliminarEstudiante();

      case MenuOpcion.VER_ESTUDIANTES:
        console.log(this.servicioCliente.getAll());
        break;

      case MenuOpcion.ACTUALIZAR_ESTUDIANTE:
        this.actualizarEstudiante()
        break;

      case MenuOpcion.REGISTRAR_LIBRO:
        this.registrarLibro();
        break;
      
      case MenuOpcion.ELIMINAR_LIBRO:
        this.elmiminarLibro();
        break

      case MenuOpcion.VER_LIBROS:
        console.log(this.servicioLibro.getAll());
        break;
      
      case MenuOpcion.ACTUALIZAR_LIBRO:
        this.actualizarlibro();

      case MenuOpcion.PRESTAR_LIBRO:
        this.prestarLibro();
        break;

      case MenuOpcion.DEVOLVER_LIBRO:
        this.devolverLibro();
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

    this.servicioCliente.register(id, nombre, identificacion, grado);
    console.log("Estudiante registrado");
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

    this.servicioCliente.update(id, nombre, identificacion, grado);
    console.log("Estudiante actualizado");
  }

  private registrarLibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    this.servicioLibro.register(id, titulo, autor);
    console.log("Libro registrado");
  }

  private elmiminarLibro(){
    const idLibro = String(prompt("ID Libro: "));
    this.servicioLibro.delete(idLibro)
  }

  private actualizarlibro(){
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    this.servicioLibro.update(id, titulo, autor);
    console.log("Libro actualizado");
  }

  private prestarLibro() {
    const idLibro = String(prompt("ID Libro: "));
    const idEstudiante = String(prompt("ID Estudiante: "));

    const ok = this.servicioPrestamo.prestarLibro(idLibro, idEstudiante);
    console.log(ok ? "Préstamo exitoso" : "No se pudo prestar");
  }

  private devolverLibro() {
    const idLibro = String(prompt("ID Libro: "));
    const ok = this.servicioPrestamo.devolverLibro(idLibro);
    console.log(ok ? "Libro devuelto" : "No se pudo devolver");
  }
}

class ConsoleView{
  mensaje(){
    console.log("Bienvenido al Sistema de Biblioteca que desea:")
    console.log("\n1. Registrar Estudiante,\n2. Eliminar Estudiante,\n3. Ver Estudiantes,\n4. Actualizar Estudiante")
    console.log("\n5. Registrar Libro,\n6. Eliminar Libro,\n7. Ver Libros,\n8. Actualizar Libros")
    console.log("\n9. Prestar Libro\n10. Devolver Libro\n0. Salir")
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

const repoLibro = new MemoriaCRUD<Libro>();
const repoEstudiante = new MemoriaCRUD<Estudiante>();

const servicioLibro = new ServicioLibro(repoLibro);
const servicioCliente = new ServicioEstudiante(repoEstudiante);

const servicioPrestamo = new ServicioPrestamo(servicioLibro,servicioCliente);

const view = new ConsoleView();
const menu = new MenuAccion(servicioCliente, servicioLibro, servicioPrestamo);

const app = new App()
app.run()


//--------------------------------
//PROBANDO LOS PRESTAMOS

// const repoLibro = new MemoriaCRUD<Libro>();
// const repoEstudiante = new MemoriaCRUD<Estudiante>();

// const servicioLibro = new ServicioLibro(repoLibro);
// const servicioCliente = new ServicioEstudiante(repoEstudiante);

// const servicioPrestamo = new ServicioPrestamo(servicioLibro,servicioCliente);

// servicioLibro.register("L1", "1984", "Orwell");
// servicioLibro.register("L2", "Harry Potter", "J. K. Rowling")
// servicioCliente.register("E1", "Juan", "123", "11");

// // SI SE PUEDE PRESTAR
// console.log(servicioPrestamo.prestarLibro("L1", "E1")); // true
// console.log(servicioPrestamo.prestarLibro("L2", "E1")); // TRUE
// console.log(servicioPrestamo.devolverLibro("L1"));      // true

// console.log(servicioPrestamo.getAll());


//---------------------------------------
// PROBANDO POR LOS ESTUDIANTES
//const repositorioestudiante = new MemoriaCRUD<Estudiante>
//const servicioestudiante = new ServicioEstudiante(repositorioestudiante)

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
//const repositoriobiblioteca = new MemoriaCRUD<Libro>
//const serviciolibro = new ServicioLibro(repositoriobiblioteca)

// YA SE PUEDE REGISTRAR
//serviciolibro.register("1", "IT", "Sthephen King")
//console.log(repositoriobiblioteca.mostrar())

//YA SE PUEDE ELMINAR POR ID
//serviciolibro.delete("1")
//console.log(repositoriobiblioteca.mostrar())

// YA SE PUEDE ACTUALIZAR POR EL ID
//serviciolibro.update("1", "IT (Edición Especial)", "Stephen King")
//console.log(serviciolibro.getAll())




// ACA SE IMPLEMENTO LA INTERFACE DE REPOSITORIO


//class ServicioLibro {
//    constructor(private memoria: MemoriaCRUD<Libro>)

//    register(id: string, title:string, author: string) {
//        const book = {
//            id,
//            title,
//            author,
//            available: true
//        }
    
    // eliminar(id: string): void{
    // this.repository.guardar(book)}

    //getById(id:string): Book | null {
    // return this.repository.getById(id)}

    //getAll(): Book[]{
    // return this.repository.getAll()}

//    prestar(book: Book): void{
//        book.available = false;
//    }
    // this.repository.update(book)
    //}

    // devolver(book: Book): void{
    // book.available = true;
    //  this.repository.update(book)}
    

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