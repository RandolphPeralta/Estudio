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
exports.PostgreSQLPersistence = void 0;
var pg_1 = require("pg");
var promises_1 = require("node:fs/promises");
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
                        return [4 /*yield*/, this.pool.query("INSERT INTO ".concat(this.tableName, " (id, data)\n                 VALUES ($1, $2)"), [item.id, JSON.stringify(item)])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        if (typeof error_1 === "object" &&
                            error_1 !== null &&
                            "code" in error_1 &&
                            error_1.code === "23505") {
                            return [2 /*return*/, false];
                        }
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
                    case 0: return [4 /*yield*/, this.pool.query("UPDATE ".concat(this.tableName, "\n             SET data = $2\n             WHERE id = $1"), [item.id, JSON.stringify(item)])];
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
var config = {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "1234"
};
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPool, result, pool, sql, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adminPool = new pg_1.Pool(__assign(__assign({}, config), { database: "postgres" }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 6, 8]);
                    return [4 /*yield*/, adminPool.query("SELECT 1 FROM pg_database WHERE datname = $1", ["library"])];
                case 2:
                    result = _a.sent();
                    if (!(result.rowCount === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, adminPool.query("CREATE DATABASE library")];
                case 3:
                    _a.sent();
                    console.log("Base de datos library creada.");
                    return [3 /*break*/, 5];
                case 4:
                    console.log("La base de datos library ya existe.");
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, adminPool.end()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8:
                    pool = new pg_1.Pool(__assign(__assign({}, config), { database: "library" }));
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 12, , 14]);
                    return [4 /*yield*/, (0, promises_1.readFile)("./data.sql", "utf8")];
                case 10:
                    sql = _a.sent();
                    return [4 /*yield*/, pool.query(sql)];
                case 11:
                    _a.sent();
                    console.log("Tablas creadas o verificadas correctamente.");
                    return [2 /*return*/, pool];
                case 12:
                    error_2 = _a.sent();
                    return [4 /*yield*/, pool.end()];
                case 13:
                    _a.sent();
                    throw error_2;
                case 14: return [2 /*return*/];
            }
        });
    });
}
var student1 = {
    id: "0112",
    name: "Alis",
    identification: "23765432",
    schoolgrade: "11"
};
// async function main(): Promise<void> {
//     const pool = await initializeDatabase();
//     try {
//         const repositoryStudent = new PostgreSQLPersistence<Student>(pool, "students");
//         const created = await repositoryStudent.create(student1);
//         console.log("Estudiante creado:", created);
//         const students = await repositoryStudent.read();
//         console.log("Estudiantes:", students);
//     } finally {
//         await pool.end();
//     }
// }
// main().catch(error => {
//     console.error("Error:", error);
// });
var pool = initializeDatabase();
var repositoryStudent = new PostgreSQLPersistence(pool, "students");
var created = repositoryStudent.create(student1);
console.log("Estudiante creado:", created);
var students = repositoryStudent.read();
console.log("Estudiantes:", students);
// const repositoryloan    = new PostgreSQLPersistence<Loan>(pool, "loans");
// const repositorybook    = new PostgreSQLPersistence<Book>(pool, "books");
// repositorystudent.create(student1)
// console.log(repositorystudent.read())
// const student1: Book = {
//     id: "01",
//     title: "",
//     author: "",
//     available: false
// } 
// repositorystudent.create(student1)
// console.log(repositorystudent.read())
// async function main(): Promise<void> {
//     try {
//         const created = await repositorystudent.create(student1);
//         console.log("¿Estudiante creado?", created);
//         const students = await repositorystudent.read();
//         console.log("Estudiantes registrados:", students);
//     } catch (error) {
//         console.error("Error al trabajar con PostgreSQL:", error);
//     } finally {
//         await pool.end();
//     }
// }
// main();
