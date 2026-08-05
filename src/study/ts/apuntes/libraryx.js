"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsole = exports.Bookconsole = exports.Studentconsole = exports.MenuConsole = exports.Service = exports.Validation = exports.MemoryRAM = void 0;
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
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.prototype.valide = function (item) {
        return item !== null && item !== undefined && Object.keys(item).length > 0;
    };
    return Validation;
}());
exports.Validation = Validation;
//-------------Services---------
var Service = /** @class */ (function () {
    function Service(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }
    Service.prototype.create = function (item) {
        if (!this.validator.valide(item))
            return false;
        return this.repository.create(item);
    };
    Service.prototype.read = function () {
        return this.repository.read();
    };
    Service.prototype.update = function (item) {
        if (!this.validator.valide(item))
            return false;
        return this.repository.update(item);
    };
    Service.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return Service;
}());
exports.Service = Service;
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
            this.readMenu();
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
    MenuConsole.prototype.readMenu = function () {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        var opciones = [
            "1. Registrar, Eliminar, Ver, Actualizar,  Buscar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar,  Buscar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos",
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
    function Studentconsole(studentservice, loanservice) {
        this.studentservice = studentservice;
        this.loanservice = loanservice;
    }
    Studentconsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.readMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.createStudent();
                    break;
                case 2:
                    this.deletestudent();
                    break;
                case 3:
                    this.updatestudent();
                    break;
                case 4:
                    this.readstudent();
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
    Studentconsole.prototype.readMenu = function () {
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
    Studentconsole.prototype.createStudent = function () {
        var student = this.inputstudent();
        var result = this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    };
    Studentconsole.prototype.deletestudent = function () {
        var id = this.inputid();
        var activeLoans = this.loanservice.read();
        var studentactiveloan = activeLoans.filter(function (loanstudent) { return loanstudent.student.id === id && !loanstudent.returndate; });
        if (studentactiveloan.length > 0) {
            return;
        }
        var status = this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo registrar");
    };
    Studentconsole.prototype.updatestudent = function () {
        var student = this.inputstudent();
        var newstudent = this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
    };
    Studentconsole.prototype.readstudent = function () {
        var students = this.studentservice.read();
        var studentsview = students.map(function (student) { return ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }); });
        console.table(studentsview);
    };
    Studentconsole.prototype.searchstudent = function () {
        var id = this.inputid();
        var students = this.studentservice.read();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    Studentconsole.prototype.inputstudent = function () {
        var id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }
        var name = prompt("Nombre: ");
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
            return name;
        }
        var identification = prompt("Identificación: ");
        if (!/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
            return identification;
        }
        var schoolgrade = prompt("Grado Escolar: ");
        if (schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
            return schoolgrade;
        }
        return { id: id, name: name, identification: identification, schoolgrade: schoolgrade };
    };
    Studentconsole.prototype.inputid = function () {
        var id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id;
    };
    return Studentconsole;
}());
exports.Studentconsole = Studentconsole;
var Bookconsole = /** @class */ (function () {
    function Bookconsole(bookservice) {
        this.bookservice = bookservice;
    }
    Bookconsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.readMenu();
            var option = Number(prompt("Seleccione: "));
            switch (option) {
                case 1:
                    this.createbook();
                    break;
                case 2:
                    this.deletebook();
                    break;
                case 3:
                    this.updatebook();
                    break;
                case 4:
                    this.readbook();
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
    Bookconsole.prototype.readMenu = function () {
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
    Bookconsole.prototype.createbook = function () {
        var book = this.inputbook();
        var result = this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    };
    Bookconsole.prototype.deletebook = function () {
        var id = this.inputid();
        var books = this.bookservice.read();
        var book = books.filter(function (findbook) { return findbook.id = id; })[0];
        if (!book.available) {
            return;
        }
        var status = this.bookservice.delete(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    };
    Bookconsole.prototype.updatebook = function () {
        var student = this.inputbook();
        var newbook = this.bookservice.update(student);
        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
    };
    Bookconsole.prototype.readbook = function () {
        var books = this.bookservice.read();
        var booksview = books.map(function (book) { return ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }); });
        console.table(booksview);
    };
    Bookconsole.prototype.searchbook = function () {
        var id = this.inputid();
        var students = this.bookservice.read();
        var student = students.filter(function (item) { return item.id === id; });
        if (student.length === 0) {
            console.log("No es posible encontrarlo");
        }
        else {
            console.table(student);
        }
    };
    Bookconsole.prototype.inputbook = function () {
        var id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return id;
        }
        var title = prompt("Titulo: ");
        if (title.trim() === "") {
            console.log("El titulo no puede estar vacío");
            return title;
        }
        var author = prompt("Autor: ");
        if (author.trim() === "") {
            console.log("El autor no puede estar vacío");
            return author;
        }
        var available = true;
        return {
            id: id,
            title: title,
            author: author,
            available: available
        };
    };
    Bookconsole.prototype.inputid = function () {
        var id = prompt("ID: ");
        if (id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id;
    };
    return Bookconsole;
}());
exports.Bookconsole = Bookconsole;
var LoanConsole = /** @class */ (function () {
    function LoanConsole(studentservice, bookservice, loanservice) {
        this.studentservice = studentservice;
        this.bookservice = bookservice;
        this.loanservice = loanservice;
    }
    LoanConsole.prototype.execute = function () {
        var run = true;
        while (run) {
            this.readMenu();
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
    LoanConsole.prototype.readMenu = function () {
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
            console.log("El ID no puede estar vacío");
            return idbook;
        }
        var idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idstudent;
        }
        var books = this.bookservice.read();
        var book = books.filter(function (book) { return book.id === idbook; })[0];
        if (!book) {
            return false;
        }
        if (!book.available) {
            return false;
        }
        var students = this.studentservice.read();
        var student = students.filter(function (student) { return student.id === idstudent; })[0];
        if (!student) {
            return false;
        }
        var loan = {
            id: Math.random().toString(),
            book: book,
            student: student,
            loanDate: new Date()
        };
        var status = this.loanservice.create(loan);
        book.available = false;
        this.bookservice.update(book);
        console.log(status ? "Prestamo existoso" : "No se pudo realizar el prestamo");
    };
    LoanConsole.prototype.returnbook = function () {
        var idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idbook;
        }
        var loans = this.loanservice.read();
        var loan = loans.find(function (loan) { return loan.book.id === idbook; });
        if (!loan) {
            console.log("El libro no existe con este id");
            return;
        }
        loan.returndate = new Date();
        var status = this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);
        console.log(status ? "Libro devuelto" : "No se pudo devolver");
    };
    LoanConsole.prototype.readloan = function () {
        var loans = this.loanservice.read();
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
var studentvalidator = new Validation();
var bookvalidator = new Validation();
var loanvalidator = new Validation();
var loanservice = new Service(repositoryloan, loanvalidator);
var studentservice = new Service(repositorystudent, studentvalidator);
var bookservice = new Service(repositorybook, bookvalidator);
var studentconsoletest = new Studentconsole(studentservice, loanservice);
var bookconsoletest = new Bookconsole(bookservice);
var loanconsole = new LoanConsole(studentservice, bookservice, loanservice);
var menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);
var app = new App(menu);
app.run();
