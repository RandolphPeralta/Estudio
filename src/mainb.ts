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

export interface IStudentview extends IView {

}

export interface IBookview extends IView {

}

export interface ILoanview extends IView {

}

export interface IMenuview extends IView {

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

export class StudentWeb implements IStudentview {

    constructor(
        private studentservice: IService<Student>,
        private loanservice: IService<Loan>
    ) { }

    async execute(): Promise<void> {
        await this.attachEvents();
        await this.attachQuickSearchEvents();
        await this.renderTable();
    }

    private async attachEvents(): Promise<void> {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        const btnCancel = document.getElementById("studentBtnCancel") as HTMLButtonElement;
        const btnOpenModal = document.getElementById("btnOpenStudentModal") as HTMLButtonElement;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveStudent();
        });

        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });

        btnOpenModal.addEventListener("click", () => {
            this.resetForm();
        });
    }

    private async saveStudent(): Promise<void> {

        const editingId = (document.getElementById("studentEditingId") as HTMLInputElement).value;
        const name = (document.getElementById("studentName") as HTMLInputElement).value;
        const identification = (document.getElementById("studentIdent") as HTMLInputElement).value;
        const schoolgrade = (document.getElementById("studentGrade") as HTMLInputElement).value;

        if (editingId) {
            const student: Student = { id: editingId, name, identification, schoolgrade };
            if (await this.studentservice.update(student)) {
                this.showAlert("Estudiante actualizado con éxito.", "success");
            } else {
                this.showAlert("Error al actualizar estudiante.", "danger");
            }
        } else {
            const student: Student = {
                id: Math.random().toString(36).substring(2, 9),
                name,
                identification,
                schoolgrade
            };
            if (await this.studentservice.create(student)) {
                this.showAlert("Estudiante registrado con éxito.", "success");
            } else {
                this.showAlert("Error al registrar estudiante.", "danger");
            }
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("studentModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();

        this.resetForm();
        this.renderTable();
    }

    private async editStudent(id: string): Promise<void> {
        const students = await this.studentservice.read()
        let student = students.find(student => student.id === id);
        if (!student) return;

        (document.getElementById("studentEditingId") as HTMLInputElement).value = student.id;
        (document.getElementById("studentName") as HTMLInputElement).value = student.name;
        (document.getElementById("studentIdent") as HTMLInputElement).value = student.identification;
        (document.getElementById("studentGrade") as HTMLInputElement).value = student.schoolgrade;

        document.getElementById("studentFormTitle")!.textContent = "Actualizar Estudiante";
        document.getElementById("studentBtnSubmit")!.textContent = "Actualizar";

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("studentModal")!;
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.show();
    }

    private resetForm(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("studentEditingId") as HTMLInputElement).value = "";
        document.getElementById("studentFormTitle")!.textContent = "Registrar Estudiante";
        document.getElementById("studentBtnSubmit")!.textContent = "Guardar";
    }

    private async renderTable(): Promise<void> {
        const tbody = document.getElementById("studentTableBody")!;
        const students = await this.studentservice.read();

        tbody.innerHTML = students.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay estudiantes registrados.</td></tr>`
            : students.map(student => `
                <tr>
                    <td><small class="text-muted">${student.id}</small></td>
                    <td>${student.name}</td>
                    <td>${student.identification}</td>
                    <td>${student.schoolgrade}</td>
                </tr>
            `).join("");
    }

    private async deleteStudent(id: string): Promise<void> {
        const activeLoans = await this.loanservice.read()
        let activeloan = activeLoans.filter(loan => loan.student.id === id && !loan.returndate);
        if (activeLoans.length > 0) {
            this.showAlert("No se puede eliminar: El estudiante tiene préstamos activos.", "warning");
            return;
        }

        if (await this.studentservice.delete(id)) {
            this.showAlert("Estudiante eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el estudiante.", "danger");
        }
    }

    private async attachQuickSearchEvents(): Promise<void> {
        const searchInput = document.getElementById("quickSearchStudentInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", async () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchStudentResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const students = await this.studentservice.read();
            const matches = students.filter(student =>
                student.name.toLowerCase().includes(query) ||
                student.identification.includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No se encontraron estudiantes</div>`
                : matches.map(student => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${student.name}</strong><br>
                            <small class="text-muted">ID: ${student.identification} | Grado: ${student.schoolgrade}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-warning me-1 btn-quick-edit" data-id="${student.id}" data-bs-dismiss="modal">Editar</button>
                            <button class="btn btn-sm btn-outline-danger btn-quick-delete" data-id="${student.id}" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                  `).join("");

            resultsContainer.querySelectorAll(".btn-quick-edit").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.editStudent(id);
                });
            });

            resultsContainer.querySelectorAll(".btn-quick-delete").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.deleteStudent(id);
                });
            });
        });
    }

    private showAlert(message: string, type: string): void {
        const alertBox = document.getElementById("studentAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

}

export class BookWeb implements IBookview {

    constructor(private bookservice: IService<Book>) { }

    async execute(): Promise<void> {
        await this.attachEvents();
        await this.attachQuickSearchEvents();
        await this.renderTable();
    }

    private async attachEvents(): Promise<void> {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        const btnCancel = document.getElementById("bookBtnCancel") as HTMLButtonElement;
        const btnOpenModal = document.getElementById("btnOpenBookModal") as HTMLButtonElement;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveBook();
        });

        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });

        btnOpenModal.addEventListener("click", () => {
            this.resetForm();
        });
    }

    private async editBook(id: string): Promise<void> {
        const books = await this.bookservice.read()
        let book = books.find(book => book.id === id);
        if (!book) return;

        (document.getElementById("bookEditingId") as HTMLInputElement).value = book.id;
        (document.getElementById("bookTitle") as HTMLInputElement).value = book.title;
        (document.getElementById("bookAuthor") as HTMLInputElement).value = book.author;

        document.getElementById("bookFormTitle")!.textContent = "Actualizar Libro";
        document.getElementById("bookBtnSubmit")!.textContent = "Actualizar";

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("bookModal")!;
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.show();
    }

    private async saveBook(): Promise<void> {
        const editingId = (document.getElementById("bookEditingId") as HTMLInputElement).value;
        const title = (document.getElementById("bookTitle") as HTMLInputElement).value;
        const author = (document.getElementById("bookAuthor") as HTMLInputElement).value;

        if (editingId) {
            const Books = await this.bookservice.read()
            const existingBook = Books.find(book => book.id === editingId);
            const book: Book = {
                id: editingId,
                title,
                author,
                available: existingBook ? existingBook.available : true
            };

            if (await this.bookservice.update(book)) {
                this.showAlert("Libro actualizado.", "success");
            } else {
                this.showAlert("Error al actualizar libro.", "danger");
            }
        } else {
            const book: Book = {
                id: Math.random().toString(36).substring(2, 9),
                title,
                author,
                available: true
            };

            if (await this.bookservice.create(book)) {
                this.showAlert("Libro registrado.", "success");
            } else {
                this.showAlert("Error al registrar libro.", "danger");
            }
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("bookModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();

        this.resetForm();
        this.renderTable();
    }

    private resetForm(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("bookEditingId") as HTMLInputElement).value = "";
        document.getElementById("bookFormTitle")!.textContent = "Registrar Libro";
        document.getElementById("bookBtnSubmit")!.textContent = "Guardar";
    }

    private async renderTable(): Promise<void> {
        const tbody = document.getElementById("bookTableBody")!;
        const books = await this.bookservice.read();

        tbody.innerHTML = books.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay libros registrados.</td></tr>`
            : books.map(book => `
                <tr>
                    <td><small class="text-muted">${book.id}</small></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <span class="badge ${book.available ? 'bg-success' : 'bg-warning text-dark'}">
                            ${book.available ? 'Disponible' : 'Prestado'}
                        </span>
                    </td>
                </tr>
            `).join("");
    }

    private async deleteBook(id: string): Promise<void> {
        const books = await this.bookservice.read()
        let book = books.find(book => book.id === id);
        if (book && !book.available) {
            this.showAlert("No se puede eliminar: El libro está prestado actualmente.", "warning");
            return;
        }

        if (await this.bookservice.delete(id)) {
            this.showAlert("Libro eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el libro.", "danger");
        }
    }

    private async attachQuickSearchEvents(): Promise<void> {
        const searchInput = document.getElementById("quickSearchBookInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", async () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchBookResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const books = await this.bookservice.read();
            const matches = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No se encontraron libros</div>`
                : matches.map(book => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${book.title}</strong><br>
                            <small class="text-muted">Autor: ${book.author}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-warning me-1 btn-quick-edit" data-id="${book.id}" data-bs-dismiss="modal">Editar</button>
                            <button class="btn btn-sm btn-outline-danger btn-quick-delete" data-id="${book.id}" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                  `).join("");

            resultsContainer.querySelectorAll(".btn-quick-edit").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.editBook(id);
                });
            });

            resultsContainer.querySelectorAll(".btn-quick-delete").forEach(e => {
                e.addEventListener("click", (evt) => {
                    const id = (evt.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.deleteBook(id);
                });
            });
        });
    }

    private showAlert(message: string, type: string): void {
        const alertBox = document.getElementById("bookAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

export class LoanWeb implements ILoanview {

    constructor(
        private studentservice: IService<Student>,
        private bookservice: IService<Book>,
        private loanservice: IService<Loan>
    ) { }

    async execute(): Promise<void> {
        await this.attachEvents();
        await this.attachSearchEvents();
        await this.attachQuickSearchEvents();
        await this.renderTable();
    }

    private async attachEvents(): Promise<void> {
        const form = document.getElementById("loanForm") as HTMLFormElement;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createLoan();
        });
    }

    private async attachSearchEvents(): Promise<void> {
        const studentSearch = document.getElementById("loanStudentSearch") as HTMLInputElement;
        const bookSearch = document.getElementById("loanBookSearch") as HTMLInputElement;

        studentSearch.addEventListener("input", () => {
            this.searchStudent(studentSearch.value);
        });

        bookSearch.addEventListener("input", () => {
            this.searchBook(bookSearch.value);
        });
    }

    private async attachQuickSearchEvents(): Promise<void> {
        const searchInput = document.getElementById("quickSearchLoanInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", async () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchLoanResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const Loans = await this.loanservice.read()
            const activeLoans = Loans.filter(loan => !loan.returndate);
            const matches = activeLoans.filter(loan =>
                loan.student.name.toLowerCase().includes(query) ||
                loan.student.identification.includes(query) ||
                loan.book.title.toLowerCase().includes(query) ||
                loan.book.author.toLowerCase().includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No hay préstamos pendientes que coincidan</div>`
                : matches.map(loan => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${loan.book.title}</strong><br>
                            <small class="text-muted">
                                Estudiante: ${loan.student.name} (${loan.student.identification})<br>
                                Préstamo: ${new Date(loan.loanDate).toLocaleDateString()}
                            </small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-success btn-quick-return" 
                                    data-id="${loan.id}" 
                                    data-bs-dismiss="modal">
                                Devolver
                            </button>
                        </div>
                    </div>
                `).join("");

            resultsContainer.querySelectorAll(".btn-quick-return").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;

                    if (confirm("¿Estás seguro de devolver este libro?")) {
                        this.returnBook(id);
                        searchInput.value = "";
                        resultsContainer.innerHTML = "";
                        const modal = (window as any).bootstrap.Modal.getInstance(
                            document.getElementById("searchLoanModal")!
                        );
                        if (modal) modal.hide();
                    }
                });
            });
        });
    }

    private async searchStudent(search: string): Promise<void> {
        const results = document.getElementById("loanStudentResults")!;
        const value = search.trim().toLowerCase();

        if (!value) {
            results.innerHTML = "";
            return;
        }

        const readstudents = await this.studentservice.read()
        const students = readstudents.filter(student =>
                student.name.toLowerCase().includes(value) ||
                student.identification.includes(value)
            )
            .slice(0, 8);

        
        results.innerHTML = students.map(student => `
            <button
                type="button"
                class="list-group-item list-group-item-action"
                data-id="${student.id}">
                ${student.name} - ${student.identification}
            </button>
        `).join("");

        results.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", async () => {
                const id = button.getAttribute("data-id")!;
                let students = await this.studentservice.read()
                const student = students.find(student => student.id === id);
                if (!student) return;

                (document.getElementById("loanStudent") as HTMLInputElement).value = student.id;
                (document.getElementById("loanStudentSearch") as HTMLInputElement).value =
                    `${student.name} - ${student.identification}`;
                results.innerHTML = "";
            });
        });
    }

    private async searchBook(search: string): Promise<void> {
        const results = document.getElementById("loanBookResults")!;
        const value = search.trim().toLowerCase();

        if (!value) {
            results.innerHTML = "";
            return;
        }

        const booksread = await this.bookservice.read()
        let books = booksread.filter(book =>
                book.available &&
                (book.title.toLowerCase().includes(value) ||
                    book.author.toLowerCase().includes(value))
            )
            .slice(0, 8);

        results.innerHTML = books.map(book => `
            <button
                type="button"
                class="list-group-item list-group-item-action"
                data-id="${book.id}">
                ${book.title} - ${book.author}
            </button>
        `).join("");

        results.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", async () => {
                const id = button.getAttribute("data-id")!;
                let  bookread = await this.bookservice.read()
                const book = bookread.find(book => book.id === id);
                if (!book) return;

                (document.getElementById("loanBook") as HTMLInputElement).value = book.id;
                (document.getElementById("loanBookSearch") as HTMLInputElement).value =
                    `${book.title} - ${book.author}`;
                results.innerHTML = "";
            });
        });
    }

    private async createLoan(): Promise<void> {
        const studentId = (document.getElementById("loanStudent") as HTMLInputElement).value;
        const bookId = (document.getElementById("loanBook") as HTMLInputElement).value;

        const studentread = await this.studentservice.read()
        const student = studentread.find(student => student.id === studentId);
        const bookread = await this.bookservice.read()
        const book = bookread.find(book => book.id === bookId);

        if (!student || !book || !book.available) {
            this.showAlert("Error: Seleccione un libro disponible y un estudiante válido.", "danger");
            return;
        }

        const loan: Loan = {
            id: Math.random().toString(36).substring(2, 9),
            book,
            student,
            loanDate: new Date()
        };

        if (!this.loanservice.create(loan)) {
            this.showAlert("Error al procesar el préstamo.", "danger");
        } else {
            book.available = false;
            this.bookservice.update(book);
            this.showAlert("Préstamo registrado con éxito.", "success");

            (document.getElementById("loanStudent") as HTMLInputElement).value = "";
            (document.getElementById("loanStudentSearch") as HTMLInputElement).value = "";
            (document.getElementById("loanBook") as HTMLInputElement).value = "";
            (document.getElementById("loanBookSearch") as HTMLInputElement).value = "";

            this.renderTable();
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("loanModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();
    }

    private async returnBook(loanId: string): Promise<void> {
        const loans = await this.loanservice.read();
        const loan = loans.find(loan => loan.id === loanId);

        if (!loan || loan.returndate) {
            this.showAlert("El préstamo no existe o ya fue devuelto.", "warning");
            return;
        }

        loan.returndate = new Date();
        this.loanservice.update(loan);

        loan.book.available = true;
        this.bookservice.update(loan.book);

        this.showAlert(`"${loan.book.title}" devuelto por ${loan.student.name}`, "success");
        this.renderTable();
    }

    private async renderTable(): Promise<void> {
        const tbody = document.getElementById("loanTableBody")!;
        let loans = await this.loanservice.read();

        loans = loans.sort((loanA, loanB) => {
            if (loanA.returndate && !loanB.returndate) return 1;
            if (!loanA.returndate && loanB.returndate) return -1;
            return 0;
        });

        tbody.innerHTML = loans.length === 0
            ? `<tr><td colspan="6" class="text-center text-muted">No hay historial de préstamos.</td></tr>`
            : loans.map(loan => `
                <tr>
                    <td><small class="text-muted">${loan.id}</small></td>
                    <td>
                        <strong>${loan.book.title}</strong>
                        <br><small class="text-muted">${loan.book.author}</small>
                    </td>
                    <td>
                        ${loan.student.name}
                        <br><small class="text-muted">${loan.student.identification}</small>
                    </td>
                    <td>${new Date(loan.loanDate).toLocaleDateString()}</td>
                    <td>
                        ${loan.returndate
                    ? `<span class="text-success"> ${new Date(loan.returndate).toLocaleDateString()}</span>`
                    : `<span class="badge bg-warning text-dark">Pendiente</span>`
                }
                    </td>
                </tr>
            `).join("");
    }

    private showAlert(message: string, type: string): void {
        const alertBox = document.getElementById("loanAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        setTimeout(() => {
            const alert = alertBox.querySelector('.alert');
            if (alert) {
                const bsAlert = (window as any).bootstrap.Alert.getOrCreateInstance(alert);
                bsAlert.close();
            }
        }, 5000);
    }
}

export class Menuweb implements IMenuview {

    constructor(
        private studentMenu: IStudentview,
        private bookMenu: IBookview,
        private loanMenu: ILoanview
    ) { }

    async execute(): Promise<void> {

        const btnStudents = document.getElementById("menuStudents")!;
        const btnBooks = document.getElementById("menuBooks")!;
        const btnLoans = document.getElementById("menuLoans")!;

        btnStudents.addEventListener("click", async (event) => {
            event.preventDefault();
            this.showView("studentView");
            await this.studentMenu.execute();
        });

        btnBooks.addEventListener("click", async (event) => {
            event.preventDefault();
            this.showView("bookView");
            await this.bookMenu.execute();
        });

        btnLoans.addEventListener("click", async (event) => {
            event.preventDefault();
            this.showView("loanView");
            await this.loanMenu.execute();
        });

        this.showView("blankView");
    }

    private async showView(viewId: string): Promise<void> {
        const views = [
            "blankView",
            "studentView",
            "bookView",
            "loanView"
        ];

        views.forEach(id => {
            document.getElementById(id)!.classList.add("d-none");
        });

        document.getElementById(viewId)!.classList.remove("d-none");
    }
}

export class LoginWeb implements IView {

    constructor(
        private menuWeb: IMenuview
    ) { }

    async execute(): Promise<void> {

        document.getElementById("loginForm")!.addEventListener("submit", async (event) => {
            event.preventDefault();

            const user = (document.getElementById("username") as HTMLInputElement).value;
            const pass = (document.getElementById("password") as HTMLInputElement).value;

            if (user === "admin" && pass === "1234") {
                document.getElementById("login")!.classList.add("d-none");
                document.getElementById("dashboard")!.classList.remove("d-none");
                await this.menuWeb.execute();
            } else {
                alert("Credenciales incorrectas");
            }
        });

         document.getElementById("btnLogout")!.addEventListener("click", async () => {

            document.getElementById("dashboard")!.classList.add("d-none");
            document.getElementById("login")!.classList.remove("d-none");

            (document.getElementById("loginForm") as HTMLFormElement).reset();

        });
    }

}

export class App {
    constructor(private menu: IView) { }

    async run(): Promise<void> {
        await this.menu.execute();
    }
}

const pool = new Pool(config);

const loanRepository: IRepository<Loan> = new PostgreSQLPersistence<Loan>(pool, "loans");
const loanservice: IService<Loan> = new Service<Loan>(loanRepository);

const studentRepository: IRepository<Student> = new PostgreSQLPersistence<Student>(pool, "students");
const studentservice: IService<Student> = new Service<Student>(studentRepository);
const studentValidator: IValidation<Student> = new Validation<Student>()
const studentconsole = new StudentWeb(studentservice, loanservice)

const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
const bookservice: IService<Book> = new Service<Book>(bookRepository);
const bookvalidator: IValidation<Book> = new Validation<Book>();
const bookconsole = new BookWeb(bookservice);

const loanconsole = new LoanWeb(studentservice, bookservice, loanservice);
const menuconsole = new Menuweb(studentconsole, bookconsole, loanconsole);
const app = new App(menuconsole);
app.run();
