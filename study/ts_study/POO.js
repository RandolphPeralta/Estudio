var Pelicula = /** @class */ (function () {
    function Pelicula() {
    }
    Pelicula.prototype.proyectarEnCine = function () {
        console.log(" La pelicula ".concat(this.nombre, " esta siendo "));
    };
    return Pelicula;
}());
var pelicula = new Pelicula();
