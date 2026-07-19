"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.MenuConsole = exports.MemoryRAM = void 0;
var promptSync = require("prompt-sync");
var prompt = promptSync();
//---------------------------------------
var MemoryRAM = /** @class */ (function () {
    function MemoryRAM() {
        this.memory = [];
    }
    MemoryRAM.prototype.create = function (some) {
        var index = this.memory.findIndex(function (item) { return item.id === some.id; });
        if (index !== -1) {
            return false;
        }
        this.memory.push(some);
        return true;
    };
    MemoryRAM.prototype.delete = function (id) {
        var index = this.memory.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this.memory.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    MemoryRAM.prototype.update = function (some) {
        var index = this.memory.findIndex(function (item) { return item.id === some.id; });
        if (index === -1) {
            return false;
        }
        this.memory[index] = some;
        return true;
    };
    MemoryRAM.prototype.read = function () {
        return this.memory;
    };
    MemoryRAM.prototype.findbyid = function (id) {
        return this.memory.filter(function (item) { return item.id === id; });
    };
    return MemoryRAM;
}());
exports.MemoryRAM = MemoryRAM;
//---------------------------
var MenuConsole = /** @class */ (function () {
    function MenuConsole(StudentPersistence, BookPersistence, LoanPersistence) {
        this.StudentPersistence = StudentPersistence;
        this.BookPersistence = BookPersistence;
        this.LoanPersistence = LoanPersistence;
    }
    MenuConsole.prototype.execute = function () {
        var star = true;
        while (star) {
            this.showMenu();
            var opcion = Number(prompt("Seleccione opción: "));
            switch (opcion) {
                case 1:
                    this.Registerstudent();
                    this.pause();
                    break;
                case 2:
                    this.deletestudent();
                    this.pause();
                    break;
                case 3:
                    console.table(this.StudentPersistence.read());
                    this.pause();
                    break;
                case 4:
                    this.Updatestudent();
                    this.pause();
                    break;
                case 5:
                    this.Findstudent();
                    this.pause();
                    break;
                case 6:
                    this.Registerbook();
                    this.pause();
                    break;
                case 7:
                    this.Deletebook();
                    this.pause();
                    break;
                case 8:
                    this.readbooks();
                    this.pause();
                    break;
                case 9:
                    this.Updatebook();
                    this.pause();
                    break;
                case 10:
                    this.Searchforbook();
                    this.pause();
                    break;
                case 11:
                    this.Lendbook();
                    this.pause();
                    break;
                case 12:
                    this.Returnbook();
                    this.pause();
                    break;
                case 13:
                    this.readLoans();
                    this.pause();
                    break;
                case 14:
                    this.Findaloan();
                    this.pause();
                    break;
                case 15:
                    this.updateLoan();
                    this.pause();
                    break;
                case 0:
                    star = false;
                    break;
                default:
                    console.log("Opción inválida");
                    this.pause();
            }
        }
    };
    MenuConsole.prototype.showMenu = function () {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        var opciones = [
            "1. Registrar estudiante",
            "2. Eliminar estudiante",
            "3. Ver estudiante",
            "4. Actualizar estudiante",
            "5. Buscar estudiante",
            "6. Registrar libro",
            "7. Eliminar libro",
            "8. Ver libros",
            "9. Actualizar libro",
            "10. Buscar libro",
            "11. Prestar libro",
            "12. Devolver libro",
            "13. Mostrar prestamos",
            "14. Buscar Prestamo",
            "15. Actualizar Prestamo",
            "0. Salir"
        ];
        for (var _i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
            var opcion = opciones_1[_i];
            console.log(opcion);
        }
    };
    MenuConsole.prototype.Registerstudent = function () {
        var id = String(prompt("ID: "));
        var name = String(prompt("Nombre: "));
        var identification = String(prompt("Identificación: "));
        var schoolgrade = String(prompt("Grado Escolar: "));
        var RegisteringStudent = {
            id: id,
            name: name,
            identification: identification,
            schoolgrade: schoolgrade
        };
        var Registeredstudent = this.StudentPersistence.create(RegisteringStudent);
        if (Registeredstudent) {
            console.log("Estudiante registrado");
        }
        else {
            console.log("El Estudiante ya existe con este ID");
        }
    };
    MenuConsole.prototype.deletestudent = function () {
        var id = String(prompt("ID: "));
        var Eliminatestudent = this.StudentPersistence.delete(id);
        if (Eliminatestudent) {
            console.log("Estudiante Estudiante Eliminado");
        }
        else {
            console.log("No existe un estudiante con ese ID");
        }
    };
    MenuConsole.prototype.Updatestudent = function () {
        var id = String(prompt("ID: "));
        var name = String(prompt("Nombre: "));
        var identification = String(prompt("Identificación: "));
        var schoolgrade = String(prompt("Grado Escolar: "));
        var Existingstudent = {
            id: id,
            name: name,
            identification: identification,
            schoolgrade: schoolgrade
        };
        var Updatedstudent = this.StudentPersistence.update(Existingstudent);
        if (Updatedstudent) {
            console.log("Estudiante actualizado");
        }
        else {
            console.log("No existe un estudiante con ese ID");
        }
    };
    MenuConsole.prototype.Findstudent = function () {
        var id = String(prompt("ID Estudiante: "));
        var result = this.StudentPersistence.findbyid(id);
        if (result.length === 0) {
            console.log("Estudiante no encontrado");
            return;
        }
        console.log("\n===== RESULTADO =====");
        result.forEach(function (Student) { return console.log(Student); });
    };
    MenuConsole.prototype.Registerbook = function () {
        var id = String(prompt("ID: "));
        var title = String(prompt("Título: "));
        var author = String(prompt("Autor: "));
        var registeringBook = {
            id: id,
            title: title,
            author: author,
            available: true
        };
        var Bookregistered = this.BookPersistence.create(registeringBook);
        if (Bookregistered) {
            console.log("Libro registrado");
        }
        else {
            console.log("El Libro ya existe con este ID");
        }
    };
    MenuConsole.prototype.Deletebook = function () {
        var idBook = String(prompt("ID Libro: "));
        var Eliminatebook = this.BookPersistence.delete(idBook);
        if (Eliminatebook) {
            console.log("Libro eliminado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuConsole.prototype.Updatebook = function () {
        var id = String(prompt("ID del libro: "));
        var title = String(prompt("Título: "));
        var author = String(prompt("Autor: "));
        var ExistingBook = {
            id: id,
            title: title,
            author: author,
            available: true
        };
        var UpdateBook = this.BookPersistence.update(ExistingBook);
        if (UpdateBook) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID");
        }
    };
    MenuConsole.prototype.readbooks = function () {
        var Books = this.BookPersistence.read();
        var readBooks = Books.map(function (Book) { return ({
            id: Book.id,
            title: Book.title,
            author: Book.author,
            available: Book.available ? "Sí" : "No"
        }); });
        console.table(readBooks);
    };
    MenuConsole.prototype.Searchforbook = function () {
        var id = String(prompt("ID del libro: "));
        var result = this.BookPersistence.findbyid(id);
        if (result.length === 0) {
            console.log("Libro no encontrado");
            return;
        }
        console.log("\n===== RESULTADO =====");
        result.forEach(function (Book) { return console.log(Book); });
    };
    MenuConsole.prototype.Lendbook = function () {
        var idBook = String(prompt("ID del Libro: "));
        var idStudent = String(prompt("ID del Estudiante: "));
        var book = this.BookPersistence.findbyid(idBook)[0];
        if (!book) {
            console.log("El libro no existe");
            return;
        }
        if (!book.available) {
            console.log("Libro no disponible");
            return;
        }
        var student = this.StudentPersistence.findbyid(idStudent)[0];
        if (!student) {
            console.log("EL estudiante no existe");
            return;
        }
        var Loan = {
            id: Math.random().toString(),
            book: book,
            student: student,
            loanDate: new Date()
        };
        var estado = this.LoanPersistence.create(Loan);
        if (!estado) {
            console.log("Error al prestar al libro");
            return;
        }
        book.available = false;
        this.BookPersistence.update(book);
        console.log("Libro prestado correctamente");
    };
    MenuConsole.prototype.Returnbook = function () {
        var idBook = String(prompt("ID del libro: "));
        var Loans = this.LoanPersistence.read();
        var Loan = Loans.find(function (borrowed) {
            return borrowed.book.id === idBook && !borrowed.returndate;
        });
        if (!Loan) {
            console.log("No hay préstamo activo para este libro");
            return;
        }
        Loan.returndate = new Date();
        this.LoanPersistence.update(Loan);
        Loan.book.available = true;
        this.BookPersistence.update(Loan.book);
        console.log("Libo devuelto correctamente");
    };
    MenuConsole.prototype.readLoans = function () {
        var Loans = this.LoanPersistence.read();
        console.log("\n===== PRÉSTAMOS =====");
        if (Loans.length === 0) {
            console.log("No hay préstamos");
            return;
        }
        Loans.forEach(function (loan) {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            });
        });
    };
    MenuConsole.prototype.Findaloan = function () {
        var idBook = String(prompt("ID del Libro: "));
        var Loans = this.LoanPersistence.read();
        var Loan = Loans.find(function (loan) {
            return loan.book.id === idBook && !loan.returndate;
        });
        if (!Loan) {
            console.log("Libro disponible (no prestado)");
            return;
        }
        console.log("\n===== PRÉSTAMO ACTIVO =====");
        console.log({
            Book: Loan.book.title,
            Student: Loan.student.name,
            fecha: Loan.loanDate
        });
    };
    MenuConsole.prototype.updateLoan = function () {
        var id = String(prompt("ID del Prestamo: "));
        var Loans = this.LoanPersistence.read();
        var Loan = Loans.find(function (borrowed) { return borrowed.id === id; });
        if (!Loan) {
            console.log("Préstamo no encontrado");
            return;
        }
        var fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):");
        Loan.loanDate = new Date(fecha);
        var status = this.LoanPersistence.update(Loan);
        console.log(status ? "Préstamo actualizado" : "Error");
    };
    MenuConsole.prototype.pause = function () {
        prompt("\nPresiona ENTER para continuar...");
    };
    return MenuConsole;
}());
exports.MenuConsole = MenuConsole;
//-------------------
var App = /** @class */ (function () {
    function App(menu) {
        this.menu = menu;
    }
    App.prototype.run = function () {
        this.menu.execute();
    };
    return App;
}());
exports.App = App;
var MemoryBook = new MemoryRAM();
var MemoryStudent = new MemoryRAM();
var MemoryLoan = new MemoryRAM();
var menu = new MenuConsole(MemoryStudent, MemoryBook, MemoryLoan);
var app = new App(menu);
app.run();
