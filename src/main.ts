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

export interface IService<T> {
    create(item: T): boolean;
    read(): Array<T>;
    update(item: T): boolean;
    delete(id: any): boolean;
}

export interface IValidation<T> {
    validate(item: T): any;
}

export interface IView {
    execute(): void;
}

export interface IStudentview extends IView {

}

export interface IBookview extends IView {
    
}

export interface ILoanview extends IView {
    
}

export interface IMenuview extends IView {

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

//------------------ UI-WEB REFACTORIZADO ------------------

//-----------Studentweb--------------
export class StudentWeb implements IStudentview {

    constructor(
        private studentservice: IService<Student>,
        private loanservice: IService<Loan>
    ) { }

    execute(): void {
        this.attachEvents();
        this.renderTable();
    }

    private attachEvents(): void {

        const form =
            document.getElementById("studentForm") as HTMLFormElement;

        const btnCancel =
            document.getElementById("stBtnCancel") as HTMLButtonElement;


        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveStudent();
        });


        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });
    }


    private saveStudent(): void {

        const editingId =
            (document.getElementById("stEditingId") as HTMLInputElement).value;

        const name =
            (document.getElementById("stName") as HTMLInputElement).value;

        const identification =
            (document.getElementById("stIdent") as HTMLInputElement).value;

        const schoolgrade =
            (document.getElementById("stGrade") as HTMLInputElement).value;


        if (editingId) {

            const student: Student = {
                id: editingId,
                name,
                identification,
                schoolgrade
            };

            if (this.studentservice.update(student)) {
                this.showAlert(
                    "Estudiante actualizado con éxito.",
                    "success"
                );
            } else {
                this.showAlert(
                    "Error al actualizar estudiante.",
                    "danger"
                );
            }

        } else {
            const student: Student = {
                id: Math.random()
                    .toString(36)
                    .substring(2, 9),

                name,
                identification,
                schoolgrade
            };

            if (!this.studentservice.create(student)) {
                this.showAlert(
                    "Error al registrar estudiante.",
                    "danger"
                );
            } else {
                this.showAlert(
                    "Estudiante registrado con éxito.",
                    "success"
                );
            }
        }

        this.resetForm();
        this.renderTable();
    }

    private renderTable(): void {
        const tbody = document.getElementById("studentTableBody")!;
        const students = this.studentservice.read();

        tbody.innerHTML = students.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay estudiantes registrados.</td></tr>`
            : students.map(student => `
                <tr>
                    <td><small class="text-muted">${student.id}</small></td>
                    <td>${student.name}</td>
                    <td>${student.identification}</td>
                    <td>${student.schoolgrade}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning me-1 btn-edit" data-id="${student.id}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${student.id}">Eliminar</button>
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-edit").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.editStudent(id);
            });
        });

        tbody.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.deleteStudent(id);
            });
        });
    }

    private editStudent(id: string): void {
        const student = this.studentservice.read().find(student => student.id === id);
        if (!student) return;

        (document.getElementById("stEditingId") as HTMLInputElement).value = student.id;
        (document.getElementById("stName") as HTMLInputElement).value = student.name;
        (document.getElementById("stIdent") as HTMLInputElement).value = student.identification;
        (document.getElementById("stGrade") as HTMLInputElement).value = student.schoolgrade;

        document.getElementById("stFormTitle")!.textContent = "Actualizar Estudiante";
        document.getElementById("stBtnSubmit")!.textContent = "Actualizar";
        document.getElementById("stBtnCancel")!.classList.remove("d-none");
    }

    private resetForm(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("stEditingId") as HTMLInputElement).value = "";
        document.getElementById("stFormTitle")!.textContent = "Registrar Estudiante";
        document.getElementById("stBtnSubmit")!.textContent = "Guardar";
        document.getElementById("stBtnCancel")!.classList.add("d-none");
    }

    private deleteStudent(id: string): void {
        const activeLoans = this.loanservice.read().filter(loan => loan.student.id === id && !loan.returndate);
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

//------------Bookweb------
export class BookWeb implements IBookview {

    constructor(
        private bookservice: IService<Book>
    ) { }

    execute(): void {
        this.attachEvents();
        this.renderTable();
    }

    private attachEvents(): void {

        const form =
            document.getElementById("bookForm") as HTMLFormElement;

        const btnCancel =
            document.getElementById("bkBtnCancel") as HTMLButtonElement;


        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveBook();
        });


        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });
    }

    private renderTable(): void {
        const tbody = document.getElementById("bookTableBody")!;
        const books = this.bookservice.read();

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
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-warning me-1 btn-edit" data-id="${book.id}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${book.id}">Eliminar</button>
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-edit").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.editBook(id);
            });
        });

        tbody.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                this.deleteBook(id);
            });
        });
    }

    private editBook(id: string): void {
        const book = this.bookservice.read().find(book => book.id === id);
        if (!book) return;

        (document.getElementById("bkEditingId") as HTMLInputElement).value = book.id;
        (document.getElementById("bkTitle") as HTMLInputElement).value = book.title;
        (document.getElementById("bkAuthor") as HTMLInputElement).value = book.author;

        document.getElementById("bkFormTitle")!.textContent = "Actualizar Libro";
        document.getElementById("bkBtnSubmit")!.textContent = "Actualizar";
        document.getElementById("bkBtnCancel")!.classList.remove("d-none");
    }

    private saveBook(): void {
        const editingId = (document.getElementById("bkEditingId") as HTMLInputElement).value;
        const title = (document.getElementById("bkTitle") as HTMLInputElement).value;
        const author = (document.getElementById("bkAuthor") as HTMLInputElement).value;

        if (editingId) {
            const existingBook = this.bookservice.read().find(book => book.id === editingId);
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

            if (!this.bookservice.create(book)) {
                this.showAlert("Error al registrar libro.", "danger");
            } else {
                this.showAlert("Libro registrado.", "success");
            }
        }

        this.resetForm();
        this.renderTable();
    }

    private resetForm(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("bkEditingId") as HTMLInputElement).value = "";
        document.getElementById("bkFormTitle")!.textContent = "Registrar Libro";
        document.getElementById("bkBtnSubmit")!.textContent = "Guardar";
        document.getElementById("bkBtnCancel")!.classList.add("d-none");
    }

    private deleteBook(id: string): void {
        const book = this.bookservice.read().find(book => book.id === id);
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

//--------------Loanweb-----------

export class LoanWeb implements ILoanview {

    constructor(
        private studentservice: IService<Student>,
        private bookservice: IService<Book>,
        private loanservice: IService<Loan>
    ) {}

    execute(): void {
        this.attachEvents();
        this.renderDropdowns();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("loanForm") as HTMLFormElement;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.createLoan();
        });
    }

    private renderDropdowns(): void {
        const selectStudent = document.getElementById("lnStudent") as HTMLSelectElement;
        const selectBook = document.getElementById("lnBook") as HTMLSelectElement;

        const students = this.studentservice.read();
        const availableBooks = this.bookservice.read().filter(book => book.available);

        selectStudent.innerHTML = `<option value="">Seleccione estudiante...</option>` +
            students.map(student => `<option value="${student.id}">${student.name} (${student.identification})</option>`).join("");

        selectBook.innerHTML = `<option value="">Seleccione libro...</option>` +
            availableBooks.map(book => `<option value="${book.id}">${book.title} - ${book.author}</option>`).join("");
    }

    private createLoan(): void {
        const studentId = (document.getElementById("lnStudent") as HTMLSelectElement).value;
        const bookId = (document.getElementById("lnBook") as HTMLSelectElement).value;

        const student = this.studentservice.read().find(findstudent => findstudent.id === studentId);
        const book = this.bookservice.read().find(findbook => findbook.id === bookId);

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
            this.execute();
        }
    }

    private returnBook(loanId: string): void {
        const loans = this.loanservice.read();
        const loan = loans.find(loan => loan.id === loanId);

        if (!loan || loan.returndate) {
            this.showAlert("El préstamo no existe o ya fue devuelto.", "warning");
            return;
        }

        loan.returndate = new Date();
        this.loanservice.update(loan);

        loan.book.available = true;
        this.bookservice.update(loan.book);

        this.showAlert("Libro devuelto con éxito.", "success");
        this.execute();
    }

    private renderTable(): void {
        const tbody = document.getElementById("loanTableBody")!;
        const loans = this.loanservice.read();

        tbody.innerHTML = loans.length === 0
            ? `<tr><td colspan="6" class="text-center text-muted">No hay historial de préstamos.</td></tr>`
            : loans.map(loan => `
                <tr>
                    <td><small class="text-muted">${loan.id}</small></td>
                    <td>${loan.book.title}</td>
                    <td>${loan.student.name}</td>
                    <td>${new Date(loan.loanDate).toLocaleDateString()}</td>
                    <td>
                        ${loan.returndate
                    ? `<span class="text-success">${new Date(loan.returndate).toLocaleDateString()}</span>`
                    : `<span class="badge bg-danger">Pendiente</span>`}
                    </td>
                    <td class="text-center">
                        ${!loan.returndate
                    ? `<button class="btn btn-sm btn-outline-success btn-return" data-id="${loan.id}">Devolver</button>`
                    : `<span class="text-muted"><small>Completado</small></span>`}
                    </td>
                </tr>
            `).join("");

        tbody.querySelectorAll(".btn-return").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
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

//---------------Menuweb-----------

export class Menuweb implements IMenuview {

    constructor(
        private studentMenu: IStudentview,
        private bookMenu: IBookview,
        private loanMenu: ILoanview
    ) {}

    execute(): void {

        const btnStudents =
            document.getElementById("menuStudents")!;

        const btnBooks =
            document.getElementById("menuBooks")!;

        const btnLoans =
            document.getElementById("menuLoans")!;


        btnStudents.addEventListener("click", (e) => {

            e.preventDefault();

            this.showView("studentView");

            this.studentMenu.execute();
        });


        btnBooks.addEventListener("click", (e) => {

            e.preventDefault();

            this.showView("bookView");

            this.bookMenu.execute();
        });


        btnLoans.addEventListener("click", (event) => {

            event.preventDefault();

            this.showView("loanView");

            this.loanMenu.execute();
        });


        this.showView("studentView");

        this.studentMenu.execute();
    }


    private showView(viewId: string): void {

        const views = [
            "studentView",
            "bookView",
            "loanView"
        ];


        views.forEach(id => {

            document
                .getElementById(id)!
                .classList.add("d-none");

        });


        document
            .getElementById(viewId)!
            .classList.remove("d-none");
    }
}

export class LoginWeb implements IView {

    constructor(
        private menuWeb: IMenuview
    ) { }

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