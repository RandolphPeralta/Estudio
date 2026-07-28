import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

//------DOMAIN-----------

//interfaces
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

//---usecases-interfaces----

export interface IRegister<T> {
    register(item: T): any;
}

export interface IEraser<T> {
    erase(id: string): any
}

export interface IActualize<T> {
    actualize(item: T): any;
}

export interface IShow {
    show(): any;
}

export interface IUseCases<T> extends IRegister<T>, IEraser<T>, IActualize<T>, IShow {

}

export interface IUseloan {
    lendBook(bookId: string, studentId: string): any;
    returnBook(bookId: string): any;
}

export interface IUseloancase extends IShow, IUseloan {

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

//----------INFRAESTRUCTURE/PERSISTENCIE--------------

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

//-------------Usescases-------

export class LoanUseCases implements IUseloan {
    constructor(
        private loanRepository: IRepository<Loan>,
        private bookRepository: IRepository<Book>,
        private studentRepository: IRepository<Student>
    ) { }

    lendBook(bookId: string, studentId: string): { success: boolean; message: string; loan?: Loan } {
        const book = this.bookRepository.findbyid(bookId)[0];
        if (!book) {
            return { success: false, message: "El libro no existe" };
        }
        if (!book.available) {
            return { success: false, message: "El libro no está disponible" };
        }

        const student = this.studentRepository.findbyid(studentId)[0];
        if (!student) {
            return { success: false, message: "El estudiante no existe" };
        }

        const activeLoans = this.loanRepository.read().filter(loan => loan.student.id === studentId && !loan.returndate);
        if (activeLoans.length >= 3) {
            return { success: false, message: "El estudiante tiene demasiados préstamos activos" };
        }

        const loanDate = new Date();
        const returndate = new Date(loanDate);
        returndate.setDate(loanDate.getDate() + 3);

        const loan: Loan = {
            id: this.generateLoanId(),
            book,
            student,
            loanDate,
            returndate
        };

        this.loanRepository.create(loan);
        book.available = false;
        this.bookRepository.update(book);

        return { success: true, message: "Libro prestado con devolución en 3 días", loan };
    }

    returnBook(bookId: string): { success: boolean; message: string } {
        const loan = this.loanRepository.read().find(loan => loan.book.id === bookId && !loan.returndate);
        if (!loan) {
            return { success: false, message: "No existe préstamo activo para este libro" };
        }

        loan.returndate = new Date();
        this.loanRepository.update(loan);
        loan.book.available = true;
        this.bookRepository.update(loan.book);

        return { success: true, message: "Libro devuelto" };
    }

    private generateLoanId(): string {
        return Math.random().toString(36).substring(2, 10);
    }

    // ... otros métodos
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

//--------------------

//prueba en console y usecase

export class Usecasetest<T> implements IUseCases<T> {

    constructor(private repository: IRepository<T>) { }

    register(item: any) {
        return this.repository.create(item);
    }

    erase(id: string) {
        return this.repository.delete(id);
    }

    actualize(item: any) {
        return this.repository.update(item);
    }

    show() {
        return this.repository.read()
    }
}

export class Loanusecase implements IUseloancase {
    constructor(
        private loanrepository: IRepository<Loan>,
        private bookrepository: IRepository<Book>,
        private studentrepository: IRepository<Student>){}

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

//----test-of-console------

export class Studentconsolestest implements IView {
    constructor(private studentusecase: IUseCases<Student>) { }

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

    private registerStudent() {
        const student = this.inputstudent();
        const result = this.studentusecase.register(student);
        if (!result){
            console.log("El estudiante ya existe con este id")
        } else {
            console.log("Estudiante registrado")
        }
    }

    private erasestudent() {
        const id = prompt("ID: ");
        const status = this.studentusecase.erase(id);
        if(!status) {
            console.log("El estudiante no se encuentra con este id")
        } else {
            console.log("Estudiante Eliminado")
        }
    }

    private actualizestudent() {
        const student = this.inputstudent();
        const existing = this.studentusecase.actualize(student);
        if (!existing){
            console.log("El estudiante no fue encontrado y no fue actualizado")
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
        let students = this.studentusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class Bookconsolestest implements IView {
    constructor(private bookusecase: IUseCases<Book>) { }

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
        const title = prompt("Titulo: ");
        const author = prompt("Autor: ");
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
        if (!result){
            console.log("El libro ya existe con este id")
        } else {
            console.log("Libro registrado")
        }
    }

    private erasebook() {
        const id = prompt("ID: ");
        const status = this.bookusecase.erase(id);
        if(!status) {
            console.log("El libro no se encuentra con este id")
        } else {
            console.log("Libro eliminado")
        }
    }

    private actualizebook() {
        const student = this.inputbook();
        const existing = this.bookusecase.actualize(student);
        if (!existing){
            console.log("El Libro no fue encontrado y no fue actualizado")
        } else {
            console.log("Libro actualizado")
        }
    }

    private showbook() {

        let books:Book[] = this.bookusecase.show()

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
        let students = this.bookusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}

export class LoanConsoletest implements IView {

    constructor(private usecaseloan: IUseloancase){}

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
        let idstudent = prompt("ID Estudiante: ");
        let status = this.usecaseloan.lendBook(idbook, idstudent);
        if (!status) {
            console.log("No se puedo hacer el prestamo")
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

const studentusecase = new Usecasetest<Student>(repositorystudent);
const bookusecase = new Usecasetest<Book>(repositorybook);
const loanusecase = new Loanusecase(repositoryloan, repositorybook, repositorystudent)

const studentconsoletest = new Studentconsolestest(studentusecase);
const bookconsoletest = new Bookconsolestest(bookusecase);
const loanconsoletest = new LoanConsoletest(loanusecase)

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsoletest);

const app = new App(menu);
app.run();