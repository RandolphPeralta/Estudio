class Libro {
  private titulo: string = ""
  private autor: string = ""
  private codigo: number = 0
  private disponible:boolean = true

  constructor(titulo: string, autor: string, codigo: number, disponible: boolean){
    this.titulo = titulo
    this.autor = autor
    this.codigo = codigo
    this.disponible = disponible
  }

  getTitulo(): string{
    return this.titulo;
  }

  getDisponibilidad(){
    return this.disponible
  }

  prestarLibro(libro: Libro){
    if (libro.getDisponibilidad()){
      this.disponible == false
      }
    else if (libro.getDisponibilidad() == false) {
      return `No esta disponible el libro` 
  }
    } 
    
  devolverLibro(){
    this.disponible == true
  }

}

class Usuario {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public mostrarInfo(): void {
    console.log(`👤 Usuario: ${this.nombre}`);
  }
}

// Clase Cliente que hereda de Usuario y aplica polimorfismo
class Estudiante extends Usuario {
  private librosPrestados: Libro[];

  constructor(nombre: string) {
    super(nombre);
    this.librosPrestados = [];
  }

  prestar(libro: Libro){
    if (libro.getDisponibilidad() == true){
      libro.prestarLibro
      this.librosPrestados.push(libro)
      return `El libro ${libro.getTitulo()} ha sido prestado`
    }
   }
  
  devolver(libro: Libro) {
    if (libro.getDisponibilidad() == false){
      const index = this.librosPrestados.indexOf(libro);
      if (index !== -1) {
        libro.devolverLibro();
        this.librosPrestados.splice(index, 1);
      } 
      else {
      return `⚠️ ${this.nombre} no tiene prestado "${libro.getTitulo()}".`;
          }
        }
      }
    
  mostrar(): Libro[] {
    return this.librosPrestados
    }
  }
  

class Bibliotecario extends Usuario {
  
}

const libro = new Libro("El señor de los anillos", "J. R. R. Tolkien", 1, true) 
  
const estudiante = new Estudiante("Alan")



console.log(estudiante.prestar(libro));
console.log(estudiante.mostrar());



// class Estudiante {
//   private nombre: string = ""
//   private grado: number = 0
//   private librosPrestados: Libro[] = []

//   setNombre(nombre: string){
//     this.nombre = nombre
//   }

//   setGrado(grado: number){
//     this.grado = grado
//   }

//   prestar(libro: Libro){
//     if (libro.getDisponibilidad() == true){
//       libro.prestarLibro
//       this.librosPrestados.push(libro)
//       return `El libro ${libro.getTitulo()} ha sido prestado`
//     }
//    }
  
//   devolver(libro: Libro) {
//     if (libro.getDisponibilidad() == false){
//       const index = this.librosPrestados.indexOf(libro);
//       if (index !== -1) {
//         libro.devolverLibro();
//         this.librosPrestados.splice(index, 1);
//       } 
//       else {
//       return `⚠️ ${this.nombre} no tiene prestado "${libro.getTitulo()}".`;
//           }
//         }
//       }
    
//   mostrar(): Libro[] {
//     return this.librosPrestados
//     }
//   }
  

// const libro = new Libro("El señor de los anillos", "J. R. R. Tolkien", 1, true) 
  
// const estudiante = new Estudiante()
// estudiante.setNombre("Alan")
// estudiante.setGrado(11)


// console.log(estudiante.prestar(libro));
// console.log(estudiante.mostrar());
