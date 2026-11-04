import { Pool } from "pg";
import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

export interface IRepository<T> {
    create(item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(item: T): Promise<boolean>;
    read(): Promise<T[]>;
}

export interface IService<T> {
    create(item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(item: T): Promise<boolean>;
    read(): Promise<T[]>;
}

export interface IValidation<T> {
    validate(item: T): boolean;
}

export interface IView {
    execute(): any;
}

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

export class PostgreSQLPersistence<T extends { id: string }> implements IRepository<T> {
    constructor(private pool: Pool, private tableName: string) {}

    async create(item: T): Promise<boolean> {
        try {
            await this.pool.query(
                `INSERT INTO ${this.tableName} (id, data) VALUES ($1, $2)`,
                [item.id, JSON.stringify(item)]
            );
            return true;
        } catch (error: any) {
            if (error?.code === "23505") return false;
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.pool.query(
            `DELETE FROM ${this.tableName} WHERE id = $1`,
            [id]
        );
        return (result.rowCount ?? 0) > 0;
    }

    async update(item: T): Promise<boolean> {
        const result = await this.pool.query(
            `UPDATE ${this.tableName} SET data = $2 WHERE id = $1`,
            [item.id, JSON.stringify(item)]
        );
        return (result.rowCount ?? 0) > 0;
    }

    async read(): Promise<T[]>{
        const result = await this.pool.query(`SELECT data FROM ${this.tableName}`);
        return result.rows.map(row => row.data as T);
    }
}

export class Service<T> implements IService<T> {
    constructor(private repository: IRepository<T>){}

    async create(item: T): Promise<boolean> {
        return await this.repository.create(item);
    }
    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
    async update(item: T): Promise<boolean> {
        return await this.repository.update(item);
    }
    async read(): Promise<T[]> {
        return await this.repository.read()
    }
}

export class Validation<T extends Object> implements IValidation<T> {
    validate(item: T): boolean {
        for (const value of Object.values(item)) {
            if (value === "" || value === null || value === undefined) {
                return false;
            }
        }
        return true;
    }
}

export const config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library" 
};

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

    private async readMenu(): Promise<void> {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        const opciones: string[] = [
            "1. Registrar, Eliminar, Ver, Actualizar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

}

export class Studentconsole implements IView {
    
    constructor(private studentservice: IService<Student>, private loanservice: IService<Loan>, private studentvalidation: IValidation<Student>) { }
    
    async execute() {
    let run = true;
        while (run) {
            await this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    await this.createStudent();
                    break;
                case 2:
                    await this.deletestudent();
                    break
                case 3:
                    await this.updatestudent();
                    break;
                case 4:
                    await this.readstudent();
                    break
                case 0:
                    run = false;
                    break;

            }
        
        }
    }
        
    private async readMenu(): Promise<void> {
        const opciones: string[] = [
            "1. Registrar estudiante",
            "2. Borrar estudiante",
            "3. Actualizar estudiante",
            "4. Mostrar estudiantes",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }

        }


    private async createStudent() {

        const student = this.inputstudent();

        if (!this.studentvalidation.validate(student)){
            console.log("El estudiante tiene algun campo vacio")
            return
        }

        let students = await this.studentservice.read();
        
        let indexstudent = students.findIndex((item: Student) => item.id === student.id);
        
        if (indexstudent !== -1) {
            console.log("Este estudiante ya fue registrado con este id");
                return;
            }
        
        const result = await this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private async deletestudent() {
        this.readstudent();
        const id = this.inputid();
        let activeLoans: Loan[] = await this.loanservice.read();
        let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);
    
        if (studentactiveloan.length > 0) {
            console.log("El estudiante no puede ser eliminado, ya que tiene prestamos")
            return;
        }
    
        const status: boolean = await this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo eliminar");
        }
    
    private async updatestudent() {
        this.readstudent();
        const id = this.inputid();
        let students = await this.studentservice.read();
        let findstudent = students.filter((item: Student) => item.id === id)[0];
        if (!findstudent) {
            console.log("Estudiante no encontrado");
            return;
        }
    
        const student = this.inputstudent();
        student.id = findstudent.id
        const newstudent: boolean = await this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
        }
    
    private async readstudent() {
                let students: Student[] = await this.studentservice.read();
                let studentsview = students.map(student => ({
                    id: student.id,
                    nombre: student.name,
                    identificacion: student.identification,
                    grado: student.schoolgrade
                }));
        
                console.table(studentsview);
            }

    private inputid() {
        const id= String(prompt("ID: "));
        if (!id) {
            console.log("El ID no puede estar vacío");
        }
        return id
    }

    private inputstudent(): Student {
    
        const name = String(prompt("Nombre: "));
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre no puede estar vacio y solo puede contener letras");
        }
    
        const identification = String(prompt("Identificación: "));
        if (!identification || !/^\d+$/.test(identification)) {
            console.log("La identificación no puede estar vacio y debe ser numérica");
        }
    
        const schoolgrade = String(prompt("Grado Escolar: "));
        if (!schoolgrade) {
            console.log("El grado escolar no puede estar vacío");
        }
    
        const id = Math.random().toString();

        const student: Student = {id, name, identification, schoolgrade}
    
        return student;
    }

}

export class Bookconsole implements IView {
    constructor(private bookservice: IService<Book>, private bookvalidation: IValidation<Book>) { }

    async execute() {
        let run = true;
        while (run) {
            await this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    await this.createbook();
                    break;
                case 2:
                    await this.deletebook();
                    break;
                case 3:
                    await this.updatebook();
                    break;
                case 4:
                    await this.readbook();
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
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private async createbook() {
        const book = this.inputbook();
        let books = await this.bookservice.read();
        let indexbook = books.findIndex((item: Book) => item.id === book.id);

        if (!this.bookvalidation.validate(book)){
            console.log("El estudiante tiene algun campo vacio")
            return
        }

        if (indexbook !== -1) {
            console.log("Este libro ya fue registrado con este id")
            return;
        }

        const result: boolean = await this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private async deletebook() {
        this.readbook();
        const id = this.inputid();
        let books: Book[] = await this.bookservice.read();
        let book = books.filter(findbook => findbook.id = id)[0];
        if (!book.available) {
            console.log("El libro esta prestado y no posible eliminar");
            return;
        }

        const status: boolean = await this.bookservice.delete(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    }

    private async updatebook() {
        this.readbook();
        const id = this.inputid();
        let books = await this.bookservice.read();
        let findbook = books.filter((item: Book) => item.id === id)[0];
        if (!findbook) {
            console.log("El libro no fue encontrado");
            return
        }
        const book = this.inputbook();
        book.id = findbook.id
        const newbook: boolean = await this.bookservice.update(book);
        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
    }

    private async readbook() {

        let books: Book[] = await this.bookservice.read();
        let booksview = books.map(book => ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }));

        console.table(booksview);
    }

    private inputbook(): Book {

        let title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            console.log("El titulo no puede estar vacio");
        }

        let author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            console.log("El autor no puede estar vacío");
        }

        const available = true;
        const id = Math.random().toString();

        const book: Book = {
            id,
            title,
            author,
            available
        };

        return book
    }

    private inputid() {
        let id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}

export class LoanConsole implements IView {

    constructor(private studentservice: IService<Student>, private bookservice: IService<Book>, private loanservice: IService<Loan>) { }

    async execute() {
        let run = true;

        while (run) {

            await this.readMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    await this.lendbook();
                    break;

                case 2:
                    await this.returnbook();
                    break;

                case 3:
                    await this.readloan();
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

    private async lendbook() {
        console.table(this.studentservice.read())
        console.table(this.bookservice.read())
        let idbook = this.inputidbook();
        let idstudent = this.inputidstudent();

        let books: Book[] = await this.bookservice.read();
        const book = books.filter((book: Book) => book.id === idbook)[0];
        if (!book || !book.available) {
            console.log("El libro no existe o no esta disponible")
            return;
        }

        let students: Student[] = await this.studentservice.read();
        const student = students.filter((student: Student) => student.id === idstudent)[0];

        if (!student) {
            console.log("El estudiante no existe")
            return;
        }

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate: new Date()
        };

        let status = await this.loanservice.create(loan);
        book.available = false;
        this.bookservice.update(book);

        console.log(status ? "Prestamo existoso" : "No se pudo realizar el prestamo");
    }

    private async returnbook() {
        let idbook = this.inputidbook();
        let loans: Loan[] = await this.loanservice.read()
        const loan = loans.find(loan => loan.book.id === idbook);
        if (!loan) {
            console.log("El libro no existe con este id")
            return;
        }

        loan.returndate = new Date();
        const status = await this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);
        console.log(status ? "Libro devuelto" : "No se pudo devolver")
    }

    private async readloan() {
        let loans: Loan[] = await this.loanservice.read()
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

const pool = new Pool(config);
// const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
// const bookservice = new Service<Book>(bookRepository);
// const bookvalidator = new Validation<Book>()

// const book1: Book = {
//     id: "3",
//     title: "El Señor de los Anillos",
//     author: "J.R.R. Tolkien",
//     available: true
// };

// async function createbook() {
//     if (!bookvalidator.validate(book1)){
//         return
//     }
//     await bookservice.create(book1);
// }

// async function readbooks() {
//     console.log(await bookservice.read())
// }

// createbook();
// readbooks();

const loanRepository: IRepository<Loan> = new PostgreSQLPersistence<Loan>(pool, "loans");
const loanservice: IService<Loan> = new Service<Loan>(loanRepository);

const studentRepository: IRepository<Student> = new PostgreSQLPersistence<Student>(pool, "students");
const studentservice: IService<Student> = new Service<Student>(studentRepository);
const studentValidator: IValidation<Student> = new Validation<Student>()
const studentconsole = new Studentconsole(studentservice, loanRepository,studentValidator)

const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
const bookservice: IService<Book> = new Service<Book>(bookRepository);
const bookvalidator: IValidation<Book> = new Validation<Book>()
const bookconsole = new Bookconsole(bookservice, bookvalidator)

const loanconsole = new LoanConsole(studentservice, bookservice, loanservice)
const menuconsole = new MenuConsole(studentconsole, bookconsole, loanconsole);
menuconsole.execute()

