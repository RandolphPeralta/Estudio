var Disenio = /** @class */ (function () {
    function Disenio() {
        this.nombre = "";
    }
    Disenio.prototype.mensaje = function () {
        return "Hola ".concat(this.nombre);
    };
    Disenio.prototype.setnombre = function (nombre) {
        this.nombre = nombre;
    };
    return Disenio;
}());
var palabra = new Disenio();
palabra.setnombre("Randolph");
console.log(palabra.mensaje());
