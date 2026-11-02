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
exports.LibraryService = exports.Service = exports.PostgreSQLPersistence = void 0;
var pg_1 = require("pg");
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
var LibraryService = /** @class */ (function () {
    function LibraryService(studentRepo, bookRepo) {
        this.studentRepo = studentRepo;
        this.bookRepo = bookRepo;
    }
    LibraryService.prototype.registerNewStudent = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.studentRepo.create(student)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LibraryService.prototype.getAllStudents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.studentRepo.read()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LibraryService;
}());
exports.LibraryService = LibraryService;
var config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234",
    database: "library"
};
// async function main() {
//     const pool = new Pool(config);
//     try {
//         const studentRepository: IRepository<Student> = new PostgreSQLPersistence<Student>(pool, "students");
//         const bookRepository: IRepository<Book> = new PostgreSQLPersistence<Book>(pool, "books");
//         const libraryService = new Service(studentRepository);
//         const student1: Student = {
//             id: "15432",
//             name: "Sara",
//             identification: "123765432",
//             schoolgrade: "11"
//         };
//         const created = await libraryService.create(student1);
//         console.log("¿Estudiante creado con éxito?:", created);
//         const students = await libraryService.read();
//         console.log("Lista de estudiantes:", students);
//     } finally {
//         await pool.end();
//     }
// }
// main().catch(error => {
//     console.error("Error en la aplicación:", error);
// });
var pool = new pg_1.Pool(config);
var bookRepository = new PostgreSQLPersistence(pool, "books");
var book1 = {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    available: true
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, bookRepository.create(book1)];
                case 1:
                    _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, bookRepository.read()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
main();
