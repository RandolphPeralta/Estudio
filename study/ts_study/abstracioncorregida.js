// Necesito desarrollar una aplicacion para guardar tareas diarias
// Voy a necesitar un proceso de guardado
// Voy a necesitar un proceso de lectura
// Voy a necesitar un proceso de actualizacion
// Voy a necesitar un proceso de eliminacion
// ESTOS SON DETALLES DE IMPLEMENTACION
var TaskMemoryService = /** @class */ (function () {
    function TaskMemoryService() {
        this.tasks = [];
    }
    TaskMemoryService.prototype.create = function (data) {
        return this.tasks.push(data) > 0;
    };
    TaskMemoryService.prototype.read = function () {
        return this.tasks;
    };
    TaskMemoryService.prototype.update = function (id, data) {
        //const located = this.tasks.indexOf(id, 0):
        return true;
    };
    TaskMemoryService.prototype.delete = function (id) {
        this.tasks.splice(id);
        return true;
    };
    return TaskMemoryService;
}());
// Consumidora 
var Aplication = /** @class */ (function () {
    function Aplication(_task) {
        this._task = _task;
    }
    Aplication.prototype.start = function () {
        console.log("1. Ingresar Tarea");
        var inputTarea = {
            id: "1",
            name: "Hacer Mercado",
            fecha: "hoy",
            estado: false
        };
        if (this._task.create(inputTarea)) {
            console.log("Tarea creada exitosamente");
        }
        console.table(this._task.read());
        var readData = this._task.read();
        readData.forEach(function (data) { return console.log(data.id); }); // data.id) NO ES NECESARIO CREAR UN GET Y UN SET
    };
    return Aplication;
}());
var app = new Aplication(new TaskMemoryService);
app.start();
