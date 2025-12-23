// Praticar la abstracion de como realizar un sistema de prestamos en la biblioteca

// Escribiendo el programa
// Quiero un programa de sistema de gestion de biblioteca
// Que primero me registre en el programa
// Que ingrese si soy estudiante, para prestar, devolver
// O para manejar el inventario de la biblioteca

interface IRegistro<T> {
  registro(data: T): boolean;
}

interface IAcciones<T> {
  prestar(veces: number, data: T): boolean;
  devolver(data: T): void;
}

interface AccionMemoria<T>{
    guardar(some: T): void;
    eliminar(some:T): void;
    actualizar(some: T): void;
    //Mostrar(): T[]
}

class Usuario<T> implements IAcciones<T>, IRegistro<T> {
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

class RepositoriodeMemoria<T> implements AccionMemoria<T>{
    private memoria: T[] = []

    guardar(some: T) {
        this.memoria.push(some)
    }

    eliminar(some: T){
        const index = this.memoria.indexOf(some);
        if (index !== -1) {this.memoria.splice(index, 1);}
    }

    actualizar(some: T){
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
  disponible: boolean
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
    constructor(private memoria: AccionMemoria<Libro>){}
    
    register(){

    }
}


//---------------------------------------
const estudiante = new Usuario<Estudiante>
const profesor = new Usuario<Profesor>

const libro1: Libro = {
  id: 1,
  titulo: "Juego de tronos",
  autor: "George R.R Martin",
  disponible: true
}

const libro2: Libro = {
  id: 2,
  titulo: "Harry Potter",
  autor: "J. K. Rowling",
  disponible: true
}

const libro3: Libro = {
  id: 3,
  titulo: "Don Quijote",
  autor: "Cervantes",
  disponible: true
}

const libro4: Libro = {
  id: 4,
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  disponible: true
}

const libro5: Libro = {
  id: 5,
  titulo: "Orgullo y prejuicio",
  autor: "Jane Austen",
  disponible: true
}


//   reservar<T>(data: T): void {
//     if (this.reservas.length <= 2) {
//       this.reservas.push(data);
//     }
//   }
// }

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
