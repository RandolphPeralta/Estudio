"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsole = exports.Bookconsole = exports.Studentconsole = exports.MenuConsole = exports.Loanusecase = exports.BookUseCase = exports.StudentUseCase = exports.MemoryRAM = void 0;
var promptSync = require("prompt-sync");
var prompt = promptSync();
//--------INFRAESTRUCTURE---------
//----------Persistence--------------
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
//--------APPLICATION-----
//-------------Usescases-------
var StudentUseCase = /** @class */ (function () {
    function StudentUseCase(studentRepository, loanRepository) {
        this.studentRepository = studentRepository;
        this.loanRepository = loanRepository;
    }
    StudentUseCase.prototype.register = function (student) {
        if (!student.id || !student.identification || !student.name) {
            return false;
        }
        return this.studentRepository.create(student);
    };
    StudentUseCase.prototype.erase = function (id) {
        var activeLoans = this.loanRepository.read().filter(function (loanstudent) { return loanstudent.student.id === id && !loanstudent.returndate; });
        if (activeLoans.length > 0) {
            return false;
        }
        return this.studentRepository.delete(id);
    };
    StudentUseCase.prototype.actualize = function (student) {
        return this.studentRepository.update(student);
    };
    StudentUseCase.prototype.show = function () {
        return this.studentRepository.read();
    };
    StudentUseCase.prototype.getById = function (id) {
        var result = this.studentRepository.findbyid(id);
        return result.length > 0 ? result[0] : null;
    };
    return StudentUseCase;
}());
exports.StudentUseCase = StudentUseCase;
var BookUseCase = /** @class */ (function () {
    function BookUseCase(bookRepository) {
        this.bookRepository = bookRepository;
    }
    BookUseCase.prototype.register = function (book) {
        if (!book.id || !book.title || !book.author) {
            return false;
        }
        book.available = true;
        return this.bookRepository.create(book);
    };
    BookUseCase.prototype.erase = function (id) {
        var book = this.getById(id);
        if (!book) {
            return false;
        }
        if (!book.available) {
            return false;
        }
        return this.bookRepository.delete(id);
    };
    BookUseCase.prototype.actualize = function (book) {
        var newbook = this.getById(book.id);
        if (!newbook.available) {
            return false;
        }
        return this.bookRepository.update(book);
    };
    BookUseCase.prototype.show = function () {
        return this.bookRepository.read();
    };
    BookUseCase.prototype.getById = function (id) {
        return this.bookRepository.findbyid(id)[0];
    };
    return BookUseCase;
}());
exports.BookUseCase = BookUseCase;
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
var Studentconsole = /** @class */ (function () {
    function Studentconsole(studentusecase) {
        this.studentusecase = studentusecase;
    }
    Studentconsole.prototype.execute = function () {
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
    Studentconsole.prototype.showMenu = function () {
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
    Studentconsole.prototype.inputstudent = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        var name = prompt("Nombre: ");
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
        }
        var identification = prompt("Identificación: ");
        if (!/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
        }
        var schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade || schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
        }
        return { id: id, name: name, identification: identification, schoolgrade: schoolgrade };
    };
    Studentconsole.prototype.registerStudent = function () {
        var student = this.inputstudent();
        var result = this.studentusecase.register(student);
        if (!result) {
            console.log("El estudiante no se puede registrar");
        }
        else {
            console.log("Estudiante registrado");
        }
    };
    Studentconsole.prototype.erasestudent = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var status = this.studentusecase.erase(id);
        if (!status) {
            console.log("El estudiante no se encuentra con este id");
        }
        else {
            console.log("Estudiante Eliminado");
        }
    };
    Studentconsole.prototype.actualizestudent = function () {
        var student = this.inputstudent();
        var existing = this.studentusecase.actualize(student);
        if (!existing) {
            console.log("El estudiante no fue actualizado");
        }
        else {
            console.log("Estudiante actualizado");
        }
    };
    Studentconsole.prototype.showstudent = function () {
        var students = this.studentusecase.show();
        var studentsview = students.map(function (student) { return ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }); });
        console.table(studentsview);
    };
    Studentconsole.prototype.searchstudent = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var students = this.studentusecase.show();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    return Studentconsole;
}());
exports.Studentconsole = Studentconsole;
var Bookconsole = /** @class */ (function () {
    function Bookconsole(bookusecase) {
        this.bookusecase = bookusecase;
    }
    Bookconsole.prototype.execute = function () {
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
    Bookconsole.prototype.showMenu = function () {
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
    Bookconsole.prototype.inputbook = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            throw new Error("El titulo no puede estar vacío");
        }
        var author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            throw new Error("El autor no puede estar vacío");
        }
        var available = true;
        return {
            id: id,
            title: title,
            author: author,
            available: available
        };
    };
    Bookconsole.prototype.registerbook = function () {
        var student = this.inputbook();
        var result = this.bookusecase.register(student);
        if (!result) {
            console.log("El libro ya existe con este id");
        }
        else {
            console.log("Libro registrado");
        }
    };
    Bookconsole.prototype.erasebook = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var status = this.bookusecase.erase(id);
        if (!status) {
            console.log("El libro no se encuentra con este id");
        }
        else {
            console.log("Libro eliminado");
        }
    };
    Bookconsole.prototype.actualizebook = function () {
        var student = this.inputbook();
        var existing = this.bookusecase.actualize(student);
        if (!existing) {
            console.log("El Libro no fue encontrado y no fue actualizado");
        }
        else {
            console.log("Libro actualizado");
        }
    };
    Bookconsole.prototype.showbook = function () {
        var books = this.bookusecase.show();
        var booksview = books.map(function (book) { return ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }); });
        console.table(booksview);
    };
    Bookconsole.prototype.searchbook = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var students = this.bookusecase.show();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    return Bookconsole;
}());
exports.Bookconsole = Bookconsole;
var LoanConsole = /** @class */ (function () {
    function LoanConsole(usecaseloan) {
        this.usecaseloan = usecaseloan;
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
            "0. Salir"
        ];
        for (var _i = 0, opciones_4 = opciones; _i < opciones_4.length; _i++) {
            var opcion = opciones_4[_i];
            console.log(opcion);
        }
    };
    LoanConsole.prototype.lendbook = function () {
        var idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        var status = this.usecaseloan.lendBook(idbook, idstudent);
        if (!status) {
            console.log("No se puede hacer el prestamo");
        }
        else {
            console.log("Prestamo exitoso");
        }
    };
    LoanConsole.prototype.returnbook = function () {
        var idBook = prompt("ID Libro: ");
        var status = this.usecaseloan.returnBook(idBook);
        if (!status) {
            console.log("No se pudo devoler");
        }
        else {
            console.log("Libro devuelto");
        }
    };
    LoanConsole.prototype.readloan = function () {
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
var repositorybook = new MemoryRAM();
var repositorystudent = new MemoryRAM();
var repositoryloan = new MemoryRAM();
var loanusecase = new Loanusecase(repositoryloan, repositorybook, repositorystudent);
var studentusecase = new StudentUseCase(repositorystudent, repositoryloan);
var bookusecase = new BookUseCase(repositorybook);
var studentconsoletest = new Studentconsole(studentusecase);
var bookconsoletest = new Bookconsole(bookusecase);
var loanconsole = new LoanConsole(loanusecase);
var menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);
var app = new App(menu);
app.run();
