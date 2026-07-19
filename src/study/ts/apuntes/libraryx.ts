import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

export interface ISave<T> {
    create(some: T): any;
    delete(id: any): any;
}

export interface IAction<T> extends ISave<T> {
    update(some: any): any;
    read(): T[];
}

export interface IAdditionalAction<T> extends IAction<T> {
    findbyid(id: string): Array<T>
}

export interface IExtraAction<T> extends IAdditionalAction<T> {
    createbyid(id: any, some: any): any;
    updatebyid(id: any, some: any): any;
}

export interface IView {
    execute(): any;
}

//---------------------------------------

export class MemoryRAM<T> implements IExtraAction<T> {

    private memory: T[] = [];

    create(some: any): boolean {
        let index = this.memory.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
            return false;
        }

        this.memory.push(some)
        return true;
    }

    createbyid(id: any, some: T): boolean {
        return this.create({
            ...some,
            id
        });
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

    updatebyid(id: any, some: T): boolean {
        return this.update({
            ...some,
            id
        });
    }

    read(): T[] {
        return this.memory;
    }

    findbyid(id: string) {
        return this.memory.filter((item: any) => item.id === id)
    }
}

//------------------------------

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

//---------------

export class MenuConsole implements IView {

    constructor(
        private studentMenu: IView,
        private bookMenu: IView,
        private loanMenu: IView
    ) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

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

    private showMenu(): void {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        const opciones: string[] = [
            "1. Registrar, Eliminar, Ver, Actualizar,  Buscar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar,  Buscar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos, Buscar Prestamo, Actualizar Prestamo",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

}

//-----------------------------

export class StudentUseCase implements IAdditionalAction<Student> {

    constructor(private studentservice: IAdditionalAction<Student>) { }

    create(student: Student): boolean {

        const existing = this.studentservice.findbyid(student.id);

        if (existing.length > 0) {
            return false;
        }

        return this.studentservice.create(student);
    }

    delete(id: string): boolean {

        return this.studentservice.delete(id);

    }

    update(student: Student): boolean {

        const existing = this.studentservice.findbyid(student.id);

        if (existing.length === 0) {
            return false;
        }

        return this.studentservice.update(student);

    }

    read(): Student[] {

        return this.studentservice.read();

    }

    findbyid(id: string): Student[] {

        const student = this.studentservice.findbyid(id)

        return this.studentservice.findbyid(id);

    }

}

export class StudentConsole implements IView {

    constructor(private studentservice: IAdditionalAction<Student>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.createstudent();
                    break;

                case 2:
                    this.deletestudent();
                    break;

                case 3:
                    this.readstudents();
                    break;

                case 4:
                    this.updatestudent();
                    break;

                case 5:
                    this.findbyidstudent();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Registrar estudiante",
            "2. Eliminar estudiante",
            "3. Ver estudiante",
            "4. Actualizar estudiante",
            "5. Buscar estudiante",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private readStudent(): Student {

        const id = prompt("ID: ");
        const name = prompt("Nombre: ");
        const identification = prompt("Identificación: ");
        const schoolgrade = prompt("Grado Escolar: ");

        return {
            id,
            name,
            identification,
            schoolgrade

        };

    }

    private createstudent() {

        const student = this.readStudent();

        const status = this.studentservice.create(student);

        if (status) {
            console.log("Estudiante registrado");
        } else {
            console.log("El estudiante ya existe.");
        }

    }

    private deletestudent() {

        const id = prompt("ID: ");

        const status = this.studentservice.delete(id);

        if (status) {
            console.log("Estudiante eliminado");
        } else {
            console.log("No existe un estudiante.");
        }

    }

    private updatestudent() {

        const student = this.readStudent();

        const status = this.studentservice.update(student);

        if (status) {
            console.log("Estudiante actualizado");
        } else {
            console.log("No existe un estudiante con ese ID.");
        }

    }

    private findbyidstudent() {

        const id = prompt("ID: ");

        const students = this.studentservice.findbyid(id);

        if (students.length === 0) {

            console.log("No encontrado");
            return;

        }

        console.table(students);

    }

    private readstudents() {

        console.table(
            this.studentservice.read()
        );

    }

}

//------------------------

export class BookUseCase implements IAdditionalAction<Book> {

    constructor(
        private bookservice: IAdditionalAction<Book>
    ) { }

    create(book: Book): boolean {

        const existing = this.bookservice.findbyid(book.id);

        if (existing.length > 0) {
            return false;
        }

        return this.bookservice.create(book);
    }

    delete(id: string): boolean {

        return this.bookservice.delete(id);

    }

    update(book: Book): boolean {

        const existing = this.bookservice.findbyid(book.id);

        if (existing.length === 0) {
            return false;
        }

        return this.bookservice.update(book);

    }

    read(): Book[] {

        return this.bookservice.read();

    }

    findbyid(id: string): Book[] {

        return this.bookservice.findbyid(id);

    }

}

export class BookConsole implements IView {

    constructor(private bookservice: IAdditionalAction<Book>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.create();
                    break;

                case 2:
                    this.delete();
                    break;

                case 3:
                    this.read();
                    break;

                case 4:
                    this.update();
                    break;

                case 5:
                    this.findbyid();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Registrar libro",
            "2. Eliminar libro",
            "3. Ver libro",
            "4. Actualizar libro",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private readBook(): Book {

        const id = prompt("ID: ");
        const title = prompt("Titulo: ");
        const author = prompt("Autor: ");
        const available = true

        return {
            id,
            title,
            author,
            available

        };

    }

    private create() {

        const student = this.readBook();

        const status = this.bookservice.create(student);

        if (status) {
            console.log("Libro registrado");
        } else {
            console.log("El libro ya existe.");
        }

    }

    private delete() {

        const id = prompt("ID: ");

        const status = this.bookservice.delete(id);

        if (status) {
            console.log("Libro eliminado");
        } else {
            console.log("No existe un libro con este id.");
        }

    }

    private update() {

        const book = this.readBook();

        const status = this.bookservice.update(book);

        if (status) {
            console.log("Libro actualizado");
        } else {
            console.log("No existe un libro con ese ID.");
        }

    }

    private findbyid() {

        const id = prompt("ID: ");

        const books = this.bookservice.findbyid(id);

        if (books.length === 0) {

            console.log("No encontrado");
            return;

        }

        console.table(books);

    }

    private read() {

        console.table(
            this.bookservice.read()
        );

    }

}

//----------------------

export class LoanUseCase implements IExtraAction<Loan> {

    constructor(private loanservice: IExtraAction<Loan>, private bookservice: IExtraAction<Book>, private studentservice: IExtraAction<Student>) { }

    create(Loan: Loan) {
        const existingLoan = this.loanservice.findbyid(Loan.id);
        if (existingLoan.length > 0) {
            return false
        }
        this.loanservice.create(Loan);
        return true
    }

    createbyid(idBook: string, idStudent: string): boolean {

        const book = this.bookservice.findbyid(idBook)[0];

        if (!book) {
            return false;
        }

        if (!book.available) {
            return false;
        }

        const student = this.studentservice.findbyid(idStudent)[0];

        if (!student) {
            return false;
        }

        const loan: Loan = {

            id: Math.random().toString(),
            book,
            student,
            loanDate: new Date()

        };

        const status = this.create(loan);

        if (!status) {
            return false;
        }

        book.available = false;

        this.bookservice.update(book);

        return true;

    }

    update(loan: Loan) {
        const existingLoan = this.loanservice.findbyid(loan.id);
        if (existingLoan.length > 0) {
            this.loanservice.update(loan)
            return true
        } else {
            return false
        }
    }

    updatebyid(id: any, date: Date) {
        const loan = this.loanservice.findbyid(id)[0];

        if (!loan) {
            return false;
        }

        loan.loanDate = date;

        return this.update(loan);
    }

    findbyid(idBook: string): Loan[] {
        return this.loanservice.findbyid(idBook);
    }

    delete(idBook: string) {
        const loan = this.loanservice.read().find(loan => loan.book.id === idBook && !loan.returndate);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();

        this.loanservice.update(loan);

        loan.book.available = true;

        this.bookservice.update(loan.book);

        return true;
    }
    read(): Loan[] {
        return this.loanservice.read();
    }

}

export class LoanConsole implements IView {

    constructor(private loanservice: IExtraAction<Loan>) { }

    execute() {
        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.create();
                    break;

                case 2:
                    this.delete();
                    break;

                case 3:
                    this.read();
                    break;

                case 4:
                    this.update();
                    break;

                case 5:
                    this.findbyid();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "4. Actualizar prestamo",
            "5. Buscar prestamo",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private create() {

        const idBook = prompt("ID Libro: ");

        const idStudent = prompt("ID Estudiante: ");

        const status = this.loanservice.createbyid(idBook, idStudent);

        if (status) {

            console.log("Libro prestado");

        } else {

            console.log("No fue posible realizar el préstamo");

        }

    }

    private delete() {

        const idBook = prompt("ID Libro: ");

        const status = this.loanservice.delete(idBook);

        console.log(
            status
                ? "Libro devuelto"
                : "No existe préstamo activo"
        );

    }

    private read() {

        const Loans = this.loanservice.read()

        console.log("\n===== PRÉSTAMOS =====")

        if (Loans.length === 0) {
            console.log("No hay préstamos")
            return
        }

        Loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })

    }

    private update() {

        const id = prompt("ID préstamo: ");

        const date = new Date(
            prompt("Fecha (YYYY-MM-DD): ")
        );

        const status = this.loanservice.updatebyid(id, date);

        console.log(
            status
                ? "Préstamo actualizado"
                : "No encontrado"
        );

    }

    private findbyid() {

        const idBook = prompt("ID Libro: ");

        const loan = this.loanservice.findbyid(idBook);

        if (!loan) {

            console.log("Libro disponible");

            return;

        }

        console.table(loan);

    }
}
//-------------------

export class App {
    constructor(private menu: IView) { }

    run(): void {
        this.menu.execute();
    }
}

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentusecase = new StudentUseCase(MemoryStudent);
const bookusecase = new BookUseCase(MemoryBook);
const loanusecase = new LoanUseCase(MemoryLoan, MemoryBook, MemoryStudent);

const studentconsole = new StudentConsole(studentusecase);
const bookconsole = new BookConsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();