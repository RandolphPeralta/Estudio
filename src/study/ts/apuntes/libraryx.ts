import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

//------DOMAIN-----------

//interfaces
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

//---usecases-interfaces----

export interface IStudentUseCases {
    createStudent(student: Student): any;
    readStudents(): Student[];
    updateStudent(student: Student): { success: boolean; message: string };
    deleteStudent(id: string): { success: boolean; message: string };
}

export interface IBookUseCases {
    createBook(book: Book): { success: boolean; message: string };
    readBooks(): Book[];
    updateBook(book: Book): { success: boolean; message: string };
    deleteBook(id: string): { success: boolean; message: string };
}

export interface ILoanUseCases {
    lendBook(bookId: string, studentId: string): { success: boolean; message: string; loan?: Loan };
    returnBook(bookId: string): { success: boolean; message: string };
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

//-------------Usescases-------

export class StudentUseCases implements IStudentUseCases {
    constructor(private studentRepository: IAdditionalAction<Student>) {}

    createStudent(student: Student): { success: boolean; message: string } {
        const existing = this.studentRepository.findbyid(student.id);
        if (existing.length > 0) {
            return { success: false, message: "El estudiante ya existe con este id" };
        }
        this.studentRepository.create(student);
        return { success: true, message: "Estudiante registrado" };
    }

    deleteStudent(id: string): { success: boolean; message: string } {
        const status = this.studentRepository.delete(id);
        if (!status) {
            return { success: false, message: "No existe un estudiante" };
        }
        return { success: true, message: "Estudiante eliminado" };
    }

    updateStudent(student: Student): { success: boolean; message: string } {
        const existing = this.studentRepository.findbyid(student.id);
        if (existing.length === 0) {
            return { success: false, message: "Este estudiante no existe con este id" };
        }
        this.studentRepository.update(student);
        return { success: true, message: "Estudiante actualizado" };
    }

    readStudents(): Student[] {
        return this.studentRepository.read();
    }
}

export class BookUseCases implements IBookUseCases {
    constructor(private bookRepository: IAdditionalAction<Book>) {}
    readBooks(): Book[] {
        throw new Error("Method not implemented.");
    }
    updateBook(book: Book): { success: boolean; message: string; } {
        throw new Error("Method not implemented.");
    }
    deleteBook(id: string): { success: boolean; message: string; } {
        throw new Error("Method not implemented.");
    }

    createBook(book: Book): { success: boolean; message: string } {
        const existing = this.bookRepository.findbyid(book.id);
        if (existing.length > 0) {
            return { success: false, message: "El libro ya existe con este id" };
        }
        this.bookRepository.create(book);
        return { success: true, message: "Libro registrado" };
    }

    // ... métodos similares a StudentUseCases
}

export class LoanUseCases implements ILoanUseCases {
    constructor(
        private loanRepository: IAdditionalAction<Loan>,
        private bookRepository: IAdditionalAction<Book>,
        private studentRepository: IAdditionalAction<Student>
    ) {}

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

        // Verificar si el estudiante tiene préstamos activos
        const activeLoans = this.loanRepository.read().filter(
            loan => loan.student.id === studentId && !loan.returndate
        );
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

//----------------------------

export class StudentConsole implements IView {

    constructor(private studentrepository: IAdditionalAction<Student>) { }

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
        const existing = this.studentrepository.findbyid(student.id);

        if (existing.length > 0) {
            console.log("El estudiante ya existe con este id");
        } else {
            this.studentrepository.create(student);
            console.log("Estudiante registrado")
        }
    }

    private deletestudent() {
        const id = prompt("ID: ");
        const status = this.studentrepository.delete(id);

        if (status) {
            console.log("Estudiante eliminado");
        } else {
            console.log("No existe un estudiante.");
        }
    }

    private updatestudent() {
        const student = this.inputstudent();
        const existing = this.studentrepository.findbyid(student.id);

        if (existing.length === 0) {
            console.log("Este estudiante no exite con este id")
        } else {
            this.studentrepository.update(student)
            console.log("Estudiante actualizado");
        }
    }

    private findbyidstudent() {
        const id = prompt("ID: ");
        const students = this.studentrepository.findbyid(id);

        if (students.length === 0) {

            console.log("No encontrado");
            return;
        }

        console.table(students);
    }

    private readstudent() {
        console.table(this.studentrepository.read());

    }

}

//------------------------------------

export class BookConsole implements IView {

    constructor(private bookrepository: IAdditionalAction<Book>) { }

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
        const book = this.inputbook();
        const existingbook = this.bookrepository.findbyid(book.id);

        if (existingbook.length > 0) {
            console.log("El libro ya existe con este id.");
        } else {
            this.bookrepository.create(book);
            console.log("Libro registrado");
        }
    }

    private readbook() {
        console.table(this.bookrepository.read());
    }

    private updatebook() {
        const book = this.inputbook();
        const existing = this.bookrepository.findbyid(book.id);

        if (existing.length === 0) {
            console.log("No existe un libro con ese ID.");
        } else {
            this.bookrepository.update(book);
            console.log("Libro actualizado");
        }
    }

    private deletebook() {
        const id = prompt("ID: ");
        const status = this.bookrepository.delete(id);

        if (status) {
            console.log("Libro eliminado");
        } else {
            console.log("No existe un libro con este id.");
        }
    }

    private findbyid() {
        const id = prompt("ID: ");
        const books = this.bookrepository.findbyid(id);

        if (books.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(books);
    }
}

//-----------------------

export class LoanConsole implements IView {

    constructor(private loanrepository: IAdditionalAction<Loan>, private bookrepository: IAdditionalAction<Book>, private studentrepository: IAdditionalAction<Student>) { }

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

                case 4:
                    this.updateloan();
                    break;

                case 5:
                    this.findbyidloan();
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
        const book = this.bookrepository.findbyid(idbook)[0];

        if (!book) {
            console.log("El libro no existe");
            return;
        }

        if (!book.available) {
            console.log("El libro no está disponible");
            return;
        }

        const idstudent = prompt("ID Estudiante: ");
        const student = this.studentrepository.findbyid(idstudent)[0];

        if (!student) {
            console.log("El estudiante no existe");
            return;
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
            console.log("Ya existe un préstamo con ese id");
            return;
        }

        this.loanrepository.create(loan);

        book.available = false;
        this.bookrepository.update(book);

        console.log("Libro prestado con devolución en 3 días");
    }

    private returnbook() {

        const idBook = prompt("ID Libro: ");
        const loan = this.loanrepository.read().find(loan => loan.book.id === idBook);

        if (!loan) {
            console.log("No existe préstamo activo");
            return;
        }

        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);

        console.log("Libro devuelto");
    }

    private readloan() {

        const Loans = this.loanrepository.read()

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

    private updateloan() {

        const id = prompt("ID préstamo: ");

        const existing = this.loanrepository.findbyid(id);
        if (existing.length === 0) {
            console.log("Préstamo no encontrado");
            return;
        }

        const loan = existing[0];
        loan.returndate = new Date(
            prompt("Fecha (YYYY-MM-DD): ")
        );
        this.loanrepository.update(loan);
        console.log("Préstamo actualizado");
    }

    private findbyidloan() {

        const idloan = prompt("ID préstamo: ");
        const loans = this.loanrepository.findbyid(idloan);

        if (loans.length === 0) {
            console.log("No encontrado");
            return;
        }

        loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate
            });
        });
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

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentconsole = new StudentConsole(MemoryStudent);
const bookconsole = new BookConsole(MemoryBook);
const loanconsole = new LoanConsole(MemoryLoan, MemoryBook, MemoryStudent);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();