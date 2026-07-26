"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsole = exports.BookConsole = exports.StudentConsole = exports.MenuConsole = exports.MemoryRAM = void 0;
var promptSync = require("prompt-sync");
var prompt = promptSync();
//----------INFRAESTRUCTURE/PERSISTENCIE--------------
var MemoryRAM = /** @class */ (function () {
    function MemoryRAM() {
        this.memory = [];
    }
    MemoryRAM.prototype.create = function (some) {
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
//------UI---------
var MenuConsole = /** @class */ (function () {
    function MenuConsole(studentMenu, bookMenu, loanMenu) {
        this.studentMenu = studentMenu;
        this.bookMenu = bookMenu;
        this.loanMenu = loanMenu;
    }
    MenuConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
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
    };
    MenuConsole.prototype.showMenu = function () {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        var opciones = [
            "1. Registrar, Eliminar, Ver, Actualizar,  Buscar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar,  Buscar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos, Buscar Prestamo, Actualizar Prestamo",
            "0. Salir"
        ];
        for (var _i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
            var opcion = opciones_1[_i];
            console.log(opcion);
        }
    };
    return MenuConsole;
}());
exports.MenuConsole = MenuConsole;
//----------------------------
var StudentConsole = /** @class */ (function () {
    function StudentConsole(studentrepository) {
        this.studentrepository = studentrepository;
    }
    StudentConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.createstudent();
                    break;
                case 2:
                    this.deletestudent();
                    break;
                case 3:
                    this.readstudent();
                    break;
                case 4:
                    this.updatestudent();
                    break;
                case 5:
                    this.findbyidstudent();
                    break;
                case 0:
                    run = false;
                    break;
            }
        }
    };
    StudentConsole.prototype.showMenu = function () {
        var opciones = [
            "1. Registrar estudiante",
            "2. Eliminar estudiante",
            "3. Ver estudiante",
            "4. Actualizar estudiante",
            "5. Buscar estudiante",
            "0. Salir"
        ];
        for (var _i = 0, opciones_2 = opciones; _i < opciones_2.length; _i++) {
            var opcion = opciones_2[_i];
            console.log(opcion);
        }
    };
    StudentConsole.prototype.inputstudent = function () {
        var id = prompt("ID: ");
        var name = prompt("Nombre: ");
        var identification = prompt("Identificación: ");
        var schoolgrade = prompt("Grado Escolar: ");
        return {
            id: id,
            name: name,
            identification: identification,
            schoolgrade: schoolgrade
        };
    };
    StudentConsole.prototype.createstudent = function () {
        var student = this.inputstudent();
        var existing = this.studentrepository.findbyid(student.id);
        if (existing.length > 0) {
            console.log("El estudiante ya existe con este id");
        }
        else {
            this.studentrepository.create(student);
            console.log("Estudiante registrado");
        }
    };
    StudentConsole.prototype.deletestudent = function () {
        var id = prompt("ID: ");
        var status = this.studentrepository.delete(id);
        if (status) {
            console.log("Estudiante eliminado");
        }
        else {
            console.log("No existe un estudiante.");
        }
    };
    StudentConsole.prototype.updatestudent = function () {
        var student = this.inputstudent();
        var existing = this.studentrepository.findbyid(student.id);
        if (existing.length === 0) {
            console.log("Este estudiante no exite con este id");
        }
        else {
            this.studentrepository.update(student);
            console.log("Estudiante actualizado");
        }
    };
    StudentConsole.prototype.findbyidstudent = function () {
        var id = prompt("ID: ");
        var students = this.studentrepository.findbyid(id);
        if (students.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(students);
    };
    StudentConsole.prototype.readstudent = function () {
        console.table(this.studentrepository.read());
    };
    return StudentConsole;
}());
exports.StudentConsole = StudentConsole;
//------------------------------------
var BookConsole = /** @class */ (function () {
    function BookConsole(bookrepository) {
        this.bookrepository = bookrepository;
    }
    BookConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.createbook();
                    break;
                case 2:
                    this.deletebook();
                    break;
                case 3:
                    this.readbook();
                    break;
                case 4:
                    this.updatebook();
                    break;
                case 5:
                    this.findbyid();
                    break;
                case 0:
                    run = false;
                    break;
            }
        }
    };
    BookConsole.prototype.showMenu = function () {
        var opciones = [
            "1. Registrar libro",
            "2. Eliminar libro",
            "3. Ver libro",
            "4. Actualizar libro",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (var _i = 0, opciones_3 = opciones; _i < opciones_3.length; _i++) {
            var opcion = opciones_3[_i];
            console.log(opcion);
        }
    };
    BookConsole.prototype.inputbook = function () {
        var id = prompt("ID: ");
        var title = prompt("Titulo: ");
        var author = prompt("Autor: ");
        var available = true;
        return {
            id: id,
            title: title,
            author: author,
            available: available
        };
    };
    BookConsole.prototype.createbook = function () {
        var book = this.inputbook();
        var existingbook = this.bookrepository.findbyid(book.id);
        if (existingbook.length > 0) {
            console.log("El libro ya existe con este id.");
        }
        else {
            this.bookrepository.create(book);
            console.log("Libro registrado");
        }
    };
    BookConsole.prototype.readbook = function () {
        console.table(this.bookrepository.read());
    };
    BookConsole.prototype.updatebook = function () {
        var book = this.inputbook();
        var existing = this.bookrepository.findbyid(book.id);
        if (existing.length === 0) {
            console.log("No existe un libro con ese ID.");
        }
        else {
            this.bookrepository.update(book);
            console.log("Libro actualizado");
        }
    };
    BookConsole.prototype.deletebook = function () {
        var id = prompt("ID: ");
        var status = this.bookrepository.delete(id);
        if (status) {
            console.log("Libro eliminado");
        }
        else {
            console.log("No existe un libro con este id.");
        }
    };
    BookConsole.prototype.findbyid = function () {
        var id = prompt("ID: ");
        var books = this.bookrepository.findbyid(id);
        if (books.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(books);
    };
    return BookConsole;
}());
exports.BookConsole = BookConsole;
//-----------------------
var LoanConsole = /** @class */ (function () {
    function LoanConsole(loanrepository, bookrepository, studentrepository) {
        this.loanrepository = loanrepository;
        this.bookrepository = bookrepository;
        this.studentrepository = studentrepository;
    }
    LoanConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.lendbook();
                    break;
                case 2:
                    this.returnbook();
                    break;
                case 3:
                    this.readloan();
                    break;
                case 4:
                    this.updateloan();
                    break;
                case 5:
                    this.findbyidloan();
                    break;
                case 0:
                    run = false;
                    break;
            }
        }
    };
    LoanConsole.prototype.showMenu = function () {
        var opciones = [
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "4. Actualizar prestamo",
            "5. Buscar prestamo",
            "0. Salir"
        ];
        for (var _i = 0, opciones_4 = opciones; _i < opciones_4.length; _i++) {
            var opcion = opciones_4[_i];
            console.log(opcion);
        }
    };
    LoanConsole.prototype.lendbook = function () {
        var idbook = prompt("ID Libro: ");
        var book = this.bookrepository.findbyid(idbook)[0];
        if (!book) {
            console.log("El libro no existe");
            return;
        }
        if (!book.available) {
            console.log("El libro no está disponible");
            return;
        }
        var idstudent = prompt("ID Estudiante: ");
        var student = this.studentrepository.findbyid(idstudent)[0];
        if (!student) {
            console.log("El estudiante no existe");
            return;
        }
        var loanDate = new Date();
        var returndate = new Date(loanDate);
        returndate.setDate(loanDate.getDate() + 3);
        var loan = {
            id: Math.random().toString(),
            book: book,
            student: student,
            loanDate: loanDate,
            returndate: returndate
        };
        var existingLoan = this.loanrepository.findbyid(loan.id);
        if (existingLoan.length > 0) {
            console.log("Ya existe un préstamo con ese id");
            return;
        }
        this.loanrepository.create(loan);
        book.available = false;
        this.bookrepository.update(book);
        console.log("Libro prestado con devolución en 3 días");
    };
    LoanConsole.prototype.returnbook = function () {
        var idBook = prompt("ID Libro: ");
        var loan = this.loanrepository.read().find(function (loan) { return loan.book.id === idBook; });
        if (!loan) {
            console.log("No existe préstamo activo");
            return;
        }
        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);
        console.log("Libro devuelto");
    };
    LoanConsole.prototype.readloan = function () {
        var Loans = this.loanrepository.read();
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
    LoanConsole.prototype.updateloan = function () {
        var id = prompt("ID préstamo: ");
        var existing = this.loanrepository.findbyid(id);
        if (existing.length === 0) {
            console.log("Préstamo no encontrado");
            return;
        }
        var loan = existing[0];
        loan.returndate = new Date(prompt("Fecha (YYYY-MM-DD): "));
        this.loanrepository.update(loan);
        console.log("Préstamo actualizado");
    };
    LoanConsole.prototype.findbyidloan = function () {
        var idloan = prompt("ID préstamo: ");
        var loans = this.loanrepository.findbyid(idloan);
        if (loans.length === 0) {
            console.log("No encontrado");
            return;
        }
        loans.forEach(function (loan) {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate
            });
        });
    };
    return LoanConsole;
}());
exports.LoanConsole = LoanConsole;
//-----CLASE-CONSUMIDORA-APP--------------
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
//-----PUNTO-DE-ENTRADA--------------
var MemoryBook = new MemoryRAM();
var MemoryStudent = new MemoryRAM();
var MemoryLoan = new MemoryRAM();
var studentconsole = new StudentConsole(MemoryStudent);
var bookconsole = new BookConsole(MemoryBook);
var loanconsole = new LoanConsole(MemoryLoan, MemoryBook, MemoryStudent);
var menu = new MenuConsole(studentconsole, bookconsole, loanconsole);
var app = new App(menu);
app.run();
