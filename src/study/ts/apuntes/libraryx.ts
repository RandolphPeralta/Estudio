import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

//------DOMAIN-----------

//---------interfaces--------
export interface ISave<T> {
    create(some: T): any;
    delete(id: any): any;
}

export interface IUpdate<T> extends ISave<T> {
    update(some: any): any;
    read(): T[];
}

export interface IRepository<T> extends IUpdate<T> {
    findbyid(id: string): Array<T>
}

export interface IView {
    execute(): any;
}

export interface Icreate {
    create(item: any): any;
}

export interface Idelete {
    delete(id: string): any
}

export interface Iupdate {
    update(item: any): any;
}

export interface Iread {
    read(): any;
}

export interface Iserviceloan extends Iread {
    returnBook(bookId: string): any;
    create(item: any): any;
    delete(id: string): any;
    update(item:any): any;
}

export interface Iservicestudent extends Icreate, Idelete, Iupdate, Iread {

}

export interface Iservicebook extends Icreate, Idelete, Iupdate, Iread {

}

export interface IService<T> {
    create(item: T): any;
    read(): any;
    update(item: T): any;
    delete(id: any): any;
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

export class MemoryRAM<T> implements IRepository<T> {

    private memory: T[] = [];

    create(some: any): boolean {
        let index = this.memory.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
            return false;
        }

        this.memory.push(some)
        return true;
    }

    delete(id: any): boolean {
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

//-------------Services---------

export class Studentservice implements Iservicestudent {
    constructor(private studentRepository: IRepository<Student>) { }

    create(student: Student): boolean {
        return this.studentRepository.create(student);
    }

    delete(id: string) {
        return this.studentRepository.delete(id);
    }

    update(student: Student): boolean {
        return this.studentRepository.update(student);
    }

    read(): Student[] {
        return this.studentRepository.read();
    }
}

export class Bookservice implements Iservicebook {
    constructor(private bookRepository: IRepository<Book>) { }

    create(book: Book): boolean {
        return this.bookRepository.create(book);
    }

    delete(id: string) {
        return this.bookRepository.delete(id);
    }

    update(book: Book): boolean {
        return this.bookRepository.update(book);
    }

    read(): Book[] {
        return this.bookRepository.read();
    }
}

export class Loanservice implements Iserviceloan {
    constructor(
        private loanrepository: IRepository<Loan>,
        private bookrepository: IRepository<Book>,
        private studentrepository: IRepository<Student>) { }

    create(loan: Loan) {
        return this.loanrepository.create(loan)
    }

    delete(id: string) {
        return this.loanrepository.delete(id)
    }

    update(loan: Loan) {
        return this.loanrepository.update(loan)
    }

    returnBook(bookId: string) {
        const loan = this.loanrepository.read().find(loan => loan.book.id === bookId);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);

        return true
    }

    read() {
        return this.loanrepository.read();
    }
}

//------UI---------

export class MenuConsole implements IView {

    constructor(
        private studentMenu: IView,
        private bookMenu: IView,
        private loanMenu: IView
    ) { }

    execute() {

        let run = true;

        while (run) {

            this.readMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.studentMenu.execute();
                    break;

                case 2:
                    this.bookMenu.execute();
                    break;

                case 3:
                    this.loanMenu.execute();
                    break;

                case 0:
                    run = false;
            }

        }

    }

    private readMenu(): void {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        const opciones: string[] = [
            "1. Registrar, Eliminar, Ver, Actualizar,  Buscar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar,  Buscar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

}

export class Studentconsole implements IView {
    constructor(private studentservice: Iservicestudent, private loanservice: Iserviceloan) { }

    execute() {
        let run = true;
        while (run) {
            this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.createStudent();
                    break;
                case 2:
                    this.deletestudent();
                    break;
                case 3:
                    this.updatestudent();
                    break;
                case 4:
                    this.readstudent();
                    break
                case 5:
                    this.searchstudent();
                    break
                case 0:
                    run = false;
                    break;
            }
        }
    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Registrar estudiante",
            "2. Borrar estudiante",
            "3. Actualizar estudiante",
            "4. Mostrar estudiantes",
            "5. Buscar estudiate",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private inputstudent(): Student {

        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }

        const name = prompt("Nombre: ");
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
            return name;
        }

        const identification = prompt("Identificación: ");
        if (!identification || !/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
            return identification;
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade || schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
            return schoolgrade;
        }

        return { id, name, identification, schoolgrade };
    }

    private createStudent() {
        const student = this.inputstudent();
        if (!student.id || !student.identification || !student.name || !student.schoolgrade) {
            return;
        }
        const result: boolean = this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private deletestudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return;
        }

        let activeLoans: Loan[] = this.loanservice.read()
        let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (studentactiveloan.length > 0) {
            return;
        }

        const status: boolean = this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo registrar");
    }

    private updatestudent() {
        const student = this.inputstudent();
        const newstudent: boolean = this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
    }

    private readstudent() {
        let students: Student[] = this.studentservice.read()
        let studentsview = students.map(student => ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }));

        console.table(studentsview);
    }

    private searchstudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let students = this.studentservice.read();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class Bookconsole implements IView {
    constructor(private bookservice: Iservicebook) { }

    execute() {
        let run = true;
        while (run) {
            this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.createbook();
                    break;
                case 2:
                    this.deletebook();
                    break;
                case 3:
                    this.updatebook();
                    break;
                case 4:
                    this.readbook();
                    break
                case 5:
                    this.searchbook();
                    break
                case 0:
                    run = false;
                    break;
            }
        }
    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Registrar libro",
            "2. Borrar libro",
            "3. Actualizar libro",
            "4. Mostrar libros",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private inputbook(): Book {

        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }

        const title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            console.log("El titulo no puede estar vacío");
            return title;
        }

        const author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            console.log("El autor no puede estar vacío");
            return author
        }
        const available = true;

        return {
            id,
            title,
            author,
            available
        };
    }

    private createbook() {
        const book = this.inputbook();
        if (!book.id || !book.title || !book.author)
            {return}
        const result: boolean = this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private deletebook() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }
        let books: Book[] = this.bookservice.read();
        let book = books.filter(findbook => findbook.id = id)[0]
        if (!book.available) {
            return;
        }
        const status: boolean = this.bookservice.delete(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    }

    private updatebook() {
        const student = this.inputbook();
        const newbook: boolean = this.bookservice.update(student);
        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
    }

    private readbook() {

        let books: Book[] = this.bookservice.read()

        let booksview = books.map(book => ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }));

        console.table(booksview);
    }

    private searchbook() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let students = this.bookservice.read();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class LoanConsole implements IView {

    constructor(private studentservice: Iservicestudent, private bookservice: Iservicebook , private loanservice: Iserviceloan) { }

    execute() {
        let run = true;

        while (run) {

            this.readMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.lendbook();
                    break;

                case 2:
                    this.returnbook();
                    break;

                case 3:
                    this.readloan();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private lendbook() {

        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idbook
        }

        let idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idstudent
        }

        let books: Book[] = this.bookservice.read();
        const book = books.filter((book: any) => book.id === idbook)[0];

        if (!book) {
            return false;
        }

        if (!book.available) {
            return false;
        }

        let students: Student[] = this.studentservice.read();
        const student = students.filter((student: Student) => student.id === idstudent)[0];

        if (!student) {
            return false;
        }

        let loanDate = new Date();

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate
        };

        let status = this.loanservice.create(loan);
        book.available = false;
        this.bookservice.update(book);

        console.log(status? "Prestamo existoso" : "No se pudo realizar el prestamo")

    //     book.available = false;
    //     this.bookrepository.update(book);

    //     return true
    // }
        // let status = this.loanservice.lendBook(idbook, idstudent);
        // if (!status) {
        //     console.log("No se puede hacer el prestamo")
        // } else {
        //     console.log("Prestamo exitoso")
        // }
    }

    private returnbook() {
        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idbook
        }
        let loans: Loan[] = this.loanservice.read()
        const loan = loans.find(loan => loan.book.id === idbook);
        if (!loan) {
            return;
        }

        loan.returndate = new Date();
        this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);

        let status = this.loanservice.returnBook(idbook);
        if (!status) {
            console.log("No se pudo devoler")
        } else {
            console.log("Libro devuelto")
        }
    }

    private readloan() {
        let loans: Loan[] = this.loanservice.read()
        console.log("\n===== PRÉSTAMOS =====")

        if (loans.length === 0) {
            console.log("No hay préstamos")
            return
        }

        loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaprestamo: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })
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

const loanservice = new Loanservice(repositoryloan, repositorybook, repositorystudent);
const studentservice = new Studentservice(repositorystudent);
const bookservice = new Bookservice(repositorybook);

const studentconsoletest = new Studentconsole(studentservice, loanservice);
const bookconsoletest = new Bookconsole(bookservice);
const loanconsole = new LoanConsole(studentservice, bookservice,loanservice);

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);

const app = new App(menu);
app.run();