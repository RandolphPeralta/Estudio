interface IGuardar<T> {
  guardar(item: T): boolean;
}

interface IEliminar<T> {
  eliminar(item: T): boolean;
}

interface IActualizar<T> {
  actualizar(item: T): boolean;
}

interface IMostrar<T> {
  mostrar(): T[];
}

interface IAccion<T> extends IGuardar<T>, IEliminar<T>, IMostrar<T>, IMostrar<T> {
  guardar(item: T): boolean;
  eliminar(item: T): boolean;
  actualizar(item: T): boolean;
  mostrar(): T[];
}


// ------------------------------------------------------

// EN MEMORIA RAM
class Memoria<T> implements IGuardar<T>, IEliminar<T>, IActualizar<T>, IMostrar<T> {
  private memoria: T[] = []

  guardar(some: any): boolean {
    const index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    this.memoria.push(some)
    return true;
  }

  eliminar(id: any) {
    const index = this.memoria.findIndex((item: any) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.memoria.splice(index, 1);
    return true

  }

  actualizar(some: any): boolean {
    const index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    this.memoria[index] = some;
    return true;
  }

  mostrar() {
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

class ServicioLibro {
  constructor(private memoria: IAccion<Libro>) { }

  register(libro: Libro): boolean {
    return this.memoria.guardar(libro)
  }

  delete(id: any): void {
    this.memoria.eliminar(id)
  }

  update(libro: Libro): boolean {
    return this.memoria.actualizar(libro);
  }

  getAll() {
    return this.memoria.mostrar()
  }
}

class ServicioEstudiante {
  constructor(private memoria: IAccion<Estudiante>) { }

  register(estudiante: Estudiante): boolean {
    return this.memoria.guardar(estudiante)

  }

  delete(id: any): void {
    this.memoria.eliminar(id)
  }

  update(estudiante: Estudiante): boolean {
    return this.memoria.actualizar(estudiante);
  }

  getAll() {
    return this.memoria.mostrar()
  }
}
