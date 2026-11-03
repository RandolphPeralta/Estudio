import { Pool } from "pg";

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

    private readMenu(): void {
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
            this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.createStudent();
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
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }

        }


    private createStudent() {
        const student = this.inputstudent();
        let students = this.studentservice.read();
        // let indexstudent = students.findIndex((item: Student) => item.id === student.id);
        
        // if (indexstudent !== -1) {
        //     console.log("Este estudiante ya fue registrado con este id");
        //         return;
        //     }
        
        const result = this.studentservice.create(student);
        // console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private inputid() {
        const id = prompt("ID: ");
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

// const pool = new Pool(config);
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