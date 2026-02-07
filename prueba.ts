import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

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

interface IAccion<T> extends IGuardar<T>, IEliminar<T>, IActualizar<T>, IMostrar<T> {
  guardar(item: T): boolean;
  eliminar(item: T): boolean;
  actualizar(item: T): boolean;
  mostrar(): T[];
}

interface ICommand {
  ejecutar(): any;
}

interface ICommandE {
  ejecutar(some: any): any;
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
    return true;

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

type MenuOption = {
  key: number;
  label: string;
}

class Servicio<T> {
  constructor(private memoria: IAccion<T>) { }

  register(algo: T): boolean {
    return this.memoria.guardar(algo)
  }

  delete(id: any): boolean {
    return this.memoria.eliminar(id)
  }

  update(algo: T): boolean {
    return this.memoria.actualizar(algo);
  }

  getAll() {
    return this.memoria.mostrar()
  }
}

//VISTA
//------------------------------------
// MENU ACCION

class RegistrarEstudianteCommand implements ICommand {
  constructor(private servicio: Servicio<Estudiante>) { }

  ejecutar(): void {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiante: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    };

    const ok = this.servicio.register(estudiante);

    console.log(ok ? "Estudiante registrado" : "El estudiante ya existe");
  }
}

class EliminarEstudiantesCommand implements ICommand {
  constructor(private servicio: Servicio<Estudiante>) { }
  ejecutar(): void {
    const id = String(prompt("ID: "));
    this.servicio.delete(id)
    console.log("Estudiante Eliminado")
  }
}

class VerEstudiantesCommand implements ICommand {
  constructor(private servicio: Servicio<Estudiante>) { }

  ejecutar(): void {
    console.table(this.servicio.getAll())
  }
}

class ActualizarEstudiantesCommand implements ICommand {
  constructor(private servicio: Servicio<Estudiante>) { }

  ejecutar(): void {
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

    const estudianteactualizado = this.servicio.update(estudiantexistente);

    if (estudianteactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }
}

class RegistrarLibroCommand implements ICommand {
  constructor(private servicio: Servicio<Libro>) { }

  ejecutar(): void {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const libro: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    }

    const ok = this.servicio.register(libro);

    console.log(ok ? "Libro registrado" : "El Libro ya existe");
  }
}

class EliminarLibroCommand implements ICommand {
  constructor(private servicio: Servicio<Libro>) { }
  ejecutar(): void {
    const id = String(prompt("ID: "));
    this.servicio.delete(id)
    console.log("Libro Eliminado")
  }
}

class VerLibrosCommand implements ICommand {
  constructor(private servicio: Servicio<Libro>) { }

  ejecutar(): void {
    console.table(this.servicio.getAll())
  }
}

class ActualizarLibroCommand implements ICommand {
  constructor(private servicio: Servicio<Libro>) { }

  ejecutar(): void {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const libroexistente: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    };

    const libroactualizado = this.servicio.update(libroexistente);

    if (libroactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }
}

class PrestarLibroCommand implements ICommand {
  constructor(private libros: Servicio<Libro>, private estudiantes: Servicio<Estudiante>, private prestamos: Servicio<Prestamos>) { }

  ejecutar(): any {
    const idLibro = String(prompt("ID Libro: "));
    const idEstudiante = String(prompt("ID del Estudiante: "));
    const libro = this.libros.getAll().find(libro => libro.id === idLibro);
    if (!libro || !libro.disponible) return "No existe el libro";

    const estudiante = this.estudiantes.getAll().find(estudiante => estudiante.id === idEstudiante);
    if (!estudiante) return "No existe el estudiante";

    libro.disponible = false;

    const ok = this.prestamos.register({
      idLibro,
      idCliente: idEstudiante,
      fechaPrestamo: new Date()
    });

    console.log(
      ok ? "Préstamo realizado correctamente" : "No se pudo realizar el préstamo"
    );

  }
}

class DevolverLibroCommand implements ICommand {
  constructor(private libros: Servicio<Libro>, private estudiantes: Servicio<Estudiante>, private prestamos: Servicio<Prestamos>) { }

  ejecutar(): any {
    const idLibro = String(prompt("ID Libro: "));
    const libro = this.libros.getAll().find(libro => libro.id === idLibro);
    if (!libro) return "No existe dicho libro";

    libro.disponible = true;

    const prestamo = this.prestamos.getAll().find(prestamo => prestamo.idLibro === idLibro && !prestamo.fechaDevolucion);

    if (!prestamo) return "No se pudo reaizar el prestamo";

    prestamo.fechaDevolucion = new Date();
    return "Libro devuelto";
  }
}

class MenuController implements ICommandE {
  constructor(private comandos: Map<number, ICommand>) { }

  ejecutar(opcion: number): boolean {
    if (opcion === 0) return false;

    const comando = this.comandos.get(opcion);
    if (!comando) {
      console.log("Opción inválida");
      return true;
    }

    comando.ejecutar();
    return true;
  }
}

const opcionesMenu: MenuOption[] = [
  { key: 1, label: "Registrar Estudiante" },
  { key: 2, label: "Eliminar Estudiante" },
  { key: 3, label: "Ver Estudiantes" },
  { key: 4, label: "Actualizar Estudiante" },
  { key: 5, label: "Registrar Libro" },
  { key: 6, label: "Eliminar Libro" },
  { key: 7, label: "Ver Libros" },
  { key: 8, label: "Actualizar Libros" },
  { key: 9, label: "Prestar Libro" },
  { key: 10, label: "Devolver Libro" },
  { key: 0, label: "Salir" }
];

class ConsoleView implements IMostrar<MenuOption> {
  constructor(private opciones: MenuOption[]) { }

  mostrar(): any[] {
    console.log("Bienvenido...");
    this.opciones.forEach(option => console.log(`${option.key}. ${option.label}`)
    );

    return this.opciones
  }
}

// LA CLASE CONSUMIDORA

class App {
  constructor(private menu: IMostrar<MenuOption>, private controller: ICommandE) { }

  run(): void {
    let continuar = true;

    while (continuar) {
      this.menu.mostrar();
      const opcion = Number(prompt("Seleccione opción:"))
      continuar = this.controller.ejecutar(opcion);
    }
  }
}

const view = new ConsoleView(opcionesMenu);

const memoriaestudiate = new Memoria<Estudiante>()
const memorialibro = new Memoria<Libro>()
const memoriaprestamo = new Memoria<Prestamos>()

const servicioestudiante = new Servicio<Estudiante>(memoriaestudiate);
const serviciolibro = new Servicio<Libro>(memorialibro);
const servicioprestamos = new Servicio<Prestamos>(memoriaprestamo)

const comandos = new Map<number, ICommand>(); // TOCA MIRAR LOS COMANDOS

comandos.set(1, new RegistrarEstudianteCommand(servicioestudiante));
comandos.set(2, new EliminarEstudiantesCommand(servicioestudiante));
comandos.set(3, new VerEstudiantesCommand(servicioestudiante));
comandos.set(4, new ActualizarEstudiantesCommand(servicioestudiante));
comandos.set(5, new RegistrarLibroCommand(serviciolibro))
comandos.set(6, new EliminarLibroCommand(serviciolibro))
comandos.set(7, new VerLibrosCommand(serviciolibro))
comandos.set(8, new ActualizarLibroCommand(serviciolibro))

comandos.set(9, new PrestarLibroCommand(serviciolibro, servicioestudiante, servicioprestamos));
comandos.set(10, new DevolverLibroCommand(serviciolibro, servicioestudiante, servicioprestamos))

const menuController = new MenuController(comandos);

const app = new App(view, menuController)

app.run()

