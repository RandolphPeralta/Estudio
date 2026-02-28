// Una empresa quiere: Crear solicitudes de acceso, Aprobar, Rechazar, y Mostrar resultados
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//-----------------------
var MemoriaRepositorio = /** @class */ (function () {
    function MemoriaRepositorio() {
        this.datos = [];
    }
    MemoriaRepositorio.prototype.guardar = function (item) {
        this.datos.push(item);
        return true;
    };
    MemoriaRepositorio.prototype.obtenerTodos = function () {
        return __spreadArray([], this.datos, true);
    };
    return MemoriaRepositorio;
}());
var Solicitude = /** @class */ (function () {
    function Solicitude(repositorio) {
        this.repositorio = repositorio;
    }
    Solicitude.prototype.Aprobada = function (item) {
        return this.repositorio.guardar(item);
    };
    Solicitude.prototype.Desaprobada = function (item) {
        return false;
    };
    Solicitude.prototype.MostrarInfo = function () {
        return this.repositorio.obtenerTodos();
    };
    return Solicitude;
}());
var repositorio = new MemoriaRepositorio();
var solicitudes = new Solicitude(repositorio);
var solicitud = {
    id: "1",
    solicitante: "Randolph",
};
console.log(solicitudes.Aprobada(solicitud));
