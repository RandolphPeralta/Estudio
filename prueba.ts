// Praticar la abstracion de como realizar un sistema de prestamos en la repositoriobiblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de repositoriobiblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el INVENTARIO

interface IAccionMemoria<T>{
    guardar(some: T): void;
    eliminar(id: T): void;
    actualizar(some: T): void;
    mostrar(): T[]
}

class RepositoriodeMemoria<T> implements IAccionMemoria<T>{
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
    constructor(private memoria: RepositoriodeMemoria<Libro>){}
    
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
  constructor(private memoria: RepositoriodeMemoria<Estudiante>){}

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
  if (!libro || !libro.disponible) return false;

  const cliente = clientes.find(e => e.id === idCliente);
  if (!cliente) return false;

  libro.disponible = false

  this.prestamos.push({
    idLibro,
    idCliente
  });

  return true;
  }

  devolverLibro(idLibro: string): boolean {
  const prestamoIndex = this.prestamos.findIndex(p => p.idLibro === idLibro);

  if (prestamoIndex === -1) return false;

  const libros = this.servicioLibro.getAll();
  const libro = libros.find(l => l.id === idLibro);

  if (!libro) return false;

  libro.disponible = true;
  this.prestamos.splice(prestamoIndex, 1);

  return true;
  }

  getAll(){
    return this.prestamos
  }
}

class ConsoleView{
  mensaje(){
    console.log("Bienvenido al Sistema de Biblioteca que desea:")
    console.log("\n1. Registrar Estudiante,\n2. Eliminar Estudiante,\n3. Ver Estudiantes,\n4. Actualizar Estudiante")
    console.log("\n5. Registrar Libro,\n6. Eliminar Libro,\n7. Ver Libros,\n8. Actualizar Libros")
    console.log("\n9. Prestar Libro\n10. Devolver Libro")
  }
}

//--------------------------------
//PROBANDO LOS PRESTAMOS

// const repoLibro = new RepositoriodeMemoria<Libro>();
// const repoEstudiante = new RepositoriodeMemoria<Estudiante>();

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
//const repositorioestudiante = new RepositoriodeMemoria<Estudiante>
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
//const repositoriobiblioteca = new RepositoriodeMemoria<Libro>
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
//    constructor(private memoria: RepositoriodeMemoria<Libro>)

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