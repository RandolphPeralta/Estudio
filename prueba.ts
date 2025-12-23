// Praticar la abstracion de como realizar un sistema de prestamos en la repositoriobiblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de repositoriobiblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el INVENTARIO

interface IRegistro<T> {
  registro(data: any): boolean;
}

interface IPrestamo<T> {
  prestar(veces: number, data: any): boolean;
  devolver(data: any): void;
}

interface IAccionMemoria<T>{
    guardar(some: T): void;
    eliminar(some: T): void;
    actualizar(some: T): void;
    mostrar(): T[]
}

class Cliente<T> implements IPrestamo<T>, IRegistro<T> {
   private informacion: Array<any> = []
   public prestamos: Array<any> = [];

   registro<T>(data: T): boolean {
     this.informacion.push(data)
     return true
   }

   prestar<T>(veces: number, data: T): boolean {
     if (this.prestamos.length >= veces) {
       return false;
     }
     this.prestamos.push(data);
     return true;
   }

   devolver<T>(data: T): void {
     const index = this.prestamos.indexOf(data);
     if (index !== -1) {
       this.prestamos.splice(index, 1);
     }
   }
}

class RepositoriodeMemoria<T> implements IAccionMemoria<T>{
    private memoria: T[] = []

    guardar<T>(some: any) {
        this.memoria.push(some)
    }

    eliminar(some: any) {
      const index = this.memoria.findIndex(
        (item: any) => item.id === some
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

type Libro = {
  id: string;
  titulo: string;
  autor: string;
  disponible: true
}

type Estudiante = {
  nombre: string;
  identificacion: string
  grado: string
}

type Profesor = {
  nombre: string;
  identificacion: string
  curso: string
}

// ESTA CLASE ES PARA EL INVENTARIO DE LOS LIBROS
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

  register(nombre: string, identificacion: string, grado: string): Estudiante {
      const estudiante: Estudiante = {nombre,identificacion,grado}
      this.memoria.guardar(estudiante)
      return estudiante
    }

  delete(identificacion: string): void{
      const id = identificacion
      this.memoria.eliminar(id)
    }

  update(identificacion: string, nombre: string, grado: string): void {
    const estudiantes = this.memoria.mostrar();
    const estudianteExistente = estudiantes.find(l => l.identificacion === identificacion);

    if (!estudianteExistente) {
      return;
      }

    estudianteExistente.nombre = nombre;
    estudianteExistente.grado = grado;

    this.memoria.actualizar(estudianteExistente);
  }

    getAll(){
      return this.memoria.mostrar()
    }
}


class ServicioPrestamo {
  // ACA EN ESTA CLASE VAMOS A ESCRIBIR PARA LOS PRESTAMOS Y DEVOLUCIONES, VER QUE LIBROS HAY DISPONIBLES Y CUALES NO
}

//---------------------------------------
// PROBANDO POR LOS ESTUDIANTES
const repositorioestudiante = new RepositoriodeMemoria<Estudiante>
const servicioestudiante = new ServicioEstudiante(repositorioestudiante)

servicioestudiante.register("Sara","1132456789","11")
servicioestudiante.register("Laura","12356789","11")

servicioestudiante.delete("12356789")
console.log(servicioestudiante.getAll())


//PROBANDO POR EL INVENTARIO DE LIBROS EN LA BIBLIOTECA
//const repositoriobiblioteca = new RepositoriodeMemoria<Libro>
//const serviciolibro = new ServicioLibro(repositoriobiblioteca)

//serviciolibro.register("1", "IT", "Sthephen King")
//console.log(repositoriobiblioteca.mostrar())





//YA SE PUEDE ELMINAR POR ID
//serviciolibro.delete("1")
//console.log(repositoriobiblioteca.mostrar())

// ESTAMOS BUSCANDO ACTUALIZAR POR EL ID
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

