// CRUD
// Detalle de implementacion
var TaskService = /** @class */ (function () {
    function TaskService() {
        this.tasks = [];
    }
    TaskService.prototype.create = function (data) {
        return this.tasks.push(data) > 0;
    };
    TaskService.prototype.read = function () {
        return this.tasks;
    };
    TaskService.prototype.update = function (id, data) {
        var located = this.tasks.indexOf(id, 0);
        return true;
    };
    TaskService.prototype.delete = function (id) {
        this.tasks.splice(id);
        return true;
    };
    return TaskService;
}());
// Clase consumo
var Aplication = /** @class */ (function () {
    function Aplication(_tasks) {
        this._tasksService = _tasks;
    }
    Aplication.prototype.start = function () {
        console.log("1. Ingresar Tarea");
        var inputTarea = {
            name: "Hacer Mercado",
            fecha: "Hoy",
            estado: false
        };
        if (this._tasksService.create(inputTarea)) {
            console.log("tarea creada exitosamente");
        }
        console.table(this._tasksService.read());
    };
    return Aplication;
}());
var app = new Aplication(new TaskService);
app.start();
