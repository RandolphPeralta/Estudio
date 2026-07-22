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

export interface IView {
    execute(): any;
}

//---------------------------------------

export class MemoryRAM<T> implements IAdditionalAction<T> {

    private memory: T[] = [];

    create(some: any): boolean {
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

    constructor(private studentPersistence: IAdditionalAction<Student>) { }

    create(student: Student): boolean {

        const existing = this.studentPersistence.findbyid(student.id);

        if (existing.length > 0) {
            return false;
        }

        return this.studentPersistence.create(student);
    }

    delete(id: string): boolean {

        return this.studentPersistence.delete(id);

    }

    update(student: Student): boolean {

        const existing = this.studentPersistence.findbyid(student.id);

        if (existing.length === 0) {
            return false;
        }

        return this.studentPersistence.update(student);

    }

    read(): Student[] {

        return this.studentPersistence.read();

    }

    findbyid(id: string): Student[] {

        return this.studentPersistence.findbyid(id);

    }

}

//----------------------------

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
                    this.readstudent();
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

    private inputstudent(): Student {

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

        const student = this.inputstudent();

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

        const student = this.inputstudent();

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

    private readstudent() {

        console.table(
            this.studentservice.read()
        );

    }

}

//-------------------------------

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

//------------------------------------

export class BookConsole implements IView {

    constructor(private bookservice: IAdditionalAction<Book>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.createbook();
                    break;

                case 2:
                    this.deletebook();
                    break;

                case 3:
                    this.readbook();
                    break;

                case 4:
                    this.updatebook();
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

    private inputbook(): Book {

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

    private createbook() {

        const student = this.inputbook();

        const status = this.bookservice.create(student);

        if (status) {
            console.log("Libro registrado");
        } else {
            console.log("El libro ya existe.");
        }

    }

    private readbook() {

        console.table(
            this.bookservice.read()
        );

    }

    private updatebook() {

        const book = this.inputbook();

        const status = this.bookservice.update(book);

        if (status) {
            console.log("Libro actualizado");
        } else {
            console.log("No existe un libro con ese ID.");
        }

    }

    private deletebook() {

        const id = prompt("ID: ");

        const status = this.bookservice.delete(id);

        if (status) {
            console.log("Libro eliminado");
        } else {
            console.log("No existe un libro con este id.");
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



}


//----------------------

export class LoanUseCase implements IAdditionalAction<Loan> {

    constructor(private loanservice: IAdditionalAction<Loan>, private bookservice: IAdditionalAction<Book>, private studentservice: IAdditionalAction<Student>) { }

    create(loan: Loan): boolean {
        const book = loan.book;
        if (!book || !book.available) {
            return false;
        }

        const findbook = this.bookservice.findbyid(book.id)[0];
        if (!findbook) {
            return false;
        }

        const student = loan.student;
        if (!student) {
            return false;
        }

        const existingLoan = this.loanservice.findbyid(loan.id);
        if (existingLoan.length > 0) {
            return false;
        }

        const status = this.loanservice.create(loan);
        if (!status) {
            return false;
        }

        book.available = false;
        this.bookservice.update(book);

        return true;
    }


    findbyid(idloan: string): Loan[] {
        return this.loanservice.findbyid(idloan)
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

    read(): Loan[] {
        return this.loanservice.read();
    }
    
    delete(idbook: any) {
        const loan = this.loanservice.read().find(loan => loan.book.id === idbook && !loan.returndate);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();

        this.loanservice.update(loan);

        loan.book.available = true;

        this.bookservice.update(loan.book);

        return true;
    }

}

//-----------------------
export class LoanConsole implements IView {

    constructor(private loanservice: IAdditionalAction<Loan>, private bookservice: IAdditionalAction<Book>, private studentservice: IAdditionalAction<Student>) { }

    execute() {
        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.lendbook();
                    break;

                case 2:
                    this.returnbook();
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

    private lendbook() {

        const idbook = prompt("ID Libro: ");

        const idstudent = prompt("ID Estudiante: ");

        const loan: Loan = {

            id: Math.random().toString(),
            book: this.bookservice.findbyid(idbook)[0],
            student: this.studentservice.findbyid(idstudent)[0],
            loanDate: new Date()

        };

        const status = this.loanservice.create(loan);

        if (status) {

            console.log("Libro prestado");

        } else {

            console.log("No fue posible realizar el préstamo");

        }

    }

    private returnbook() {

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

        const loan: Loan = {
            id: id,
            book: this.loanservice.findbyid(id)[0].book,
            student: this.loanservice.findbyid(id)[0].student,
            loanDate: this.loanservice.findbyid(id)[0].loanDate,
            returndate: date
        };

        const status = this.loanservice.update(loan);

        console.log(
            status
                ? "Préstamo actualizado"
                : "No encontrado"
        );

    }

    private findbyid() {

        const idloan = prompt("ID del prestamo: ");

        const loan = this.loanservice.findbyid(idloan);

        if (!loan) {

            console.log("Libro disponible");

            return;

        }

        loan.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })

    }
}
// //-------------------

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
const loanconsole = new LoanConsole(loanusecase, bookusecase, studentusecase);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();