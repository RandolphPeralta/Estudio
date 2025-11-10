// Clase base
var Persona = /** @class */ (function () {
    function Persona() {
        this.nombre = "";
    }
    Persona.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Persona.prototype.getNombre = function () {
        return this.nombre;
    };
    return Persona;
}());
var persona = new Persona;
persona.setNombre("Randolph");
console.log(persona.getNombre());
