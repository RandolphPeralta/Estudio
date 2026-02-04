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

interface Command {
  ejecutar(): void;
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

//----------------------------
//VISTA

interface MenuOption {
  key: number;
  label: string;
}

interface IMenu {
  mostrarMenu(): void;
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
  constructor(private opciones: MenuOption[]) {}

  mostrar(): MenuOption[] {
    console.log("Bienvenido...");
    this.opciones.forEach(o =>
      console.log(`${o.key}. ${o.label}`)
    );
    
    return this.opciones;  // Devuelve las opciones para posible uso posterior
  }
}

//------------------------------------
// MENU ACCION

class RegistrarEstudianteCommand implements Command {
  constructor(
    private servicio: ServicioEstudiante,
    private view: IMostrar<MenuOption>
  ) {}

  ejecutar(): void {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiante: Estudiante = {
      id, nombre, identificacion, grado
    };

    const ok = this.servicio.register(estudiante);

    console.log(
      ok ? "Estudiante registrado" : "El estudiante ya existe"
    );
  }
}

class VerEstudiantesCommand implements Command {
  constructor(
    private servicio: ServicioEstudiante,
    private view: IView
  ) {}

  ejecutar(): void {
    const estudiantes = this.servicio.getAll();
    this.view.mostrarTabla(estudiantes);
  }
}


// DESPUES SIGUEN LAS DEMAS OPCIONES

class MenuController {
  constructor(private comandos: Map<number, Command>) {}

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

const view = new ConsoleView(opcionesMenu);           //ESTO ESTA MALO TOCA CORREGIR Y CREO QUE DESDE LAS INTERFACES

const servicioEstudiante = new ServicioEstudiante(new Memoria<Estudiante>());
const servicioLibro = new ServicioLibro(new Memoria<Libro>());

const comandos = new Map<number, Command>();

comandos.set(1, new RegistrarEstudianteCommand(servicioEstudiante, view));  //ESTO TAMBIEN HAY QUE CORREGIRLO Y CREO QUE DESDE LAS INTERFACES
//comandos.set(3, new VerEstudiantesCommand(servicioEstudiante, view));
// comandos.set(5, RegistrarLibroCommand)
// comandos.set(9, PrestarLibroCommand)
// etc...

const menuController = new MenuController(comandos);
