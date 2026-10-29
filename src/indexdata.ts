
export interface IRepository<T> {
    create(item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(item: T): Promise<boolean>;
    read(): Promise<T[]>;
}

import { Pool } from "pg";
import { readFile } from "node:fs/promises";

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
    id: string;
    book: Book;
    student: Student;
    loanDate: Date;
    returndate?: Date;
};

const config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234"
};

// Inicializa la base de datos y devuelve el pool de la aplicación.
async function initializeDatabase(): Promise<Pool> {
    // PASO 1: conectarse a una base que ya existe.
    const adminPool = new Pool({
        ...config,
        database: "postgres"
    });

    try {
        // PASO 2: comprobar si library existe.
        const result = await adminPool.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            ["library"]
        );

        // PASO 3: crear library solo si no existe.
        if (result.rowCount === 0) {
            await adminPool.query("CREATE DATABASE library");
            console.log("Base de datos library creada.");
        } else {
            console.log("La base de datos library ya existe.");
        }
    } finally {
        await adminPool.end();
    }

    // PASO 4: conectarse a library, que ya existe.
    const pool = new Pool({
        ...config,
        database: "library"
    });

    try {
        // PASO 5: ejecutar el archivo SQL.
        const sql = await readFile("./data.sql", "utf8");
        await pool.query(sql);

        console.log("Tablas creadas o verificadas correctamente.");

        return pool;
    } catch (error) {
        await pool.end();
        throw error;
    }
}

const student1: Student = {
    id: "0112",
    name: "Alis",
    identification: "23765432",
    schoolgrade: "11"
};

async function main(): Promise<void> {
    const pool = await initializeDatabase();

    try {
        const repositoryStudent =
            new PostgreSQLPersistence<Student>(pool, "students");

        const created = await repositoryStudent.create(student1);
        console.log("Estudiante creado:", created);

        const students = await repositoryStudent.read();
        console.log("Estudiantes:", students);
    } finally {
        await pool.end();
    }
}

main().catch(error => {
    console.error("Error:", error);
});


// const repositoryloan    = new PostgreSQLPersistence<Loan>(pool, "loans");
// const repositorybook    = new PostgreSQLPersistence<Book>(pool, "books");

// repositorystudent.create(student1)
// console.log(repositorystudent.read())

// const student1: Book = {
//     id: "01",
//     title: "",
//     author: "",
//     available: false
// } 

// repositorystudent.create(student1)
// console.log(repositorystudent.read())


// async function main(): Promise<void> {
//     try {
//         const created = await repositorystudent.create(student1);

//         console.log("¿Estudiante creado?", created);

//         const students = await repositorystudent.read();

//         console.log("Estudiantes registrados:", students);
//     } catch (error) {
//         console.error("Error al trabajar con PostgreSQL:", error);
//     } finally {
//         await pool.end();
//     }
// }

// main();


