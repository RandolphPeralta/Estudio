//------DOMAIN-----------

//---------interfaces--------
export interface ISave<T> {
    create(some: T): boolean;
    delete(id: any): boolean;
}

export interface IUpdate<T> extends ISave<T> {
    update(some: any): boolean;
    read(): T[];
}

export interface IAddidionalaction<T> extends IUpdate<T> {
    findbyid(id: string): Array<T>
}

export interface IView {
    execute(): any;
}

export interface IService<T> {
    create(item: T): boolean;
    read(): Array<T>;
    update(item: T): boolean;
    delete(id: any): boolean;
}

export interface IValidation<T> {
    validate(item: T): any;
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
        return this.memory.push(some) > 0;
    }

    delete(id: any) {
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

export class Validation<T extends object> implements IValidation<T> {
    validate(item: T): boolean {
        for (const value of Object.values(item)) {
            if (value === "" || value === null || value === undefined) {
                return false;
            }
        }
        return true;
    }
}

//-------------Services---------

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>, private Validator: IValidation<T>) { }

    create(item: T) {
        if (!this.Validator.validate(item)) return false
        return this.repository.create(item);
    }

    read() {
        return this.repository.read();
    }

    update(item: T) {
        if (!this.Validator.validate(item)) return false
        return this.repository.update(item);
    }

    delete(id: any) {
        return this.repository.delete(id)
    }

}

//---UI-WEB----

export class StudentWeb implements IView {
    private container: HTMLElement;

    constructor(
        private studentservice: IService<Student>,
        private loanservice: IService<Loan>
    ) {
        this.container = document.getElementById("content")!;
    }

    execute(): void {
        this.render();
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>Gestión de Estudiantes</h3>
            </div>

            <div id="studentAlert"></div>

            <!-- Formulario de Registro / Edición -->
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title" id="stFormTitle">Registrar Estudiante</h5>
                    <form id="studentForm" class="row g-3">
                        <input type="hidden" id="stEditingId">
                        <div class="col-md-4">
                            <label class="form-label">Nombre</label>
                            <input type="text" id="stName" class="form-control" placeholder="Ej. Juan Pérez" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Identificación</label>
                            <input type="text" id="stIdent" class="form-control" placeholder="Ej. 10203040" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Grado Escolar</label>
                            <input type="text" id="stGrade" class="form-control" placeholder="Ej. 11° A" required>
                        </div>
                        <div class="col-12 text-end">
                            <button type="button" id="stBtnCancel" class="btn btn-secondary d-none me-2">Cancelar</button>
                            <button type="submit" id="stBtnSubmit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Tabla de Estudiantes -->
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Grado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="studentTableBody"></tbody>
                </table>
            </div>
        `;

        this.attachEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        const btnCancel = document.getElementById("stBtnCancel") as HTMLButtonElement;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.saveStudent();
        });

        btnCancel.addEventListener("click", () => this.resetForm());
    }

    private saveStudent(): void {
        const editingId = (document.getElementById("stEditingId") as HTMLInputElement).value;
        const name = (document.getElementById("stName") as HTMLInputElement).value;
        const identification = (document.getElementById("stIdent") as HTMLInputElement).value;
        const schoolgrade = (document.getElementById("stGrade") as HTMLInputElement).value;

        if (editingId) {
            const student: Student = { id: editingId, name, identification, schoolgrade };
            if (this.studentservice.update(student)) {
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

            if (this.studentservice.create(student)) {
                this.showAlert("Estudiante registrado con éxito.", "success");
            } else {
                this.showAlert("Error al registrar estudiante.", "danger");
            }
        }

        this.resetForm();
        this.renderTable();
    }

    private editStudent(id: string): void {
        const student = this.studentservice.read().find(s => s.id === id);
        if (!student) return;

        (document.getElementById("stEditingId") as HTMLInputElement).value = student.id;
        (document.getElementById("stName") as HTMLInputElement).value = student.name;
        (document.getElementById("stIdent") as HTMLInputElement).value = student.identification;
        (document.getElementById("stGrade") as HTMLInputElement).value = student.schoolgrade;

        document.getElementById("stFormTitle")!.textContent = "Actualizar Estudiante";
        document.getElementById("stBtnSubmit")!.textContent = "Actualizar";
        document.getElementById("stBtnCancel")!.classList.remove("d-none");
    }

    private deleteStudent(id: string): void {
        const activeLoans = this.loanservice.read().filter(l => l.student.id === id && !l.returndate);
        if (activeLoans.length > 0) {
            this.showAlert("No se puede eliminar: El estudiante tiene préstamos activos.", "warning");
            return;
        }

        if (this.studentservice.delete(id)) {
            this.showAlert("Estudiante eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el estudiante.", "danger");
        }
    }

    private renderTable(): void {
        const tbody = document.getElementById("studentTableBody")!;
        const students = this.studentservice.read();

        tbody.innerHTML = students.length === 0 
            ? `<tr><td colspan="5" class="text-center text-muted">No hay estudiantes registrados.</td></tr>`
            : students.map(s => `
                <tr>
                    <td><small class="text-muted">${s.id}</small></td>
                    <td>${s.name}</td>
                    <td>${s.identification}</td>
                    <td>${s.schoolgrade}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning me-1 btn-edit" data-id="${s.id}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${s.id}">Eliminar</button>
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-edit").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.editStudent(id);
            });
        });

        tbody.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.deleteStudent(id);
            });
        });
    }

    private resetForm(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("stEditingId") as HTMLInputElement).value = "";
        document.getElementById("stFormTitle")!.textContent = "Registrar Estudiante";
        document.getElementById("stBtnSubmit")!.textContent = "Guardar";
        document.getElementById("stBtnCancel")!.classList.add("d-none");
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("studentAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

export class BookWeb implements IView {
    private container: HTMLElement;

    constructor(private bookservice: IService<Book>) {
        this.container = document.getElementById("content")!;
    }

    execute(): void {
        this.render();
    }

    private render(): void {
        this.container.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>Gestión de Libros</h3>
            </div>

            <div id="bookAlert"></div>

            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title" id="bkFormTitle">Registrar Libro</h5>
                    <form id="bookForm" class="row g-3">
                        <input type="hidden" id="bkEditingId">
                        <div class="col-md-6">
                            <label class="form-label">Título</label>
                            <input type="text" id="bkTitle" class="form-control" placeholder="Ej. Cien Años de Soledad" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Autor</label>
                            <input type="text" id="bkAuthor" class="form-control" placeholder="Ej. Gabriel García Márquez" required>
                        </div>
                        <div class="col-12 text-end">
                            <button type="button" id="bkBtnCancel" class="btn btn-secondary d-none me-2">Cancelar</button>
                            <button type="submit" id="bkBtnSubmit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="bookTableBody"></tbody>
                </table>
            </div>
        `;

        this.attachEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        const btnCancel = document.getElementById("bkBtnCancel") as HTMLButtonElement;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.saveBook();
        });

        btnCancel.addEventListener("click", () => this.resetForm());
    }

    private saveBook(): void {
        const editingId = (document.getElementById("bkEditingId") as HTMLInputElement).value;
        const title = (document.getElementById("bkTitle") as HTMLInputElement).value;
        const author = (document.getElementById("bkAuthor") as HTMLInputElement).value;

        if (editingId) {
            const existingBook = this.bookservice.read().find(b => b.id === editingId);
            const book: Book = {
                id: editingId,
                title,
                author,
                available: existingBook ? existingBook.available : true
            };

            if (this.bookservice.update(book)) {
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

            if (this.bookservice.create(book)) {
                this.showAlert("Libro registrado.", "success");
            } else {
                this.showAlert("Error al registrar libro.", "danger");
            }
        }

        this.resetForm();
        this.renderTable();
    }

    private editBook(id: string): void {
        const book = this.bookservice.read().find(b => b.id === id);
        if (!book) return;

        (document.getElementById("bkEditingId") as HTMLInputElement).value = book.id;
        (document.getElementById("bkTitle") as HTMLInputElement).value = book.title;
        (document.getElementById("bkAuthor") as HTMLInputElement).value = book.author;

        document.getElementById("bkFormTitle")!.textContent = "Actualizar Libro";
        document.getElementById("bkBtnSubmit")!.textContent = "Actualizar";
        document.getElementById("bkBtnCancel")!.classList.remove("d-none");
    }

    private deleteBook(id: string): void {
        const book = this.bookservice.read().find(b => b.id === id);
        if (book && !book.available) {
            this.showAlert("No se puede eliminar: El libro está prestado actualmente.", "warning");
            return;
        }

        if (this.bookservice.delete(id)) {
            this.showAlert("Libro eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el libro.", "danger");
        }
    }

    private renderTable(): void {
        const tbody = document.getElementById("bookTableBody")!;
        const books = this.bookservice.read();

        tbody.innerHTML = books.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay libros registrados.</td></tr>`
            : books.map(b => `
                <tr>
                    <td><small class="text-muted">${b.id}</small></td>
                    <td>${b.title}</td>
                    <td>${b.author}</td>
                    <td>
                        <span class="badge ${b.available ? 'bg-success' : 'bg-warning text-dark'}">
                            ${b.available ? 'Disponible' : 'Prestado'}
                        </span>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning me-1 btn-edit" data-id="${b.id}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${b.id}">Eliminar</button>
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-edit").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.editBook(id);
            });
        });

        tbody.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.deleteBook(id);
            });
        });
    }

    private resetForm(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("bkEditingId") as HTMLInputElement).value = "";
        document.getElementById("bkFormTitle")!.textContent = "Registrar Libro";
        document.getElementById("bkBtnSubmit")!.textContent = "Guardar";
        document.getElementById("bkBtnCancel")!.classList.add("d-none");
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("bookAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

export class LoanWeb implements IView {
    private container: HTMLElement;

    constructor(
        private studentservice: IService<Student>,
        private bookservice: IService<Book>,
        private loanservice: IService<Loan>
    ) {
        this.container = document.getElementById("content")!;
    }

    execute(): void {
        this.render();
    }

    private render(): void {
        const availableBooks = this.bookservice.read().filter(book => book.available);
        const students = this.studentservice.read();

        this.container.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>Gestión de Préstamos</h3>
            </div>

            <div id="loanAlert"></div>

            <!-- Formulario para realizar préstamo -->
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Prestar Libro</h5>
                    <form id="loanForm" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Estudiante</label>
                            <select id="lnStudent" class="form-select" required>
                                <option value="">Seleccione estudiante...</option>
                                ${students.map(s => `<option value="${s.id}">${s.name} (${s.identification})</option>`).join("")}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Libro Disponible</label>
                            <select id="lnBook" class="form-select" required>
                                <option value="">Seleccione libro...</option>
                                ${availableBooks.map(b => `<option value="${b.id}">${b.title} - ${b.author}</option>`).join("")}
                            </select>
                        </div>
                        <div class="col-12 text-end">
                            <button type="submit" class="btn btn-primary">Realizar Préstamo</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Tabla de préstamos -->
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>ID Préstamo</th>
                            <th>Libro</th>
                            <th>Estudiante</th>
                            <th>Fecha Préstamo</th>
                            <th>Fecha Devolución</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="loanTableBody"></tbody>
                </table>
            </div>
        `;

        this.attachEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("loanForm") as HTMLFormElement;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.createLoan();
        });
    }

    private createLoan(): void {
        const studentId = (document.getElementById("lnStudent") as HTMLSelectElement).value;
        const bookId = (document.getElementById("lnBook") as HTMLSelectElement).value;

        const student = this.studentservice.read().find(s => s.id === studentId);
        const book = this.bookservice.read().find(b => b.id === bookId);

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

        if (this.loanservice.create(loan)) {
            book.available = false;
            this.bookservice.update(book);

            this.showAlert("Préstamo registrado con éxito.", "success");
            this.render(); 
        } else {
            this.showAlert("Error al procesar el préstamo.", "danger");
        }
    }

    private returnBook(loanId: string): void {
        const loans = this.loanservice.read();
        const loan = loans.find(l => l.id === loanId);

        if (!loan || loan.returndate) {
            this.showAlert("El préstamo no existe o ya fue devuelto.", "warning");
            return;
        }

        loan.returndate = new Date();
        this.loanservice.update(loan);

        loan.book.available = true;
        this.bookservice.update(loan.book);

        this.showAlert("Libro devuelto con éxito.", "success");
        this.render();
    }

    private renderTable(): void {
        const tbody = document.getElementById("loanTableBody")!;
        const loans = this.loanservice.read();

        tbody.innerHTML = loans.length === 0
            ? `<tr><td colspan="6" class="text-center text-muted">No hay historial de préstamos.</td></tr>`
            : loans.map(l => `
                <tr>
                    <td><small class="text-muted">${l.id}</small></td>
                    <td>${l.book.title}</td>
                    <td>${l.student.name}</td>
                    <td>${new Date(l.loanDate).toLocaleDateString()}</td>
                    <td>
                        ${l.returndate 
                            ? `<span class="text-success">${new Date(l.returndate).toLocaleDateString()}</span>` 
                            : `<span class="badge bg-danger">Pendiente</span>`}
                    </td>
                    <td class="text-center">
                        ${!l.returndate 
                            ? `<button class="btn btn-sm btn-outline-success btn-return" data-id="${l.id}">Devolver</button>` 
                            : `<span class="text-muted"><small>Completado</small></span>`}
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-return").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.returnBook(id);
            });
        });
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("loanAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

export class Menuweb implements IView {
    constructor(
        private studentMenu: IView,
        private bookMenu: IView,
        private loanMenu: IView
    ) { }

    execute(): void {
        const btnStudents = document.getElementById("menuStudents")!;
        const btnBooks = document.getElementById("menuBooks")!;
        const btnLoans = document.getElementById("menuLoans")!;

        const navLinks = [btnStudents, btnBooks, btnLoans];

        const setActive = (selected: HTMLElement) => {
            navLinks.forEach(link => link.classList.remove("active", "fw-bold"));
            selected.classList.add("active", "fw-bold");
        };

        btnStudents.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(btnStudents);
            this.studentMenu.execute();
        });

        btnBooks.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(btnBooks);
            this.bookMenu.execute();
        });

        btnLoans.addEventListener("click", (e) => {
            e.preventDefault();
            setActive(btnLoans);
            this.loanMenu.execute();
        });

        setActive(btnStudents);
        this.studentMenu.execute();
    }
}

export class LoginWeb implements IView {

    constructor(private menuWeb: IView) {}

    execute(): void {

        document.getElementById("loginForm")!.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = (document.getElementById("username") as HTMLInputElement).value;
            const pass = (document.getElementById("password") as HTMLInputElement).value;

            if (user === "admin" && pass === "1234") {
                document.getElementById("login")!.classList.add("d-none");
                document.getElementById("dashboard")!.classList.remove("d-none");
                this.menuWeb.execute();
            } else {
                alert("Credenciales incorrectas");
            }
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

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const studentValidator = new Validation<Student>();
const bookValidator = new Validation<Book>();
const loanValidator = new Validation<Loan>();

const loanservice = new Service<Loan>(repositoryloan, loanValidator);
const studentservice = new Service<Student>(repositorystudent, studentValidator);
const bookservice = new Service<Book>(repositorybook, bookValidator);

const studentWeb = new StudentWeb(studentservice, loanservice);
const bookWeb = new BookWeb(bookservice);
const loanWeb = new LoanWeb(studentservice, bookservice, loanservice);

const menuWeb = new Menuweb(studentWeb, bookWeb, loanWeb);

const loginweb = new LoginWeb(menuWeb);

const app = new App(loginweb);
app.run();
