var Persona = /** @class */ (function () {
    function Persona() {
        this.nombre = "";
        this.apellido = "";
    }
    Persona.prototype.getNombre = function (nombre) {
        return this.nombre;
    };
    return Persona;
}());
var persona = new Persona;
persona.getNombre("Randolph");
console.log(persona.getNombre);
