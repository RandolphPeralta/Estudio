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



interface IView {
  leerTexto(mensaje: string): string;
  leerNumero(mensaje: string): number;
  mostrarMensaje(mensaje: string): void;
  mostrarTabla(data: any[]): void;
}

// ------------------------------------------------------

// EN MEMORIA RAM
class Memoria<T> implements IAccion<T> {
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
  nombre: string,
  identificacion: string
  grado: string
}

type Prestamos = {
  idLibro: string,
  idCliente: string
  fechaPrestamo: Date;
  fechaDevolucion?: Date;
}

class ServicioLibro {
  constructor(private memoria: IAccion<Libro>) { }

  register(libro: Libro): boolean {
    return this.memoria.guardar(libro)
  }

  delete(id: any): boolean {
    return this.memoria.eliminar(id)
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

  delete(id: any): boolean {
    return this.memoria.eliminar(id)
  }

  update(estudiante: Estudiante): boolean {
    return this.memoria.actualizar(estudiante);
  }

  getAll() {
    return this.memoria.mostrar()
  }
}

class ServicioPrestamo {
  constructor(private repositorio: IAccion<Prestamos>) {}

  lend(prestamo: Prestamos): boolean {
    return this.repositorio.guardar(prestamo);
  }

  restore(prestamo: Prestamos): boolean {
    return this.repositorio.eliminar(prestamo);
  }

  update(prestamo: Prestamos): boolean {
    return this.repositorio.actualizar(prestamo)
  }

  list(): Prestamos[] {
    return this.repositorio.mostrar();
  } 
}

interface IMenu {
  mostrarMenu(): void;
}

class Consoleview implements IMenu {
  mostrarMenu() {
    const opciones: string[] = [
      "1. Registrar Estudiante",
      "2. Eliminar Estudiante",
      "3. Ver Estudiantes",
      "4. Actualizar Estudiante",
      "5. Registrar Libro",
      "6. Eliminar Libro",
      "7. Ver Libros",
      "8. Actualizar Libros",
      "9. Prestar Libro",
      "10. Devolver Libro",
      "0. Salir"
    ];

    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }
}


