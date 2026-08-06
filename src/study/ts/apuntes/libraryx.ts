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

export interface IAddidionalaction<T> extends IUpdate<T> {
    findbyid(id: string): Array<T>
}

export interface IView {
    execute(): any;
}

export interface IService<T> {
    create(item: T): any;
    read(): any;
    update(item: T): any;
    delete(id: any): any;
}

export interface IApprobation<T> {
    approve(item: T): any;
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

export class Approbation<T> implements IApprobation<T> {
    approve(item: any) {

    for(const value of Object.values(item)){
        if(value === "" || value === null || value === undefined){
            return false;
        }
    }
    return true;
}
}

//-------------Services---------

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>, private approbator: IApprobation<T>) { }

    create(item: T) {
        if (!this.approbator.approve(item)) return false
        return this.repository.create(item);
    }

    read() {
        return this.repository.read();
    }

    update(item: T) {
        if (!this.approbator.approve(item)) return false
        return this.repository.update(item);
    }

    delete(id: any) {
        return this.repository.delete(id)
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
    constructor(private studentservice: IService<Student>, private loanservice: IService<Loan>) { }

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

    private createStudent() {
        const student = this.inputstudent();
        const result: boolean = this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private deletestudent() {
        const id = this.inputid();
        let activeLoans: Loan[] = this.loanservice.read();
        let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (studentactiveloan.length > 0) {
            return;
        }

        const status: boolean = this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo eliminar");
    }

    private updatestudent() {
        const student = this.inputstudent();
        const newstudent: boolean = this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
    }

    private readstudent() {
        let students: Student[] = this.studentservice.read();
        let studentsview = students.map(student => ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }));

        console.table(studentsview);
    }

    private searchstudent() {
        const id = this.inputid();
        let students = this.studentservice.read();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }

    private inputstudent(): Student {

        const id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }

        const name = prompt("Nombre: ");
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre no puede estar vacio y solo puede contener letras");
            return name;
        }

        const identification = prompt("Identificación: ");
        if (!/^\d+$/.test(identification)) {
            console.log("La identificación no puede estar vacio y debe ser numérica");
            return identification;
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
            return schoolgrade;
        }

        return { id, name, identification, schoolgrade };
    }

    private inputid() {
        const id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}

export class Bookconsole implements IView {
    constructor(private bookservice: IService<Book>) { }

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

    private createbook() {
        const book = this.inputbook();
        const result: boolean = this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private deletebook() {
        const id = this.inputid()
        let books: Book[] = this.bookservice.read();
        let book = books.filter(findbook => findbook.id = id)[0];
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

        let books: Book[] = this.bookservice.read();
        let booksview = books.map(book => ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }));

        console.table(booksview);
    }

    private searchbook() {
        const id = this.inputid()
        let students = this.bookservice.read();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }

    private inputbook(): Book {

        const id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }

        const title = prompt("Titulo: ");
        if (title.trim() === "") {
            console.log("El titulo no puede estar vacio");
            return title;
        }

        const author = prompt("Autor: ");
        if (author.trim() === "") {
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

    private inputid() {
        const id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}

export class LoanConsole implements IView {

    constructor(private studentservice: IService<Student>, private bookservice: IService<Book>, private loanservice: IService<Loan>) { }

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

        let idbook = this.inputidbook();
        let idstudent = this.inputidstudent();

        let books: Book[] = this.bookservice.read();
        const book = books.filter((book: any) => book.id === idbook)[0];
        if (!book || !book.available) {
            return false;
        }

        let students: Student[] = this.studentservice.read();
        const student = students.filter((student: Student) => student.id === idstudent)[0];

        if (!student) {
            return false;
        }

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate: new Date()
        };

        let status = this.loanservice.create(loan);
        book.available = false;
        this.bookservice.update(book);

        console.log(status ? "Prestamo existoso" : "No se pudo realizar el prestamo");
    }

    private returnbook() {
        let idbook = this.inputidbook();
        let loans: Loan[] = this.loanservice.read()
        const loan = loans.find(loan => loan.book.id === idbook);
        if (!loan) {
            console.log("El libro no existe con este id")
            return;
        }

        loan.returndate = new Date();
        const status = this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);
        console.log(status ? "Libro devuelto" : "No se pudo devolver")
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

    private inputidbook(){
        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
        }

        return idbook
    }

    private inputidstudent(){
        let idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            console.log("El ID no puede estar vacío");
        }

        return idstudent
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

const studentapprobator = new Approbation<Student>();
const bookapprobator = new Approbation<Book>();
const loanapprobator = new Approbation<Loan>();

const loanservice = new Service<Loan>(repositoryloan, loanapprobator);
const studentservice = new Service<Student>(repositorystudent, studentapprobator);
const bookservice = new Service<Book>(repositorybook, bookapprobator);

const studentconsoletest = new Studentconsole(studentservice, loanservice);
const bookconsoletest = new Bookconsole(bookservice);
const loanconsole = new LoanConsole(studentservice, bookservice, loanservice);

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);

const app = new App(menu);
app.run();