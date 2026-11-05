"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.LoanConsole = exports.Bookconsole = exports.Studentconsole = exports.MenuConsole = exports.config = exports.Validation = exports.Service = exports.PostgreSQLPersistence = void 0;
var pg_1 = require("pg");
var promptSync = require("prompt-sync");
var prompt = promptSync();
var PostgreSQLPersistence = /** @class */ (function () {
    function PostgreSQLPersistence(pool, tableName) {
        this.pool = pool;
        this.tableName = tableName;
    }
    PostgreSQLPersistence.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO ".concat(this.tableName, " (id, data) VALUES ($1, $2)"), [item.id, JSON.stringify(item)])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) === "23505")
                            return [2 /*return*/, false];
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostgreSQLPersistence.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pool.query("DELETE FROM ".concat(this.tableName, " WHERE id = $1"), [id])];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0];
                }
            });
        });
    };
    PostgreSQLPersistence.prototype.update = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pool.query("UPDATE ".concat(this.tableName, " SET data = $2 WHERE id = $1"), [item.id, JSON.stringify(item)])];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0];
                }
            });
        });
    };
    PostgreSQLPersistence.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query("SELECT data FROM ".concat(this.tableName))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows.map(function (row) { return row.data; })];
                }
            });
        });
    };
    return PostgreSQLPersistence;
}());
exports.PostgreSQLPersistence = PostgreSQLPersistence;
var Service = /** @class */ (function () {
    function Service(repository) {
        this.repository = repository;
    }
    Service.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.create(item)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.delete(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.prototype.update = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.update(item)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.read()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Service;
}());
exports.Service = Service;
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.prototype.validate = function (item) {
        for (var _i = 0, _a = Object.values(item); _i < _a.length; _i++) {
            var value = _a[_i];
            if (value === "" || value === null || value === undefined) {
                return false;
            }
        }
        return true;
    };
    return Validation;
}());
exports.Validation = Validation;
exports.config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library"
};
var MenuConsole = /** @class */ (function () {
    function MenuConsole(studentMenu, bookMenu, loanMenu) {
        this.studentMenu = studentMenu;
        this.bookMenu = bookMenu;
        this.loanMenu = loanMenu;
    }
    MenuConsole.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var run, option, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        run = true;
                        _b.label = 1;
                    case 1:
                        if (!run) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.readMenu()];
                    case 2:
                        _b.sent();
                        option = Number(prompt("Seleccione: "));
                        _a = option;
                        switch (_a) {
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 0: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, this.studentMenu.execute()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, this.bookMenu.execute()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.loanMenu.execute()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        run = false;
                        _b.label = 10;
                    case 10: return [3 /*break*/, 1];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MenuConsole.prototype.readMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opciones, _i, opciones_1, opcion;
            return __generator(this, function (_a) {
                console.log("\n=============================================");
                console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
                console.log("=============================================");
                opciones = [
                    "1. Registrar, Eliminar, Ver, Actualizar estudiante",
                    "2. Registrar, Eliminar, Ver, Actualizar libro",
                    "3. Prestar libro, Devolver libro,  Mostrar prestamos",
                    "0. Salir"
                ];
                for (_i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
                    opcion = opciones_1[_i];
                    console.log(opcion);
                }
                return [2 /*return*/];
            });
        });
    };
    return MenuConsole;
}());
exports.MenuConsole = MenuConsole;
var Studentconsole = /** @class */ (function () {
    function Studentconsole(studentservice, loanservice, studentvalidation) {
        this.studentservice = studentservice;
        this.loanservice = loanservice;
        this.studentvalidation = studentvalidation;
    }
    Studentconsole.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var run, option, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        run = true;
                        _b.label = 1;
                    case 1:
                        if (!run) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.readMenu()];
                    case 2:
                        _b.sent();
                        option = Number(prompt("Seleccione: "));
                        _a = option;
                        switch (_a) {
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 4: return [3 /*break*/, 9];
                            case 0: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.createStudent()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.deletestudent()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.updatestudent()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.readstudent()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        run = false;
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 1];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Studentconsole.prototype.readMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opciones, _i, opciones_2, opcion;
            return __generator(this, function (_a) {
                opciones = [
                    "1. Registrar estudiante",
                    "2. Borrar estudiante",
                    "3. Actualizar estudiante",
                    "4. Mostrar estudiantes",
                    "0. Salir"
                ];
                for (_i = 0, opciones_2 = opciones; _i < opciones_2.length; _i++) {
                    opcion = opciones_2[_i];
                    console.log(opcion);
                }
                return [2 /*return*/];
            });
        });
    };
    Studentconsole.prototype.createStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var student, students, indexstudent, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        student = this.inputstudent();
                        if (!this.studentvalidation.validate(student)) {
                            console.log("El estudiante tiene algun campo vacio");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.studentservice.read()];
                    case 1:
                        students = _a.sent();
                        indexstudent = students.findIndex(function (item) { return item.id === student.id; });
                        if (indexstudent !== -1) {
                            console.log("Este estudiante ya fue registrado con este id");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.studentservice.create(student)];
                    case 2:
                        result = _a.sent();
                        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Studentconsole.prototype.deletestudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, activeLoans, studentactiveloan, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.readstudent();
                        id = this.inputid();
                        return [4 /*yield*/, this.loanservice.read()];
                    case 1:
                        activeLoans = _a.sent();
                        studentactiveloan = activeLoans.filter(function (loanstudent) { return loanstudent.student.id === id && !loanstudent.returndate; });
                        if (studentactiveloan.length > 0) {
                            console.log("El estudiante no puede ser eliminado, ya que tiene prestamos");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.studentservice.delete(id)];
                    case 2:
                        status = _a.sent();
                        console.log(status ? "Estudiante eliminado" : "No se pudo eliminar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Studentconsole.prototype.updatestudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, students, findstudent, student, newstudent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.readstudent();
                        id = this.inputid();
                        return [4 /*yield*/, this.studentservice.read()];
                    case 1:
                        students = _a.sent();
                        findstudent = students.filter(function (item) { return item.id === id; })[0];
                        if (!findstudent) {
                            console.log("Estudiante no encontrado");
                            return [2 /*return*/];
                        }
                        student = this.inputstudent();
                        student.id = findstudent.id;
                        return [4 /*yield*/, this.studentservice.update(student)];
                    case 2:
                        newstudent = _a.sent();
                        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Studentconsole.prototype.readstudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var students, studentsview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.studentservice.read()];
                    case 1:
                        students = _a.sent();
                        studentsview = students.map(function (student) { return ({
                            id: student.id,
                            nombre: student.name,
                            identificacion: student.identification,
                            grado: student.schoolgrade
                        }); });
                        console.table(studentsview);
                        return [2 /*return*/];
                }
            });
        });
    };
    Studentconsole.prototype.inputid = function () {
        var id = String(prompt("ID: "));
        if (!id) {
            console.log("El ID no puede estar vacío");
        }
        return id;
    };
    Studentconsole.prototype.inputstudent = function () {
        var name = String(prompt("Nombre: "));
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre no puede estar vacio y solo puede contener letras");
        }
        var identification = String(prompt("Identificación: "));
        if (!identification || !/^\d+$/.test(identification)) {
            console.log("La identificación no puede estar vacio y debe ser numérica");
        }
        var schoolgrade = String(prompt("Grado Escolar: "));
        if (!schoolgrade) {
            console.log("El grado escolar no puede estar vacío");
        }
        var id = Math.random().toString();
        var student = { id: id, name: name, identification: identification, schoolgrade: schoolgrade };
        return student;
    };
    return Studentconsole;
}());
exports.Studentconsole = Studentconsole;
var Bookconsole = /** @class */ (function () {
    function Bookconsole(bookservice, bookvalidation) {
        this.bookservice = bookservice;
        this.bookvalidation = bookvalidation;
    }
    Bookconsole.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var run, option, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        run = true;
                        _b.label = 1;
                    case 1:
                        if (!run) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.readMenu()];
                    case 2:
                        _b.sent();
                        option = Number(prompt("Seleccione: "));
                        _a = option;
                        switch (_a) {
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 4: return [3 /*break*/, 9];
                            case 0: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.createbook()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.deletebook()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.updatebook()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.readbook()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        run = false;
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 1];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Bookconsole.prototype.readMenu = function () {
        var opciones = [
            "1. Registrar libro",
            "2. Borrar libro",
            "3. Actualizar libro",
            "4. Mostrar libros",
            "0. Salir"
        ];
        for (var _i = 0, opciones_3 = opciones; _i < opciones_3.length; _i++) {
            var opcion = opciones_3[_i];
            console.log(opcion);
        }
    };
    Bookconsole.prototype.createbook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var book, books, indexbook, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        book = this.inputbook();
                        return [4 /*yield*/, this.bookservice.read()];
                    case 1:
                        books = _a.sent();
                        indexbook = books.findIndex(function (item) { return item.id === book.id; });
                        if (!this.bookvalidation.validate(book)) {
                            console.log("El estudiante tiene algun campo vacio");
                            return [2 /*return*/];
                        }
                        if (indexbook !== -1) {
                            console.log("Este libro ya fue registrado con este id");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookservice.create(book)];
                    case 2:
                        result = _a.sent();
                        console.log(result ? "Libro registrado" : "No se pudo registrar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Bookconsole.prototype.deletebook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, books, book, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.readbook();
                        id = this.inputid();
                        return [4 /*yield*/, this.bookservice.read()];
                    case 1:
                        books = _a.sent();
                        book = books.filter(function (findbook) { return findbook.id = id; })[0];
                        if (!book.available) {
                            console.log("El libro esta prestado y no posible eliminar");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookservice.delete(id)];
                    case 2:
                        status = _a.sent();
                        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Bookconsole.prototype.updatebook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, books, findbook, book, newbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.readbook();
                        id = this.inputid();
                        return [4 /*yield*/, this.bookservice.read()];
                    case 1:
                        books = _a.sent();
                        findbook = books.filter(function (item) { return item.id === id; })[0];
                        if (!findbook) {
                            console.log("El libro no fue encontrado");
                            return [2 /*return*/];
                        }
                        book = this.inputbook();
                        book.id = findbook.id;
                        return [4 /*yield*/, this.bookservice.update(book)];
                    case 2:
                        newbook = _a.sent();
                        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
                        return [2 /*return*/];
                }
            });
        });
    };
    Bookconsole.prototype.readbook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var books, booksview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookservice.read()];
                    case 1:
                        books = _a.sent();
                        booksview = books.map(function (book) { return ({
                            id: book.id,
                            titulo: book.title,
                            autor: book.author,
                            disponible: book.available ? "Sí" : "No"
                        }); });
                        console.table(booksview);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bookconsole.prototype.inputbook = function () {
        var title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            console.log("El titulo no puede estar vacio");
        }
        var author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            console.log("El autor no puede estar vacío");
        }
        var available = true;
        var id = Math.random().toString();
        var book = {
            id: id,
            title: title,
            author: author,
            available: available
        };
        return book;
    };
    Bookconsole.prototype.inputid = function () {
        var id = prompt("ID: ");
        if (!id || id.trim() === "") {
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
        return __awaiter(this, void 0, void 0, function () {
            var run, option, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        run = true;
                        _b.label = 1;
                    case 1:
                        if (!run) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.readMenu()];
                    case 2:
                        _b.sent();
                        option = Number(prompt("Seleccione: "));
                        _a = option;
                        switch (_a) {
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 0: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, this.lendbook()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, this.returnbook()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.readloan()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        run = false;
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 1];
                    case 11: return [2 /*return*/];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, idbook, idstudent, books, book, students, student, loan, status;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = console).table;
                        return [4 /*yield*/, this.studentservice.read()];
                    case 1:
                        _b.apply(_a, [_e.sent()]);
                        _d = (_c = console).table;
                        return [4 /*yield*/, this.bookservice.read()];
                    case 2:
                        _d.apply(_c, [_e.sent()]);
                        idbook = this.inputidbook();
                        idstudent = this.inputidstudent();
                        return [4 /*yield*/, this.bookservice.read()];
                    case 3:
                        books = _e.sent();
                        book = books.filter(function (book) { return book.id === idbook; })[0];
                        if (!book || !book.available) {
                            console.log("El libro no existe o no esta disponible");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.studentservice.read()];
                    case 4:
                        students = _e.sent();
                        student = students.filter(function (student) { return student.id === idstudent; })[0];
                        if (!student) {
                            console.log("El estudiante no existe");
                            return [2 /*return*/];
                        }
                        loan = {
                            id: Math.random().toString(),
                            book: book,
                            student: student,
                            loanDate: new Date()
                        };
                        return [4 /*yield*/, this.loanservice.create(loan)];
                    case 5:
                        status = _e.sent();
                        book.available = false;
                        this.bookservice.update(book);
                        console.log(status ? "Prestamo existoso" : "No se pudo realizar el prestamo");
                        return [2 /*return*/];
                }
            });
        });
    };
    LoanConsole.prototype.returnbook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idbook, loans, loan, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idbook = this.inputidbook();
                        return [4 /*yield*/, this.loanservice.read()];
                    case 1:
                        loans = _a.sent();
                        loan = loans.find(function (loan) { return loan.book.id === idbook; });
                        if (!loan) {
                            console.log("El libro no existe con este id");
                            return [2 /*return*/];
                        }
                        loan.returndate = new Date();
                        return [4 /*yield*/, this.loanservice.update(loan)];
                    case 2:
                        status = _a.sent();
                        loan.book.available = true;
                        this.bookservice.update(loan.book);
                        console.log(status ? "Libro devuelto" : "No se pudo devolver");
                        return [2 /*return*/];
                }
            });
        });
    };
    LoanConsole.prototype.readloan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loans;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loanservice.read()];
                    case 1:
                        loans = _a.sent();
                        console.log("\n===== PRÉSTAMOS =====");
                        if (loans.length === 0) {
                            console.log("No hay préstamos");
                            return [2 /*return*/];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    LoanConsole.prototype.inputidbook = function () {
        var idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return idbook;
    };
    LoanConsole.prototype.inputidstudent = function () {
        var idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return idstudent;
    };
    return LoanConsole;
}());
exports.LoanConsole = LoanConsole;
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
var pool = new pg_1.Pool(exports.config);
// const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
// const bookservice = new Service<Book>(bookRepository);
// const bookvalidator = new Validation<Book>()
// const book1: Book = {
//     id: "3",
//     title: "El Señor de los Anillos",
//     author: "J.R.R. Tolkien",
//     available: true
// };
// async function createbook() {
//     if (!bookvalidator.validate(book1)){
//         return
//     }
//     await bookservice.create(book1);
// }
// async function readbooks() {
//     console.log(await bookservice.read())
// }
// createbook();
// readbooks();
var loanRepository = new PostgreSQLPersistence(pool, "loans");
var loanservice = new Service(loanRepository);
var studentRepository = new PostgreSQLPersistence(pool, "students");
var studentservice = new Service(studentRepository);
var studentValidator = new Validation();
var studentconsole = new Studentconsole(studentservice, loanRepository, studentValidator);
var bookRepository = new PostgreSQLPersistence(pool, "books");
var bookservice = new Service(bookRepository);
var bookvalidator = new Validation();
var bookconsole = new Bookconsole(bookservice, bookvalidator);
var loanconsole = new LoanConsole(studentservice, bookservice, loanservice);
var menuconsole = new MenuConsole(studentconsole, bookconsole, loanconsole);
var app = new App(menuconsole);
app.run();
