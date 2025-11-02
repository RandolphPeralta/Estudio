var Pelicula = /** @class */ (function () {
    function Pelicula(nombre, protagonistas, actores) {
        this.nombre = nombre,
            this.protagonistas = protagonistas;
        this.actores = actores;
    }
    Pelicula.prototype.proyectarEnCine = function () {
        console.log(" La pelicula ".concat(this.nombre, " esta siendo "));
    };
    return Pelicula;
}());
var persona = new Pelicula('Barbie', ['Barbie', 'Ken'], ['Margot Robbie', 'Bryan Gonsling']);
var persona2 = new Pelicula('Openheimer', ['Openheimer', 'Strauss'], ['Cillian Murphy', 'Robert downey jr']);
// const pelicula = new Pelicula()
console.log(persona2);
// console.log(pelicula)
