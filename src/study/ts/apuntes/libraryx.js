"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsole = exports.LoanUseCase = exports.BookConsole = exports.BookUseCase = exports.StudentConsole = exports.StudentUseCase = exports.MenuConsole = exports.MemoryRAM = void 0;
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
    MemoryRAM.prototype.createbyid = function (id, some) {
        return this.create(__assign(__assign({}, some), { id: id }));
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
    MemoryRAM.prototype.updatebyid = function (id, some) {
        return this.update(__assign(__assign({}, some), { id: id }));
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
//---------------
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
//-----------------------------
var StudentUseCase = /** @class */ (function () {
    function StudentUseCase(studentPersistence) {
        this.studentPersistence = studentPersistence;
    }
    StudentUseCase.prototype.create = function (student) {
        var existing = this.studentPersistence.findbyid(student.id);
        if (existing.length > 0) {
            return false;
        }
        return this.studentPersistence.create(student);
    };
    StudentUseCase.prototype.delete = function (id) {
        return this.studentPersistence.delete(id);
    };
    StudentUseCase.prototype.update = function (student) {
        var existing = this.studentPersistence.findbyid(student.id);
        if (existing.length === 0) {
            return false;
        }
        return this.studentPersistence.update(student);
    };
    StudentUseCase.prototype.read = function () {
        return this.studentPersistence.read();
    };
    StudentUseCase.prototype.findbyid = function (id) {
        return this.studentPersistence.findbyid(id);
    };
    return StudentUseCase;
}());
exports.StudentUseCase = StudentUseCase;
var StudentConsole = /** @class */ (function () {
    function StudentConsole(studentservice) {
        this.studentservice = studentservice;
    }
    StudentConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.create();
                    break;
                case 2:
                    this.delete();
                    break;
                case 3:
                    this.read();
                    break;
                case 4:
                    this.update();
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
    StudentConsole.prototype.readStudent = function () {
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
    StudentConsole.prototype.create = function () {
        var student = this.readStudent();
        var status = this.studentservice.create(student);
        if (status) {
            console.log("Estudiante registrado");
        }
        else {
            console.log("El estudiante ya existe.");
        }
    };
    StudentConsole.prototype.delete = function () {
        var id = prompt("ID: ");
        var status = this.studentservice.delete(id);
        if (status) {
            console.log("Estudiante eliminado");
        }
        else {
            console.log("No existe un estudiante.");
        }
    };
    StudentConsole.prototype.update = function () {
        var student = this.readStudent();
        var status = this.studentservice.update(student);
        if (status) {
            console.log("Estudiante actualizado");
        }
        else {
            console.log("No existe un estudiante con ese ID.");
        }
    };
    StudentConsole.prototype.findbyid = function () {
        var id = prompt("ID: ");
        var students = this.studentservice.findbyid(id);
        if (students.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(students);
    };
    StudentConsole.prototype.read = function () {
        console.table(this.studentservice.read());
    };
    return StudentConsole;
}());
exports.StudentConsole = StudentConsole;
//------------------------
var BookUseCase = /** @class */ (function () {
    function BookUseCase(bookservice) {
        this.bookservice = bookservice;
    }
    BookUseCase.prototype.create = function (student) {
        var existing = this.bookservice.findbyid(student.id);
        if (existing.length > 0) {
            return false;
        }
        return this.bookservice.create(student);
    };
    BookUseCase.prototype.delete = function (id) {
        return this.bookservice.delete(id);
    };
    BookUseCase.prototype.update = function (student) {
        var existing = this.bookservice.findbyid(student.id);
        if (existing.length === 0) {
            return false;
        }
        return this.bookservice.update(student);
    };
    BookUseCase.prototype.read = function () {
        return this.bookservice.read();
    };
    BookUseCase.prototype.findbyid = function (id) {
        return this.bookservice.findbyid(id);
    };
    return BookUseCase;
}());
exports.BookUseCase = BookUseCase;
var BookConsole = /** @class */ (function () {
    function BookConsole(bookservice) {
        this.bookservice = bookservice;
    }
    BookConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.create();
                    break;
                case 2:
                    this.delete();
                    break;
                case 3:
                    this.read();
                    break;
                case 4:
                    this.update();
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
    BookConsole.prototype.readBook = function () {
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
    BookConsole.prototype.create = function () {
        var student = this.readBook();
        var status = this.bookservice.create(student);
        if (status) {
            console.log("Libro registrado");
        }
        else {
            console.log("El libro ya existe.");
        }
    };
    BookConsole.prototype.delete = function () {
        var id = prompt("ID: ");
        var status = this.bookservice.delete(id);
        if (status) {
            console.log("Libro eliminado");
        }
        else {
            console.log("No existe un libro con este id.");
        }
    };
    BookConsole.prototype.update = function () {
        var student = this.readBook();
        var status = this.bookservice.update(student);
        if (status) {
            console.log("Libro actualizado");
        }
        else {
            console.log("No existe un libro con ese ID.");
        }
    };
    BookConsole.prototype.findbyid = function () {
        var id = prompt("ID: ");
        var students = this.bookservice.findbyid(id);
        if (students.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(students);
    };
    BookConsole.prototype.read = function () {
        console.table(this.bookservice.read());
    };
    return BookConsole;
}());
exports.BookConsole = BookConsole;
//----------------------
var LoanUseCase = /** @class */ (function () {
    function LoanUseCase(loanservice, bookservice, studentservice) {
        this.loanservice = loanservice;
        this.bookservice = bookservice;
        this.studentservice = studentservice;
    }
    LoanUseCase.prototype.create = function (Loan) {
        var existingLoan = this.loanservice.findbyid(Loan.id);
        if (existingLoan.length > 0) {
            return false;
        }
        this.loanservice.create(Loan);
        return true;
    };
    LoanUseCase.prototype.createbyid = function (idBook, idStudent) {
        var book = this.bookservice.findbyid(idBook)[0];
        if (!book) {
            return false;
        }
        if (!book.available) {
            return false;
        }
        var student = this.studentservice.findbyid(idStudent)[0];
        if (!student) {
            return false;
        }
        var loan = {
            id: Math.random().toString(),
            book: book,
            student: student,
            loanDate: new Date()
        };
        var status = this.create(loan);
        if (!status) {
            return false;
        }
        book.available = false;
        this.bookservice.update(book);
        return true;
    };
    LoanUseCase.prototype.update = function (loan) {
        var existingLoan = this.loanservice.findbyid(loan.id);
        if (existingLoan.length > 0) {
            this.loanservice.update(loan);
            return true;
        }
        else {
            return false;
        }
    };
    LoanUseCase.prototype.updatebyid = function (id, date) {
        var loan = this.loanservice.findbyid(id)[0];
        if (!loan) {
            return false;
        }
        loan.loanDate = date;
        return this.update(loan);
    };
    LoanUseCase.prototype.findbyid = function (idBook) {
        return this.loanservice.findbyid(idBook);
    };
    LoanUseCase.prototype.delete = function (idBook) {
        var loan = this.loanservice.read().find(function (loan) { return loan.book.id === idBook && !loan.returndate; });
        if (!loan) {
            return false;
        }
        loan.returndate = new Date();
        this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);
        return true;
    };
    LoanUseCase.prototype.read = function () {
        return this.loanservice.read();
    };
    return LoanUseCase;
}());
exports.LoanUseCase = LoanUseCase;
var LoanConsole = /** @class */ (function () {
    function LoanConsole(loanservice) {
        this.loanservice = loanservice;
    }
    LoanConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.create();
                    break;
                case 2:
                    this.delete();
                    break;
                case 3:
                    this.read();
                    break;
                case 4:
                    this.update();
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
    LoanConsole.prototype.create = function () {
        var idBook = prompt("ID Libro: ");
        var idStudent = prompt("ID Estudiante: ");
        var status = this.loanservice.createbyid(idBook, idStudent);
        if (status) {
            console.log("Libro prestado");
        }
        else {
            console.log("No fue posible realizar el préstamo");
        }
    };
    LoanConsole.prototype.delete = function () {
        var idBook = prompt("ID Libro: ");
        var status = this.loanservice.delete(idBook);
        console.log(status
            ? "Libro devuelto"
            : "No existe préstamo activo");
    };
    LoanConsole.prototype.read = function () {
        var Loans = this.loanservice.read();
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
    LoanConsole.prototype.update = function () {
        var id = prompt("ID préstamo: ");
        var date = new Date(prompt("Fecha (YYYY-MM-DD): "));
        var status = this.loanservice.updatebyid(id, date);
        console.log(status
            ? "Préstamo actualizado"
            : "No encontrado");
    };
    LoanConsole.prototype.findbyid = function () {
        var idBook = prompt("ID Libro: ");
        var loan = this.loanservice.findbyid(idBook);
        if (!loan) {
            console.log("Libro disponible");
            return;
        }
        console.table(loan);
    };
    return LoanConsole;
}());
exports.LoanConsole = LoanConsole;
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
var studentusecase = new StudentUseCase(MemoryStudent);
var bookusecase = new BookUseCase(MemoryBook);
var loanusecase = new LoanUseCase(MemoryLoan, MemoryBook, MemoryStudent);
var studentconsole = new StudentConsole(studentusecase);
var bookconsole = new BookConsole(bookusecase);
var loanconsole = new LoanConsole(loanusecase);
var menu = new MenuConsole(studentconsole, bookconsole, loanconsole);
var app = new App(menu);
app.run();
