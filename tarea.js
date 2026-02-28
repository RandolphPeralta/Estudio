// Una empresa quiere crear solicitudes de acceso, para Aprobar, Rechazar, y Mostrar solicitudes
//-----------------------
var MemoriaRepositorio = /** @class */ (function () {
    function MemoriaRepositorio() {
        this.datos = new Set();
    }
    MemoriaRepositorio.prototype.guardar = function (item) {
        this.datos.add(item);
        return true;
    };
    MemoriaRepositorio.prototype.eliminar = function (item) {
        this.datos.delete(item);
        return false;
    };
    MemoriaRepositorio.prototype.obtenerTodos = function () {
        return Array.from(this.datos.values());
    };
    return MemoriaRepositorio;
}());
var Solicitudes = /** @class */ (function () {
    function Solicitudes(repositorio) {
        this.repositorio = repositorio;
    }
    Solicitudes.prototype.Aprobada = function (item) {
        return this.repositorio.guardar(item);
    };
    Solicitudes.prototype.Desaprobada = function (item) {
        return this.repositorio.eliminar(item);
    };
    Solicitudes.prototype.MostrarInfo = function () {
        return this.repositorio.obtenerTodos();
    };
    return Solicitudes;
}());
var repositorio = new MemoriaRepositorio();
var solicitudes = new Solicitudes(repositorio);
var solicitud1 = {
    id: "1",
    nombre: "Randolph"
};
var solicitud2 = {
    id: "2",
    nombre: "Sara"
};
repositorio.guardar(solicitud2);
console.log(solicitudes.Aprobada(solicitud1));
console.log(solicitudes.MostrarInfo());
//console.log(solicitudes.Desaprobada(solicitud2))   : SistemaSolicitud<Solicitud>
