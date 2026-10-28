export interface IRepository<T> {
    create(item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(item: any): Promise<boolean>;
    read(): Promise<T[]>;
}

class MemoryRAM<T> implements IRepository<T> {

     private memory: T[] = [];

    async create(item: T): Promise<boolean> {
        return this.memory.push(item) > 0;
    }
    async delete(id: string): Promise<boolean> {
        let index = this.memory.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            this.memory.splice(index, 1);
            return true
        } else {
            return false
        }
    }
    async update(some: any): Promise<boolean> {
        let index = this.memory.findIndex((item: any) => item.id === some.id);

        if (index === -1) {
            return false;
        }

        this.memory[index] = some;
        return true;
    }
    async read(): Promise<T[]> {
        return this.memory
    }

}

import { Pool } from "pg";

export class PostgreSQLPersistence<T extends { id: string }>
    implements IRepository<T> {

    constructor(
        private pool: Pool,
        private tableName: "students" | "books" | "loans"
    ) {}

    async create(item: T): Promise<boolean> {
        try {
            await this.pool.query(
                `INSERT INTO ${this.tableName} (id, data)
                 VALUES ($1, $2)`,
                [item.id, JSON.stringify(item)]
            );

            return true;
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === "23505"
            ) {
                return false; 
            }

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
            `UPDATE ${this.tableName}
             SET data = $2
             WHERE id = $1`,
            [item.id, JSON.stringify(item)]
        );

        return (result.rowCount ?? 0) > 0;
    }

    async read(): Promise<T[]> {
        const result = await this.pool.query(
            `SELECT data FROM ${this.tableName}`
        );

        return result.rows.map(row => row.data as T);
    }
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

const pool = new Pool({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library"
});

const repositorybook    = new PostgreSQLPersistence<Book>(pool, "books");
const repositorystudent = new PostgreSQLPersistence<Student>(pool, "students");
const repositoryloan    = new PostgreSQLPersistence<Loan>(pool, "loans");

const student1: Student = {
    id: "01",
    name: "Venus",
    identification: "765432",
    schoolgrade: "11"
} 

repositorystudent.create(student1)
console.log(repositorystudent.read())