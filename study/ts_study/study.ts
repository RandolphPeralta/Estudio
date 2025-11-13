class Libro {
  public titulo: string = ""
  public codigo: number = 0
  public autor: string = ""
  public categoria: string = ""
  public disponible: boolean = true

  constructor(titulo: string, codigo: number, autor: string, categoria: string ,disponible: boolean){
    this.titulo = titulo
    this.codigo = codigo
    this.autor = autor
    this.categoria = categoria
    this.disponible = disponible
  }

  getDisponible(){
    return this.disponible
  }

   

}

// const libro = new Libro("Cien año de soledad", 1, "Gabriel Marquez", "Literario", false);

class Estudiante {
  private nombre: string = ""
  private grado: number = 0
  // Aca hay que colocar Libro
 

  getInformacion(){
    return `El estudiante ${this.nombre} de grado ${this.grado} tiene el Libro`
  }

  PrestarLibro(libro: Libro){
    if (libro.getDisponible() == true){
      libro.disponible == false
      return `El libro ${libro.titulo} ha sido prestado`
    }
    else if (libro.getDisponible() == false) {
      return `No es posible, el libro ${libro.titulo} no esta disponible`
    }
       
  }

  DevolverLibro(libro: Libro){
    return libro.disponible = true
  }
}



