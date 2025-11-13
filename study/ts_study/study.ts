class Libro {
  public nombre: string = ""
  public codigo: number = 0
  public autor: string = ""
  public categoria: string = ""
  public prestado: boolean = false

  prestadoLibro(){
    return this.prestado = true
  }

  libreLibro() {
    return this.prestado
  }
}

class Estudiante {
  private nombre: string = ""
  private grado: number = 0

  prestarLibro(){
    
  }
}

const libros = [Libro]



