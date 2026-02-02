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
    constructor(private memoria: IAccion<Libro>){}
    
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
  constructor(private memoria: IAccion<Estudiante>){}

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
