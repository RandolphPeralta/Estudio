"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsoletest = exports.Bookconsolestest = exports.Studentconsolestest = exports.Loanusecase = exports.Usecasetest = exports.MenuConsole = exports.LoanUseCases = exports.MemoryRAM = void 0;
var promptSync = require("prompt-sync");
var prompt = promptSync();
//----------INFRAESTRUCTURE/PERSISTENCIE--------------
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
//-------------Usescases-------
var LoanUseCases = /** @class */ (function () {
    function LoanUseCases(loanRepository, bookRepository, studentRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.studentRepository = studentRepository;
    }
    LoanUseCases.prototype.lendBook = function (bookId, studentId) {
        var book = this.bookRepository.findbyid(bookId)[0];
        if (!book) {
            return { success: false, message: "El libro no existe" };
        }
        if (!book.available) {
            return { success: false, message: "El libro no está disponible" };
        }
        var student = this.studentRepository.findbyid(studentId)[0];
        if (!student) {
            return { success: false, message: "El estudiante no existe" };
        }
        var activeLoans = this.loanRepository.read().filter(function (loan) { return loan.student.id === studentId && !loan.returndate; });
        if (activeLoans.length >= 3) {
            return { success: false, message: "El estudiante tiene demasiados préstamos activos" };
        }
        var loanDate = new Date();
        var returndate = new Date(loanDate);
        returndate.setDate(loanDate.getDate() + 3);
        var loan = {
            id: this.generateLoanId(),
            book: book,
            student: student,
            loanDate: loanDate,
            returndate: returndate
        };
        this.loanRepository.create(loan);
        book.available = false;
        this.bookRepository.update(book);
        return { success: true, message: "Libro prestado con devolución en 3 días", loan: loan };
    };
    LoanUseCases.prototype.returnBook = function (bookId) {
        var loan = this.loanRepository.read().find(function (loan) { return loan.book.id === bookId && !loan.returndate; });
        if (!loan) {
            return { success: false, message: "No existe préstamo activo para este libro" };
        }
        loan.returndate = new Date();
        this.loanRepository.update(loan);
        loan.book.available = true;
        this.bookRepository.update(loan.book);
        return { success: true, message: "Libro devuelto" };
    };
    LoanUseCases.prototype.generateLoanId = function () {
        return Math.random().toString(36).substring(2, 10);
    };
    return LoanUseCases;
}());
exports.LoanUseCases = LoanUseCases;
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
//--------------------
//prueba en console y usecase
var Usecasetest = /** @class */ (function () {
    function Usecasetest(repository) {
        this.repository = repository;
    }
    Usecasetest.prototype.register = function (item) {
        return this.repository.create(item);
    };
    Usecasetest.prototype.erase = function (id) {
        return this.repository.delete(id);
    };
    Usecasetest.prototype.actualize = function (item) {
        return this.repository.update(item);
    };
    Usecasetest.prototype.show = function () {
        return this.repository.read();
    };
    return Usecasetest;
}());
exports.Usecasetest = Usecasetest;
var Loanusecase = /** @class */ (function () {
    function Loanusecase(loanrepository, bookrepository, studentrepository) {
        this.loanrepository = loanrepository;
        this.bookrepository = bookrepository;
        this.studentrepository = studentrepository;
    }
    Loanusecase.prototype.lendBook = function (bookId, studentId) {
        var idbook = bookId;
        var book = this.bookrepository.findbyid(idbook)[0];
        if (!book) {
            return false;
        }
        if (!book.available) {
            return false;
        }
        var idstudent = studentId;
        var student = this.studentrepository.findbyid(idstudent)[0];
        if (!student) {
            return false;
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
            return false;
        }
        this.loanrepository.create(loan);
        book.available = false;
        this.bookrepository.update(book);
        return true;
    };
    Loanusecase.prototype.returnBook = function (bookId) {
        var loan = this.loanrepository.read().find(function (loan) { return loan.book.id === bookId; });
        if (!loan) {
            return false;
        }
        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);
        return true;
    };
    Loanusecase.prototype.show = function () {
        return this.loanrepository.read();
    };
    return Loanusecase;
}());
exports.Loanusecase = Loanusecase;
//----test-of-console------
var Studentconsolestest = /** @class */ (function () {
    function Studentconsolestest(studentusecase) {
        this.studentusecase = studentusecase;
    }
    Studentconsolestest.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.registerStudent();
                    break;
                case 2:
                    this.erasestudent();
                    break;
                case 3:
                    this.actualizestudent();
                    break;
                case 4:
                    this.showstudent();
                    break;
                case 5:
                    this.searchstudent();
                    break;
                case 0:
                    run = false;
                    break;
            }
        }
    };
    Studentconsolestest.prototype.showMenu = function () {
        var opciones = [
            "1. Registrar estudiante",
            "2. Borrar estudiante",
            "3. Actualizar estudiante",
            "4. Mostrar estudiantes",
            "5. Buscar estudiate",
            "0. Salir"
        ];
        for (var _i = 0, opciones_2 = opciones; _i < opciones_2.length; _i++) {
            var opcion = opciones_2[_i];
            console.log(opcion);
        }
    };
    Studentconsolestest.prototype.inputstudent = function () {
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
    Studentconsolestest.prototype.registerStudent = function () {
        var student = this.inputstudent();
        var result = this.studentusecase.register(student);
        if (!result) {
            console.log("El estudiante ya existe con este id");
        }
        else {
            console.log("Estudiante registrado");
        }
    };
    Studentconsolestest.prototype.erasestudent = function () {
        var id = prompt("ID: ");
        var status = this.studentusecase.erase(id);
        if (!status) {
            console.log("El estudiante no se encuentra con este id");
        }
        else {
            console.log("Estudiante Eliminado");
        }
    };
    Studentconsolestest.prototype.actualizestudent = function () {
        var student = this.inputstudent();
        var existing = this.studentusecase.actualize(student);
        if (!existing) {
            console.log("El estudiante no fue encontrado y no fue actualizado");
        }
        else {
            console.log("Estudiante actualizado");
        }
    };
    Studentconsolestest.prototype.showstudent = function () {
        var students = this.studentusecase.show();
        var studentsview = students.map(function (student) { return ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }); });
        console.table(studentsview);
    };
    Studentconsolestest.prototype.searchstudent = function () {
        var id = prompt("ID: ");
        var students = this.studentusecase.show();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    return Studentconsolestest;
}());
exports.Studentconsolestest = Studentconsolestest;
var Bookconsolestest = /** @class */ (function () {
    function Bookconsolestest(bookusecase) {
        this.bookusecase = bookusecase;
    }
    Bookconsolestest.prototype.execute = function () {
        var run = true;
        while (run) {
            this.showMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.registerbook();
                    break;
                case 2:
                    this.erasebook();
                    break;
                case 3:
                    this.actualizebook();
                    break;
                case 4:
                    this.showbook();
                    break;
                case 5:
                    this.searchbook();
                    break;
                case 0:
                    run = false;
                    break;
            }
        }
    };
    Bookconsolestest.prototype.showMenu = function () {
        var opciones = [
            "1. Registrar libro",
            "2. Borrar libro",
            "3. Actualizar libro",
            "4. Mostrar libros",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (var _i = 0, opciones_3 = opciones; _i < opciones_3.length; _i++) {
            var opcion = opciones_3[_i];
            console.log(opcion);
        }
    };
    Bookconsolestest.prototype.inputbook = function () {
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
    Bookconsolestest.prototype.registerbook = function () {
        var student = this.inputbook();
        var result = this.bookusecase.register(student);
        if (!result) {
            console.log("El libro ya existe con este id");
        }
        else {
            console.log("Libro registrado");
        }
    };
    Bookconsolestest.prototype.erasebook = function () {
        var id = prompt("ID: ");
        var status = this.bookusecase.erase(id);
        if (!status) {
            console.log("El libro no se encuentra con este id");
        }
        else {
            console.log("Libro eliminado");
        }
    };
    Bookconsolestest.prototype.actualizebook = function () {
        var student = this.inputbook();
        var existing = this.bookusecase.actualize(student);
        if (!existing) {
            console.log("El Libro no fue encontrado y no fue actualizado");
        }
        else {
            console.log("Libro actualizado");
        }
    };
    Bookconsolestest.prototype.showbook = function () {
        var books = this.bookusecase.show();
        var booksview = books.map(function (book) { return ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }); });
        console.table(booksview);
    };
    Bookconsolestest.prototype.searchbook = function () {
        var id = prompt("ID: ");
        var students = this.bookusecase.show();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    return Bookconsolestest;
}());
exports.Bookconsolestest = Bookconsolestest;
var LoanConsoletest = /** @class */ (function () {
    function LoanConsoletest(usecaseloan) {
        this.usecaseloan = usecaseloan;
    }
    LoanConsoletest.prototype.execute = function () {
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
                case 0:
                    run = false;
                    break;
            }
        }
    };
    LoanConsoletest.prototype.showMenu = function () {
        var opciones = [
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "0. Salir"
        ];
        for (var _i = 0, opciones_4 = opciones; _i < opciones_4.length; _i++) {
            var opcion = opciones_4[_i];
            console.log(opcion);
        }
    };
    LoanConsoletest.prototype.lendbook = function () {
        var idbook = prompt("ID Libro: ");
        var idstudent = prompt("ID Estudiante: ");
        var status = this.usecaseloan.lendBook(idbook, idstudent);
        if (!status) {
            console.log("No se puedo hacer el prestamo");
        }
        else {
            console.log("Prestamo exitoso");
        }
    };
    LoanConsoletest.prototype.returnbook = function () {
        var idBook = prompt("ID Libro: ");
        var status = this.usecaseloan.returnBook(idBook);
        if (!status) {
            console.log("No se pudo devoler");
        }
        else {
            console.log("Libro devuelto");
        }
    };
    LoanConsoletest.prototype.readloan = function () {
        var loans = this.usecaseloan.show();
        console.log("\n===== PRÉSTAMOS =====");
        if (loans.length === 0) {
            console.log("No hay préstamos");
            return;
        }
        loans.forEach(function (loan) {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaprestamo: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            });
        });
    };
    return LoanConsoletest;
}());
exports.LoanConsoletest = LoanConsoletest;
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
var repositorybook = new MemoryRAM();
var repositorystudent = new MemoryRAM();
var repositoryloan = new MemoryRAM();
var studentusecase = new Usecasetest(repositorystudent);
var bookusecase = new Usecasetest(repositorybook);
var loanusecase = new Loanusecase(repositoryloan, repositorybook, repositorystudent);
var studentconsoletest = new Studentconsolestest(studentusecase);
var bookconsoletest = new Bookconsolestest(bookusecase);
var loanconsoletest = new LoanConsoletest(loanusecase);
var menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsoletest);
var app = new App(menu);
app.run();
