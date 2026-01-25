// S - SINGLE RESPONSABILITY
// Una clase debe tener una unica responsabilidad 
// Es decir una unica funcion 
// y por ende una razon para cambiar
var Superheroe = /** @class */ (function () {
    function Superheroe() {
    }
    Superheroe.prototype.volar = function () { };
    Superheroe.prototype.treparparedes = function () { };
    return Superheroe;
}());
var HeroeVolador = /** @class */ (function () {
    function HeroeVolador() {
    }
    HeroeVolador.prototype.volarconalas = function () {
        return "Volar con alas";
    };
    HeroeVolador.prototype.superpoder = function () {
        return this.volarconalas();
    };
    return HeroeVolador;
}());
var alcon = new HeroeVolador;
console.log(alcon.superpoder());
