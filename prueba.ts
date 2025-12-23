// Praticar la abstracion de como realizar un sistema de prestamos en la repositoriobiblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de repositoriobiblioteca
// Que ingrese para registrar estudiante, para prestar, devolver
// O para manejar el inventario de la repositoriobiblioteca

interface IRegistro<T> {
  registro(data: any): boolean;
}

interface IPrestamo<T> {
  prestar(veces: number, data: any): boolean;
  devolver(data: any): void;
}

interface IAccionMemoria<T>{
    guardar(some: any): void;
    eliminar(some: any): void;
    actualizar(some: any): void;
    //Mostrar(): T[]
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

    guardar(some: any) {
        this.memoria.push(some)
    }

    eliminar(some: any) {
      const index = this.memoria.findIndex(
        (item: any) => item.id === some
          );

      if (index !== -1) {
        this.memoria.splice(index, 1);
      }
}

    actualizar(some: any){
        const index = this.memoria.findIndex(i => i === some);
        if (index !== -1) {
            this.memoria[index] = some;}}

    mostrar(){
        return this.memoria
    }
}

type Libro = {
  id: number;
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

class ServicioLibro{
    constructor(private memoria: RepositoriodeMemoria<Libro>){}
    
    register(id: number, titulo: string, autor: string): Libro {
      const libro: Libro = {
        id,
        titulo,
        autor,
        disponible: true
      }
      this.memoria.guardar(libro)
      return libro
    }

    delete(id: number): void{
      this.memoria.eliminar(id)
    }

    getAll(){
      this.memoria.mostrar()
    }
}


//---------------------------------------
const estudiante = new Cliente<Estudiante>
const profesor = new Cliente<Profesor>

const repositoriobiblioteca = new RepositoriodeMemoria<Libro>

const serviciolibro = new ServicioLibro(repositoriobiblioteca)
serviciolibro.register(1, "IT", "Sthephen King")
console.log(repositoriobiblioteca.mostrar())

serviciolibro.delete(1)
console.log(repositoriobiblioteca.mostrar())


//repositoriobiblioteca.guardar(libro1)
//console.log(repositoriobiblioteca.mostrar())

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

