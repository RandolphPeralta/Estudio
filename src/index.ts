// import * as promptSync from "prompt-sync";
// const prompt = (promptSync as any)();

//------DOMAIN-----------

//---------interfaces--------
export interface ISave<T> {
    create(some: T): boolean;
    delete(id: any): boolean;
}

export interface IUpdate<T> extends ISave<T> {
    update(some: any): boolean;
    read(): T[];
}

export interface IAddidionalaction<T> extends IUpdate<T> {
    findbyid(id: string): Array<T>
}

export interface IView {
    execute(): any;
}

export interface IService<T> {
    create(item: T): boolean;
    read(): Array<T>;
    update(item: T): boolean;
    delete(id: any): boolean;
}

export interface IValidation<T> {
    validate(item: T): any;
}

//---------Entitys---------------------

export type Student = {
    id: string;
    name: string;
    identification: string;
    schoolgrade: string;
};

export type Book = {
    id: string;
    title: string;
    author: string;
    available: boolean;
};

export type Loan = {
    id: string,
    book: Book,
    student: Student,
    loanDate: Date;
    returndate?: Date;
}

//--------INFRAESTRUCTURE---------

//----------Persistence--------------

export class MemoryRAM<T> implements IAddidionalaction<T> {

    private memory: T[] = [];

    create(some: any): boolean {
        return this.memory.push(some) > 0;
    }

    delete(id: any) {
        let index = this.memory.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            this.memory.splice(index, 1);
            return true
        } else {
            return false
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

export class Validation<T extends object> implements IValidation<T> {
    validate(item: T): boolean {
        for (const value of Object.values(item)) {
            if (value === "" || value === null || value === undefined) {
                return false;
            }
        }
        return true;
    }
}

//-------------Services---------

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>, private Validator: IValidation<T>) { }

    create(item: T) {
        if (!this.Validator.validate(item)) return false
        return this.repository.create(item);
    }

    read() {
        return this.repository.read();
    }

    update(item: T) {
        if (!this.Validator.validate(item)) return false
        return this.repository.update(item);
    }

    delete(id: any) {
        return this.repository.delete(id)
    }

}

//------UI---------

// export class MenuConsole implements IView {

//     constructor(
//         private studentMenu: IView,
//         private bookMenu: IView,
//         private loanMenu: IView
//     ) { }

//     execute() {

//         let run = true;

//         while (run) {

//             this.readMenu();

//             const option = Number(prompt("Seleccione: "));

//             switch (option) {

//                 case 1:
//                     this.studentMenu.execute();
//                     break;

//                 case 2:
//                     this.bookMenu.execute();
//                     break;

//                 case 3:
//                     this.loanMenu.execute();
//                     break;

//                 case 0:
//                     run = false;
//             }

//         }

//     }

//     private readMenu(): void {
//         console.log("\n=============================================");
//         console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
//         console.log("=============================================");
//         const opciones: string[] = [
//             "1. Registrar, Eliminar, Ver, Actualizar estudiante",
//             "2. Registrar, Eliminar, Ver, Actualizar libro",
//             "3. Prestar libro, Devolver libro,  Mostrar prestamos",
//             "0. Salir"
//         ];
//         for (const opcion of opciones) {
//             console.log(opcion);
//         }
//     }

// }

// export class Studentconsole implements IView {
//     constructor(private studentservice: IService<Student>, private loanservice: IService<Loan>) { }

//     execute() {
//         let run = true;
//         while (run) {
//             this.readMenu();
//             const option = Number(prompt("Seleccione: "));

//             switch (option) {
//                 case 1:
//                     this.createStudent();
//                     break;
//                 case 2:
//                     this.deletestudent();
//                     break;
//                 case 3:
//                     this.updatestudent();
//                     break;
//                 case 4:
//                     this.readstudent();
//                     break
//                 case 0:
//                     run = false;
//                     break;
//             }
//         }
//     }

//     private readMenu(): void {
//         const opciones: string[] = [
//             "1. Registrar estudiante",
//             "2. Borrar estudiante",
//             "3. Actualizar estudiante",
//             "4. Mostrar estudiantes",
//             "0. Salir"
//         ];
//         for (const opcion of opciones) {
//             console.log(opcion);
//         }
//     }

//     private createStudent() {
//         const student = this.inputstudent();
//         let students = this.studentservice.read();
//         let indexstudent = students.findIndex((item: Student) => item.id === student.id);

//         if (indexstudent !== -1) {
//             console.log("Este estudiante ya fue registrado con este id");
//             return;
//         }

//         const result: boolean = this.studentservice.create(student);
//         console.log(result ? "Estudiante registrado" : "No se pudo registrar");
//     }

//     private deletestudent() {
//         this.readstudent();
//         const id = this.inputid();
//         let activeLoans: Loan[] = this.loanservice.read();
//         let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

//         if (studentactiveloan.length > 0) {
//             console.log("El estudiante no puede ser eliminado, ya que tiene prestamos")
//             return;
//         }

//         const status: boolean = this.studentservice.delete(id);
//         console.log(status ? "Estudiante eliminado" : "No se pudo eliminar");
//     }

//     private updatestudent() {
//         this.readstudent();
//         const id = this.inputid();
//         let students = this.studentservice.read();
//         let findstudent = students.filter((item: Student) => item.id === id)[0];
//         if (!findstudent) {
//             console.log("Estudiante no encontrado");
//             return;
//         }

//         const student = this.inputstudent();
//         student.id = findstudent.id
//         const newstudent: boolean = this.studentservice.update(student);
//         console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
//     }

//     private readstudent() {
//         let students: Student[] = this.studentservice.read();
//         let studentsview = students.map(student => ({
//             id: student.id,
//             nombre: student.name,
//             identificacion: student.identification,
//             grado: student.schoolgrade
//         }));

//         console.table(studentsview);
//     }

//     private inputstudent(): Student {

//         const name = prompt("Nombre: ");
//         if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
//             console.log("El nombre no puede estar vacio y solo puede contener letras");
//         }

//         const identification = prompt("Identificación: ");
//         if (!identification || !/^\d+$/.test(identification)) {
//             console.log("La identificación no puede estar vacio y debe ser numérica");
//         }

//         const schoolgrade = prompt("Grado Escolar: ");
//         if (!schoolgrade) {
//             console.log("El grado escolar no puede estar vacío");
//         }

//         const id = Math.random().toString();

//         return { id, name, identification, schoolgrade };
//     }

//     private inputid() {
//         const id = prompt("ID: ");
//         if (!id) {
//             console.log("El ID no puede estar vacío");
//         }
//         return id
//     }
// }

// export class Bookconsole implements IView {
//     constructor(private bookservice: IService<Book>) { }

//     execute() {
//         let run = true;
//         while (run) {
//             this.readMenu();
//             const option = Number(prompt("Seleccione: "));

//             switch (option) {
//                 case 1:
//                     this.createbook();
//                     break;
//                 case 2:
//                     this.deletebook();
//                     break;
//                 case 3:
//                     this.updatebook();
//                     break;
//                 case 4:
//                     this.readbook();
//                     break
//                 case 0:
//                     run = false;
//                     break;
//             }
//         }
//     }

//     private readMenu(): void {
//         const opciones: string[] = [
//             "1. Registrar libro",
//             "2. Borrar libro",
//             "3. Actualizar libro",
//             "4. Mostrar libros",
//             "0. Salir"
//         ];
//         for (const opcion of opciones) {
//             console.log(opcion);
//         }
//     }

//     private createbook() {
//         const book = this.inputbook();
//         let books = this.bookservice.read();
//         let indexbook = books.findIndex((item: Book) => item.id === book.id);

//         if (indexbook !== -1) {
//             console.log("Este libro ya fue registrado con este id")
//             return;
//         }

//         const result: boolean = this.bookservice.create(book);
//         console.log(result ? "Libro registrado" : "No se pudo registrar");
//     }

//     private deletebook() {
//         this.readbook();
//         const id = this.inputid();
//         let books: Book[] = this.bookservice.read();
//         let book = books.filter(findbook => findbook.id = id)[0];
//         if (!book.available) {
//             console.log("El libro esta prestado y no posible eliminar");
//             return;
//         }

//         const status: boolean = this.bookservice.delete(id);
//         console.log(status ? "Libro eliminado" : "No se pudo eliminar");
//     }

//     private updatebook() {
//         this.readbook();
//         const id = this.inputid();
//         let books = this.bookservice.read();
//         let findbook = books.filter((item: Book) => item.id === id)[0];
//         if (!findbook) {
//             console.log("El libro no fue encontrado");
//             return
//         }
//         const book = this.inputbook();
//         book.id = findbook.id
//         const newbook: boolean = this.bookservice.update(book);
//         console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
//     }

//     private readbook() {

//         let books: Book[] = this.bookservice.read();
//         let booksview = books.map(book => ({
//             id: book.id,
//             titulo: book.title,
//             autor: book.author,
//             disponible: book.available ? "Sí" : "No"
//         }));

//         console.table(booksview);
//     }

//     private inputbook(): Book {

//         let title = prompt("Titulo: ");
//         if (!title || title.trim() === "") {
//             console.log("El titulo no puede estar vacio");
//         }

//         let author = prompt("Autor: ");
//         if (!author || author.trim() === "") {
//             console.log("El autor no puede estar vacío");
//         }

//         const available = true;
//         const id = Math.random().toString();

//         return {
//             id,
//             title,
//             author,
//             available
//         };
//     }

//     private inputid() {
//         let id = prompt("ID: ");
//         if (!id || id.trim() === "") {
//             console.log("El ID no puede estar vacío");
//         }
//         return id
//     }
// }

// export class LoanConsole implements IView {

//     constructor(private studentservice: IService<Student>, private bookservice: IService<Book>, private loanservice: IService<Loan>) { }

//     execute() {
//         let run = true;

//         while (run) {

//             this.readMenu();

//             const option = Number(prompt("Seleccione: "));

//             switch (option) {

//                 case 1:
//                     this.lendbook();
//                     break;

//                 case 2:
//                     this.returnbook();
//                     break;

//                 case 3:
//                     this.readloan();
//                     break;

//                 case 0:
//                     run = false;
//                     break;
//             }

//         }

//     }

//     private readMenu(): void {
//         const opciones: string[] = [
//             "1. Prestar libro",
//             "2. Devolver libro",
//             "3. Ver prestamos",
//             "0. Salir"
//         ];
//         for (const opcion of opciones) {
//             console.log(opcion);
//         }
//     }

//     private lendbook() {
//         console.table(this.studentservice.read())
//         console.table(this.bookservice.read())
//         let idbook = this.inputidbook();
//         let idstudent = this.inputidstudent();

//         let books: Book[] = this.bookservice.read();
//         const book = books.filter((book: Book) => book.id === idbook)[0];
//         if (!book || !book.available) {
//             console.log("El libro no existe o no esta disponible")
//             return;
//         }

//         let students: Student[] = this.studentservice.read();
//         const student = students.filter((student: Student) => student.id === idstudent)[0];

//         if (!student) {
//             console.log("El estudiante no existe")
//             return;
//         }

//         const loan: Loan = {
//             id: Math.random().toString(),
//             book,
//             student,
//             loanDate: new Date()
//         };

//         let status = this.loanservice.create(loan);
//         book.available = false;
//         this.bookservice.update(book);

//         console.log(status ? "Prestamo existoso" : "No se pudo realizar el prestamo");
//     }

//     private returnbook() {
//         let idbook = this.inputidbook();
//         let loans: Loan[] = this.loanservice.read()
//         const loan = loans.find(loan => loan.book.id === idbook);
//         if (!loan) {
//             console.log("El libro no existe con este id")
//             return;
//         }

//         loan.returndate = new Date();
//         const status = this.loanservice.update(loan);
//         loan.book.available = true;
//         this.bookservice.update(loan.book);
//         console.log(status ? "Libro devuelto" : "No se pudo devolver")
//     }

//     private readloan() {
//         let loans: Loan[] = this.loanservice.read()
//         console.log("\n===== PRÉSTAMOS =====")

//         if (loans.length === 0) {
//             console.log("No hay préstamos")
//             return
//         }

//         loans.forEach(loan => {
//             console.log({
//                 id: loan.id,
//                 Book: loan.book.title,
//                 Student: loan.student.name,
//                 fechaprestamo: loan.loanDate,
//                 fechaDevolucion: loan.returndate || "Pendiente"
//             })
//         })
//     }

//     private inputidbook(){
//         let idbook = prompt("ID Libro: ");
//         if (!idbook || idbook.trim() === "") {
//             console.log("El ID no puede estar vacío");
//         }

//         return idbook
//     }

//     private inputidstudent(){
//         let idstudent = prompt("ID Estudiante: ");
//         if (!idstudent || idstudent.trim() === "") {
//             console.log("El ID no puede estar vacío");
//         }

//         return idstudent
//     }
// }

export class LoginWeb implements IView {

    execute(): void {

        document.getElementById("loginForm")!.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = (document.getElementById("username") as HTMLInputElement).value;
            const pass = (document.getElementById("password") as HTMLInputElement).value;

            if (user === "admin" && pass === "1234") {
                document.getElementById("login")!.classList.add("d-none");
                document.getElementById("dashboard")!.classList.remove("d-none");
            } else {
                alert("Credenciales incorrectas");
            }
        });

    }
}

class Studentweb implements IView {

    constructor(
        private studentMenu: IView,
    ) { }

    execute() {
        document.body
    }

}

class Bookweb implements IView {

    constructor(
        private bookMenu: IView,
    ) { }

    execute() {
        document.body
    }

}
class Loanweb implements IView {

    constructor(
        private bookMenu: IView,
    ) { }

    execute() {
        document.body
    }

}

//-----CLASE-CONSUMIDORA-APP--------------

export class App {
    constructor(private menu: IView) { }

    run(): void {
        this.menu.execute();
    }
}

//-----PUNTO-DE-ENTRADA--------------

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const studentValidator = new Validation<Student>();
const bookValidator = new Validation<Book>();
const loanValidator = new Validation<Loan>();

const loanservice = new Service<Loan>(repositoryloan, loanValidator);
const studentservice = new Service<Student>(repositorystudent, studentValidator);
const bookservice = new Service<Book>(repositorybook, bookValidator);

// const studentconsole = new Studentconsole(studentservice, loanservice);
// const bookconsole = new Bookconsole(bookservice);
// const loanconsole = new LoanConsole(studentservice, bookservice, loanservice);

// const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

// const app = new App(menu);
// app.run();

const loginweb = new LoginWeb()

const app = new App(loginweb);
app.run();
