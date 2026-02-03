// ------------------------------------------------------
// EN MEMORIA RAM
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.memoria = [];
    }
    Memoria.prototype.guardar = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index !== -1) {
            return false;
        }
        this.memoria.push(some);
        return true;
    };
    Memoria.prototype.eliminar = function (id) {
        var index = this.memoria.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return false;
        }
        this.memoria.splice(index, 1);
        return true;
    };
    Memoria.prototype.actualizar = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index === -1) {
            return false;
        }
        this.memoria[index] = some;
        return true;
    };
    Memoria.prototype.mostrar = function () {
        return this.memoria;
    };
    return Memoria;
}());
var ServicioLibro = /** @class */ (function () {
    function ServicioLibro(memoria) {
        this.memoria = memoria;
    }
    ServicioLibro.prototype.register = function (libro) {
        return this.memoria.guardar(libro);
    };
    ServicioLibro.prototype.delete = function (id) {
        return this.memoria.eliminar(id);
    };
    ServicioLibro.prototype.update = function (libro) {
        return this.memoria.actualizar(libro);
    };
    ServicioLibro.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioLibro;
}());
var ServicioEstudiante = /** @class */ (function () {
    function ServicioEstudiante(memoria) {
        this.memoria = memoria;
    }
    ServicioEstudiante.prototype.register = function (estudiante) {
        return this.memoria.guardar(estudiante);
    };
    ServicioEstudiante.prototype.delete = function (id) {
        return this.memoria.eliminar(id);
    };
    ServicioEstudiante.prototype.update = function (estudiante) {
        return this.memoria.actualizar(estudiante);
    };
    ServicioEstudiante.prototype.getAll = function () {
        return this.memoria.mostrar();
    };
    return ServicioEstudiante;
}());
var ServicioPrestamo = /** @class */ (function () {
    function ServicioPrestamo(repositorio) {
        this.repositorio = repositorio;
    }
    ServicioPrestamo.prototype.lend = function (prestamo) {
        return this.repositorio.guardar(prestamo);
    };
    ServicioPrestamo.prototype.restore = function (prestamo) {
        return this.repositorio.eliminar(prestamo);
    };
    ServicioPrestamo.prototype.update = function (prestamo) {
        return this.repositorio.actualizar(prestamo);
    };
    ServicioPrestamo.prototype.list = function () {
        return this.repositorio.mostrar();
    };
    return ServicioPrestamo;
}());
var opcionesMenu = [
    { key: 1, label: "Registrar Estudiante" },
    { key: 2, label: "Eliminar Estudiante" },
    { key: 3, label: "Ver Estudiantes" },
    { key: 4, label: "Actualizar Estudiante" },
    { key: 5, label: "Registrar Libro" },
    { key: 6, label: "Eliminar Libro" },
    { key: 7, label: "Ver Libros" },
    { key: 8, label: "Actualizar Libros" },
    { key: 9, label: "Prestar Libro" },
    { key: 10, label: "Devolver Libro" },
    { key: 0, label: "Salir" }
];
var ConsoleView = /** @class */ (function () {
    function ConsoleView(opciones) {
        this.opciones = opciones;
    }
    ConsoleView.prototype.mostrar = function () {
        console.log("Bienvenido...");
        this.opciones.forEach(function (o) {
            return console.log("".concat(o.key, ". ").concat(o.label));
        });
        return this.opciones; // Devuelve las opciones para posible uso posterior
    };
    return ConsoleView;
}());
var consoleview = new ConsoleView(opcionesMenu);
consoleview.mostrar();
