import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

export interface ISave<T> {
  create(some: T): any;
  delete(id: any): any;
}

export interface IAccion<T> extends ISave<T>{
  update(some: any): any;
  read(): T[];
}

export interface IAccionadicional<T> extends IAccion<T> {
  findbyid(id: string): Array<T>
}

export interface IMenu {
  execute(): any
}

export class Memory<T> implements IAccionadicional<T> {

  private memory: T[] = [];

  create(some: any): boolean {
    let index = this.memory.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    this.memory.push(some)
    return true;
  }

  delete(id: any) {
    let index = this.memory.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.memory.splice(index, 1);
    }
  }

  update(some: any): boolean {
    let index = this.memory.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    this.memory[index] = some;
    return true;
  }

  read(): T[] {
    return this.memory;
  }
  
  findbyid(id: string) {
        return this.memory.filter((item: any) => item.id === id)
    }
}

export type Estudiante = {
  id: string;
  nombre: string;
  identificacion: string;
  grado: string;
};

export type Libro = {
  id: string;
  titulo: string;
  autor: string;
  disponible: boolean;
};

export type Prestamo = {
    id: string,
    libro: Libro,
    estudiante: Estudiante,
    fechaPrestamo: Date; 
    fechaDevolucion?: Date;
}

export class MenuConsole implements IMenu {
  constructor(
    private servicioEstudiante: IAccionadicional<Estudiante>,
    private servicioLibro: IAccionadicional<Libro>,
    private servicioPrestamo: IAccionadicional<Prestamo>
  ) { }

  execute(): void {
    let continuar = true;

    while (continuar) {
      this.readMenu();
      const opcion =  Number(prompt("Seleccione opción: "));
      
      switch (opcion) {
        case 1:
          this.registrarEstudiante();
          this.pause();
          break;

        case 2:
          this.deleteEstudiante();
          this.pause();
          break;

        case 3:
          console.table(this.servicioEstudiante.read());
          this.pause();
          break;

        case 4:
          this.updateEstudiante();
          this.pause();
          break;

        case 5:
          this.buscarEstudiante();
          this.pause();
          break;

        case 6:
          this.registrarLibro();
          this.pause();
          break;

        case 7:
          this.elmiminarLibro();
          this.pause();
          break;

        case 8:
          this.readLibros();
          this.pause();
          break;

        case 9:
          this.updatelibro();
          this.pause();
          break;

        case 10:
          this.buscarLibro();
          this.pause();
          break;

        case 11:
          this.prestarLibrob();
          this.pause();
          break;

        case 12:
          this.devolverLibrob();
          this.pause();
          break;

        case 13:
          this.readPrestamos();
          this.pause();
          break;

        case 14:
          this.encontrarPrestamoPorLibro();
          this.pause();
          break;

        case 15:
          this.updatePrestamo();
          this.pause();
          break;

        case 0:
          continuar = false;
          break;

        default:
          console.log("Opción inválida");
          this.pause();
      }
    }
  }

  private readMenu(): void {
    console.log("\n=============================================");
    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    console.log("=============================================");
    const opciones: string[] = [
      "1. Registrar Estudiante",
      "2. delete Estudiante",
      "3. Ver Estudiantes",
      "4. update Estudiante",
      "5. Buscar Estudiante",
      "6. Registrar Libro",
      "7. delete Libro",
      "8. Ver Libros",
      "9. update Libros",
      "10. Buscar Libro",
      "11. Prestar Libro",
      "12. Devolver Libro",
      "13. read Prestamos",
      "14. Buscar Prestamo",
      "15. update Prestamo",
      "0. Salir"
    ];
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }

  private registrarEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const registrandoestudiante: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    }

    const estudianteregistrado = this.servicioEstudiante.create(registrandoestudiante);

    if (estudianteregistrado) {
      console.log("Estudiante registrado");
    } else {
      console.log("El estudiante ya existe con este ID");
    }
  }

  private deleteEstudiante() {
    const id = String(prompt("ID: "));
    this.servicioEstudiante.delete(id)
    console.log("Estudiante Eliminado")
  }

  private updateEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiantexistente: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    };

    const estudianteactualizado = this.servicioEstudiante.update(estudiantexistente);

    if (estudianteactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }

  private buscarEstudiante() {
    const id = String(prompt("ID Estudiante: "));
    const result = this.servicioEstudiante.findbyid(id)

    if (result.length === 0) {
      console.log("Estudiante no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(estudiante => console.log(estudiante))
  }

  private registrarLibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const registrandolibro: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    }

    const libroregistrado = this.servicioLibro.create(registrandolibro);
    if (libroregistrado) {
      console.log("Libro registrado");
    } else {
      console.log("El Libro ya existe con este ID");
    }
  }

  private elmiminarLibro() {
    const idLibro = String(prompt("ID Libro: "));
    this.servicioLibro.delete(idLibro)
  }

  private updatelibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const libroexistente: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    };

    const libroactualizado = this.servicioLibro.update(libroexistente);

    if (libroactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }

  private readLibros() {
    const libros = this.servicioLibro.read();

    const librosVista = libros.map(libro => ({
      id: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      disponible: libro.disponible ? "Sí" : "No"
    }));

    console.table(librosVista);
  }

  private buscarLibro() {
    const id = String(prompt("ID Libro: "));
    const result = this.servicioLibro.findbyid(id)

    if (result.length === 0) {
      console.log("Libro no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(libro => console.log(libro))
  }

  private prestarLibrob() {
    const idLibro = String(prompt("ID Libro: "));
    const idEstudiante = String(prompt("ID Estudiante: "));

    const libro = this.servicioLibro.findbyid(idLibro)[0]

    if (!libro) {
      console.log("Libro no existe")
      return
    }

    if (!libro.disponible) {
      console.log("Libro no disponible")
      return
    }

    const estudiante = this.servicioEstudiante.findbyid(idEstudiante)[0]

    if (!estudiante) {
      console.log("Estudiante no existe")
      return
    }

    const prestamo: Prestamo = {
      id: Math.random().toString(),
      libro,
      estudiante,
      fechaPrestamo: new Date()
    }

    const estado = this.servicioPrestamo.create(prestamo)

    if (!estado) {
      console.log("Error al prestar libro")
      return
    }

    libro.disponible = false
    this.servicioLibro.update(libro)

    console.log("Libro prestado correctamente")
  }

  private devolverLibrob() {
    const idLibro = String(prompt("ID Libro: "));
    const prestamos = this.servicioPrestamo.read()

    const prestamo = prestamos.find(prestado =>
      prestado.libro.id === idLibro && !prestado.fechaDevolucion
    )

    if (!prestamo) {
      console.log("No hay préstamo activo para este libro")
      return
    }

    prestamo.fechaDevolucion = new Date()

    this.servicioPrestamo.update(prestamo)

    prestamo.libro.disponible = true
    this.servicioLibro.update(prestamo.libro)

    console.log("Libro devuelto correctamente")
  }

  private readPrestamos(): void {

    const prestamos = this.servicioPrestamo.read()

    console.log("\n===== PRÉSTAMOS =====")

    if (prestamos.length === 0) {
      console.log("No hay préstamos")
      return
    }

    prestamos.forEach(p => {
      console.log({
        id: p.id,
        libro: p.libro.titulo,
        estudiante: p.estudiante.nombre,
        fechaPrestamo: p.fechaPrestamo,
        fechaDevolucion: p.fechaDevolucion || "Pendiente"
      })
    })
  }

  private encontrarPrestamoPorLibro(): void {

    const idLibro = String(prompt("ID Libro: "));

    const prestamos = this.servicioPrestamo.read()

    const prestamo = prestamos.find(p =>
      p.libro.id === idLibro && !p.fechaDevolucion
    )

    if (!prestamo) {
      console.log("Libro disponible (no prestado)")
      return
    }

    console.log("\n===== PRÉSTAMO ACTIVO =====")
    console.log({
      libro: prestamo.libro.titulo,
      estudiante: prestamo.estudiante.nombre,
      fecha: prestamo.fechaPrestamo
    })
  }

  private updatePrestamo(): void {

    const id = String(prompt("ID del prestamo: "));

    const prestamos = this.servicioPrestamo.read()

    const prestamo = prestamos.find(prestado => prestado.id === id)

    if (!prestamo) {
      console.log("Préstamo no encontrado")
      return
    }

    const fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):")

    prestamo.fechaDevolucion = new Date(fecha)

    const status = this.servicioPrestamo.update(prestamo)

    console.log(status ? "Préstamo actualizado" : "Error")
  }

  private pause() {
    prompt("\nPresiona ENTER para continuar...");
  }

}

export class App {
  constructor(private menu: IMenu) { }

  run(): void {
    this.menu.execute();
  }
}

const MemoryLibro = new Memory<Libro>();
const MemoryEstudiante = new Memory<Estudiante>();
const MemoryPrestamo = new Memory<Prestamo>();

const menu = new MenuConsole(MemoryEstudiante, MemoryLibro, MemoryPrestamo);

const app = new App(menu);
app.run();
