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

const config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library" 
};

const pool = new Pool(config);
const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
const bookservice = new Service<Book>(bookRepository);

const book1: Book = {
    id: "3",
    title: "La odisea",
    author: "Homero",
    available: true
};

async function createbook() {
    await bookservice.create(book1);
    console.log(await bookservice.read());
}

createbook();