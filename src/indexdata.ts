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

export class PostgreSQLPersistence<T extends { id: string }> implements IRepository<T> {
    constructor(
        private pool: Pool,
        private tableName: string
    ) {}

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

export class LibraryService {
    constructor(
        private studentRepo: IRepository<Student>,
        private bookRepo: IRepository<Book>
    ) {}

    async registerNewStudent(student: Student): Promise<boolean> {
        return await this.studentRepo.create(student);
    }

    async getAllStudents(): Promise<Student[]> {
        return await this.studentRepo.read();
    }
}

const config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library" 
};

// async function main() {
   
//     const pool = new Pool(config);

//     try {
//         const studentRepository: IRepository<Student> = new PostgreSQLPersistence<Student>(pool, "students");
//         const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");

//         const libraryService = new Service(studentRepository);

//         const student1: Student = {
//             id: "15432",
//             name: "Sara",
//             identification: "123765432",
//             schoolgrade: "11"
//         };

//         const created = await libraryService.create(student1);
//         console.log("¿Estudiante creado con éxito?:", created);

//         const students = await libraryService.read();
//         console.log("Lista de estudiantes:", students);

//     } finally {
//         await pool.end();
//     }
// }

// main().catch(error => {
//     console.error("Error en la aplicación:", error);
// });



const pool = new Pool(config);
const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");

const book1: Book = {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    available: true
};

async function main() {
    await bookRepository.create(book1);
    console.log(await bookRepository.read());
}

main();