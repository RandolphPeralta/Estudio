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

export interface IRegister {
    register(item: any): any;
}

export interface IEraser {
    erase(id: string): any
}

export interface IActualize {
    actualize(item: any): any;
}

export interface IShow {
    show(): any;
}

export interface IUsecaseloan extends IShow {
    lendBook(bookId: string, studentId: string): any;
    returnBook(bookId: string): any;
}

export interface IStudentUseCase extends IRegister, IEraser, IActualize, IShow {

}

export interface IBookUseCase extends IRegister, IEraser, IActualize, IShow {

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

//--------APPLICATION-----

//-------------Usescases-------

export class StudentUseCase implements IStudentUseCase {
    constructor(
        private studentRepository: IRepository<Student>,
        private loanRepository: IRepository<Loan>
    ) { }

    register(student: Student): boolean {
        if (!student.id || !student.identification || !student.name) {
            return false;
        }
        return this.studentRepository.create(student);
    }

    erase(id: string) {
        const activeLoans = this.loanRepository.read().filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (activeLoans.length > 0) {
            return false;
        }

        return this.studentRepository.delete(id);
    }

    actualize(student: Student): boolean {
        return this.studentRepository.update(student);
    }

    show(): Student[] {
        return this.studentRepository.read();
    }

    getById(id: string): Student | null {
        const result = this.studentRepository.findbyid(id);
        return result.length > 0 ? result[0] : null;
    }
}

export class BookUseCase implements IBookUseCase {
    constructor(
        private bookRepository: IRepository<Book>,
    ) { }

    register(book: Book): boolean {
        if (!book.id || !book.title || !book.author) 
            { return false; }
        book.available = true;
        return this.bookRepository.create(book);
    }

    erase(id: string) {
        const book = this.getById(id);
        if (!book) { return false; }

        if (!book.available) {
            return false;
        }

        return this.bookRepository.delete(id);
    }

    actualize(book: Book): boolean {
        const newbook = this.getById(book.id);
        if (!newbook.available) {
            return false;
        }
        return this.bookRepository.update(book);
    }

    show(): Book[] {
        return this.bookRepository.read();
    }

    getById(id: string) {
        return this.bookRepository.findbyid(id)[0];
    }
}

export class Loanusecase implements IUsecaseloan {
    constructor(
        private loanrepository: IRepository<Loan>,
        private bookrepository: IRepository<Book>,
        private studentrepository: IRepository<Student>) { }

    lendBook(bookId: string, studentId: string) {
        const idbook = bookId
        const book = this.bookrepository.findbyid(idbook)[0];

        if (!book) {
            return false;
        }

        if (!book.available) {
            return false;
        }

        const idstudent = studentId
        const student = this.studentrepository.findbyid(idstudent)[0];

        if (!student) {
            return false;
        }

        const loanDate = new Date();
        const returndate = new Date(loanDate);
        returndate.setDate(loanDate.getDate() + 3);

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate,
            returndate
        };

        const existingLoan = this.loanrepository.findbyid(loan.id);

        if (existingLoan.length > 0) {
            return false;
        }

        this.loanrepository.create(loan);

        book.available = false;
        this.bookrepository.update(book);

        return true
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

    show() {
        return this.loanrepository.read()
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

export class Studentconsole implements IView {
    constructor(private studentusecase: IStudentUseCase) { }

    execute() {
        let run = true;
        while (run) {
            this.showMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.registerStudent();
                    break;
                case 2:
                    this.erasestudent();
                    break;
                case 3:
                    this.actualizestudent();
                    break;
                case 4:
                    this.showstudent();
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

    private showMenu(): void {
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
        }

        const name = prompt("Nombre: ");
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
        }

        const identification = prompt("Identificación: ");
        if (!/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade || schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
        }

        return { id, name, identification, schoolgrade };
    }

    private registerStudent() {
        const student = this.inputstudent();
        const result = this.studentusecase.register(student);
        if (!result) {
            console.log("El estudiante no se puede registrar")
        } else {
            console.log("Estudiante registrado")
        }
    }

    private erasestudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const status = this.studentusecase.erase(id);
        if (!status) {
            console.log("El estudiante no se encuentra con este id")
        } else {
            console.log("Estudiante Eliminado")
        }
    }

    private actualizestudent() {
        const student = this.inputstudent();
        const existing = this.studentusecase.actualize(student);
        if (!existing) {
            console.log("El estudiante no fue actualizado")
        } else {
            console.log("Estudiante actualizado")
        }
    }

    private showstudent() {
        let students: Student[] = this.studentusecase.show()
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
        let students = this.studentusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class Bookconsole implements IView {
    constructor(private bookusecase: IBookUseCase) { }

    execute() {
        let run = true;
        while (run) {
            this.showMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.registerbook();
                    break;
                case 2:
                    this.erasebook();
                    break;
                case 3:
                    this.actualizebook();
                    break;
                case 4:
                    this.showbook();
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

    private showMenu(): void {
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
            throw new Error("El ID no puede estar vacío");
        }
        const title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            throw new Error("El titulo no puede estar vacío");
        }
        const author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            throw new Error("El autor no puede estar vacío");
        }
        const available = true;

        return {
            id,
            title,
            author,
            available
        };
    }

    private registerbook() {
        const student = this.inputbook();
        const result = this.bookusecase.register(student);
        if (!result) {
            console.log("El libro ya existe con este id")
        } else {
            console.log("Libro registrado")
        }
    }

    private erasebook() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const status = this.bookusecase.erase(id);
        if (!status) {
            console.log("El libro no se encuentra con este id")
        } else {
            console.log("Libro eliminado")
        }
    }

    private actualizebook() {
        const student = this.inputbook();
        const existing = this.bookusecase.actualize(student);
        if (!existing) {
            console.log("El Libro no fue encontrado y no fue actualizado")
        } else {
            console.log("Libro actualizado")
        }
    }

    private showbook() {

        let books: Book[] = this.bookusecase.show()

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
        let students = this.bookusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class LoanConsole implements IView {

    constructor(private usecaseloan: IUsecaseloan) { }

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
                    this.readloan();
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
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private lendbook() {
        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let status = this.usecaseloan.lendBook(idbook, idstudent);
        if (!status) {
            console.log("No se puede hacer el prestamo")
        } else {
            console.log("Prestamo exitoso")
        }
    }

    private returnbook() {
        const idBook = prompt("ID Libro: ");
        let status = this.usecaseloan.returnBook(idBook);
        if (!status) {
            console.log("No se pudo devoler")
        } else {
            console.log("Libro devuelto")
        }
    }

    private readloan() {
        let loans: Loan[] = this.usecaseloan.show()
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

const loanusecase = new Loanusecase(repositoryloan, repositorybook, repositorystudent)
const studentusecase = new StudentUseCase(repositorystudent, repositoryloan)
const bookusecase = new BookUseCase(repositorybook)

const studentconsoletest = new Studentconsole(studentusecase);
const bookconsoletest = new Bookconsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase)

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);

const app = new App(menu);
app.run();