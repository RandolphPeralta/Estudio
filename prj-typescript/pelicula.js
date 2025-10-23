var Pelicula = /** @class */ (function () {
    function Pelicula(nombre, protagonistas, actores) {
        this.nombre = nombre,
            this.protagonistas = protagonistas,
            this.actores = actores;
    }
    Pelicula.prototype.proyectarEnCine = function () {
        console.log(" La pelicula ".concat(this.nombre, " esta siendo proyectada"));
    };
    return Pelicula;
}());
var pelicula = new Pelicula('Barbie', ['Barbie', 'Ken'], ['Margot Robbie', 'Ruyan Gosling']);
console.log(pelicula);
