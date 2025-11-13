class Libro {
  public titulo: string = ""
  public codigo: number = 0
  public autor: string = ""
  public estado: boolean = false

  constructor(titulo: string, codigo: number, autor: string, estado: boolean){
    this.titulo = titulo
    this.codigo = codigo
    this.autor = autor
    this.estado = estado
  }

  getEstado(){
    
  }

}


const libro = new Libro("Cien año de soledad", 1, "Gabriel Marquez", false);

// console.log(libro);

