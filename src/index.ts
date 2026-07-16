import promptSync from "prompt-sync";
export const prompt = promptSync();

export interface IGuardado<T> {
  guardar(some: T): any;
  eliminar(id: any): any;
}

export interface IAccion<T> extends IGuardado<T> {
  actualizar(some: any): any;
  mostrar(): T[];
}

export interface IAccionadicional<T> extends IAccion<T> {
  buscarporid(id: string): Array<T>
}

export interface IMenu {
  ejecutar(): any
}

export interface ICommandRepository {

  registrar(id: number, comando: IMenu): any;

  obtener(id: number): IMenu | undefined;

}

//----------------------------

export class MemoryRAM<T> implements IAccionadicional<T> {

  private memoria: T[] = [];

  guardar(some: any): boolean {
    let index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    this.memoria.push(some)
    return true;
  }

  eliminar(id: any) {
    let index = this.memoria.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.memoria.splice(index, 1);
    }
  }

  actualizar(some: any): boolean {
    let index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    this.memoria[index] = some;
    return true;
  }

  mostrar(): T[] {
    return this.memoria;
  }

  buscarporid(id: string) {
    return this.memoria.filter((item: any) => item.id === id)
  }
}

//------------------------

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

//------------------------------

export class CreateStudentCommand implements IMenu {
  constructor(private _StudentPersistence: IAccionadicional<Estudiante>) { }

  ejecutar() {
    const name = String(prompt("Nombre: "));
    const identification = String(prompt("Identificación: "));
    const schoolgrade = String(prompt("Grado Escolar: "));

    const registrandoStudent: Estudiante = {
      id: Math.random().toString(),
      nombre: name,
      identificacion: identification,
      grado: schoolgrade
    }

    const Studentregistrado = this._StudentPersistence.guardar(registrandoStudent);

    if (Studentregistrado) {
      console.log("Student registrado");
    } else {
      console.log("El Student ya existe con este ID");
    }
  }
}

export class DeleteStudentCommand implements IMenu {

  constructor(private _StudentPersistence: IAccionadicional<Estudiante>) { }

  ejecutar() {
    const id = String(prompt("ID: "));
    this._StudentPersistence.eliminar(id)
    console.log("Student Eliminado")
  }

}

export class UpdateStudentCommand implements IMenu {

  constructor(private _StudentPersistence: IAccionadicional<Estudiante>) { }

  ejecutar() {
    const id = String(prompt("ID: "));
    const name = String(prompt("Nombre: "));
    const identification = String(prompt("Identificación: "));
    const schoolgrade = String(prompt("Grado Escolar: "));

    const Existingstudent: Estudiante = {
      id: id,
      nombre: name,
      identificacion: identification,
      grado: schoolgrade
    };

    const Updatedstudent = this._StudentPersistence.actualizar(Existingstudent);

    if (Updatedstudent) {
      console.log("Student actualizado");
    } else {
      console.log("No existe un Student con ese ID");
    }
  }

}

export class ReadStudentCommand implements IMenu {

  constructor(private _StudentPersistence: IAccionadicional<Estudiante>) { }

  ejecutar() {
    console.table(this._StudentPersistence.mostrar())
  }

}

export class FindStudentCommand implements IMenu {

  constructor(private _StudentPersistence: IAccionadicional<Estudiante>) { }

  ejecutar() {
    const id = String(prompt("ID Student: "));
    const result = this._StudentPersistence.buscarporid(id)

    if (result.length === 0) {
      console.log("Student no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(Student => console.log(Student))
  }

}

export class CreateBookCommand implements IMenu {
  constructor(private _bookPersistence: IAccionadicional<Libro>) { }

  ejecutar() {
    const title = String(prompt("Título: "));
    const author = String(prompt("Autor: "));

    const registrandoBook: Libro = {
      id: Math.random().toString(),
      titulo: title,
      autor: author,
      disponible: true
    }

    const Bookregistrado = this._bookPersistence.guardar(registrandoBook);
    if (Bookregistrado) {
      console.log("Book registrado");
    } else {
      console.log("El Book ya existe con este ID");
    }
  }
}

export class DeleteBookCommand implements IMenu {
  constructor(private _bookPersistence: IAccionadicional<Libro>) { }

  ejecutar() {
    const idBook = String(prompt("ID Book: "));
    this._bookPersistence.eliminar(idBook)
  }
}

export class UpdateBookCommand implements IMenu {

  constructor(private _bookPersistence: IAccionadicional<Libro>) { }

  ejecutar() {
    const id = String(prompt("ID del Book: "));
    const title = String(prompt("Título: "));
    const author = String(prompt("Autor: "));

    const ExistingBook: Libro = {
      id: id,
      titulo: title,
      autor: author,
      disponible: true
    };

    const UpdateBook = this._bookPersistence.actualizar(ExistingBook);

    if (UpdateBook) {
      console.log("Book actualizado");
    } else {
      console.log("No existe un Book con ese ID");
    }
  }

}

export class ReadBookCommand implements IMenu {

  constructor(private _bookPersistence: IAccionadicional<Libro>) { }

  ejecutar() {
    const Books = this._bookPersistence.mostrar();

    const BooksVista = Books.map(Book => ({
      id: Book.id,
      titulo: Book.titulo,
      autor: Book.autor,
      disponible: Book.disponible ? "Sí" : "No"
    }));

    console.table(BooksVista);
  }
}

export class SearchBookCommand implements IMenu {
  constructor(private _bookPersistence: IAccionadicional<Libro>) { }

  ejecutar() {
    const id = String(prompt("ID del Book: "));
    const result = this._bookPersistence.buscarporid(id)

    if (result.length === 0) {
      console.log("Book no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(Book => console.log(Book))
  }
}

export class LendBookCommand implements IMenu {

  constructor(
    private _studentService: IAccionadicional<Estudiante>,
    private _bookPersistence: IAccionadicional<Libro>,
    private _loanService: IAccionadicional<Prestamo>
  ) { }

  ejecutar() {
    const idBook = String(prompt("ID del Book: "));
    const idStudent = String(prompt("ID del Student: "));

    const book = this._bookPersistence.buscarporid(idBook)[0]

    if (!book) {
      console.log("El Book no existe")
      return
    }

    if (!book.disponible) {
      console.log("Book no disponible")
      return
    }

    const student = this._studentService.buscarporid(idStudent)[0]

    if (!student) {
      console.log("EL Student no existe")
      return
    }

    const Loan: Prestamo = {
      id: Math.random().toString(),
      libro: book,
      estudiante: student,
      fechaPrestamo: new Date()
    }

    const estado = this._loanService.guardar(Loan)

    if (!estado) {
      console.log("Error al prestar al Book")
      return
    }

    book.disponible = false
    this._bookPersistence.actualizar(book)

    console.log("Book prestado correctamente")
  }
}

export class ReturnBookCommand implements IMenu {

  constructor(private _BookPersistence: IAccionadicional<Libro>, private _LoanPersistence: IAccionadicional<Prestamo>) { }

  ejecutar() {
    const idBook = String(prompt("ID del Book: "));
    const Loans = this._LoanPersistence.mostrar()

    const Loan = Loans.find(borrowed =>
      borrowed.libro.id === idBook && !borrowed.fechaDevolucion
    )

    if (!Loan) {
      console.log("No hay préstamo activo para este Book")
      return
    }

    Loan.fechaDevolucion = new Date()

    this._LoanPersistence.actualizar(Loan)

    Loan.libro.disponible = true
    this._BookPersistence.actualizar(Loan.libro)

    console.log("Libo devuelto correctamente")
  }
}

export class ReadLoanCommand implements IMenu {

  constructor(private _loanPersistence: IAccionadicional<Prestamo>) { }

  ejecutar() {
    const Loans = this._loanPersistence.mostrar()

    console.log("\n===== PRÉSTAMOS =====")

    if (Loans.length === 0) {
      console.log("No hay préstamos")
      return
    }

    Loans.forEach(loan => {
      console.log({
        id: loan.id,
        Book: loan.libro.titulo,
        Student: loan.estudiante.nombre,
        fechaLoan: loan.fechaPrestamo,
        fechaDevolucion: loan.fechaDevolucion || "Pendiente"
      })
    })
  }
}

export class UpdateLoanCommand implements IMenu {

  constructor(
    private _LoanPersistence: IAccionadicional<Prestamo>
  ) { }
  ejecutar() {
    const id = String(prompt("ID del Loan: "));

    const Loans = this._LoanPersistence.mostrar()

    const Loan = Loans.find(borrowed => borrowed.id === id)

    if (!Loan) {
      console.log("Préstamo no encontrado")
      return
    }

    const fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):")

    Loan.fechaPrestamo = new Date(fecha)

    const status = this._LoanPersistence.actualizar(Loan)

    console.log(status ? "Préstamo actualizado" : "Error")
  }
}

export class FindLoanCommand implements IMenu {

  constructor(
    private _LoanPersistence: IAccionadicional<Prestamo>
  ) { }

  ejecutar() {
    const idBook = String(prompt("ID del Book: "));

    const Loans = this._LoanPersistence.mostrar()

    const Loan = Loans.find(loan =>
      loan.libro.id === idBook && !loan.fechaDevolucion
    )

    if (!Loan) {
      console.log("Book disponible (no prestado)")
      return
    }

    console.log("\n===== PRÉSTAMO ACTIVO =====")
    console.log({
      Book: Loan.libro.titulo,
      Student: Loan.estudiante.nombre,
      fecha: Loan.fechaPrestamo
    })
  }
}

class MemoryCommandRepository implements ICommandRepository {

  private comandos = new Map<number, IMenu>();

  registrar(id: number, comando: IMenu) {
    this.comandos.set(id, comando);
  }

  obtener(id: number) {
    return this.comandos.get(id);
  }

}

class MenuInvoker implements IMenu {

  constructor(private repository: ICommandRepository) { }

  ejecutar() {

    while (true) {

      this.mostrarMenu();

      const choice = Number(prompt("Seleccione una opción: "));

      if (Number.isNaN(choice)) {
        console.log("Opción inválida");
        this.pause();
        continue;
      }

      if (choice === 0) {
        console.log("Hasta luego");
        break;
      }

      const command = this.repository.obtener(choice);

      if (!command) {
        console.log("Opción inexistente");
      } else {
        command.ejecutar();
      }

      this.pause();
    }
  }


  private mostrarMenu(): void {
    console.log("\n=============================================");
    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    console.log("=============================================");
    const opciones: string[] = [
      "1. Registrar Student",
      "2. Eliminar Student",
      "3. Ver Student",
      "4. Actualizar Student",
      "5. Buscar Student",
      "6. Registrar Book",
      "7. Eliminar Book",
      "8. Ver Books",
      "9. Actualizar Book",
      "10. Buscar Book",
      "11. Prestar Book",
      "12. Devolver Book",
      "13. Mostrar Loans",
      "14. Buscar Loan",
      "15. Actualizar Loan",
      "0. Salir"
    ];
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }

  private pause() {
    prompt("\nPresiona ENTER para continuar...");
  }

}

export class App {

    constructor(private menu: IMenu){}

    run(){
        this.menu.ejecutar();
    }

}

const memoriaBook = new MemoryRAM<Libro>();
const memoriaStudent = new MemoryRAM<Estudiante>();
const memoriaLoan = new MemoryRAM<Prestamo>();

const menucommand = new MemoryCommandRepository();

menucommand.registrar(1, new CreateStudentCommand(memoriaStudent));
menucommand.registrar(2, new DeleteStudentCommand(memoriaStudent));
menucommand.registrar(3, new ReadStudentCommand(memoriaStudent));
menucommand.registrar(4, new UpdateStudentCommand(memoriaStudent));
menucommand.registrar(5, new FindStudentCommand(memoriaStudent));

menucommand.registrar(6, new CreateBookCommand(memoriaBook));
menucommand.registrar(7, new DeleteBookCommand(memoriaBook));
menucommand.registrar(8, new ReadBookCommand(memoriaBook));
menucommand.registrar(9, new UpdateBookCommand(memoriaBook));
menucommand.registrar(10, new SearchBookCommand(memoriaBook));

menucommand.registrar(11, new LendBookCommand(memoriaStudent, memoriaBook, memoriaLoan));
menucommand.registrar(12, new ReturnBookCommand(memoriaBook, memoriaLoan));
menucommand.registrar(13, new ReadLoanCommand(memoriaLoan));
menucommand.registrar(14, new FindLoanCommand(memoriaLoan));
menucommand.registrar(15, new UpdateLoanCommand(memoriaLoan));

const menuprincipal = new MenuInvoker(menucommand);
const app = new App(menuprincipal)

app.run()