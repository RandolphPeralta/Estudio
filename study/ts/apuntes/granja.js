// En la finca, tenemos muchos animales de granja, 
// cerdos, patos, pollos, perros, gatos y peces, pero un enemigo 
// acecha la Finca un Gavilan !!! El Gavilan siempre esta atento 
// a los pollos y en ocasiones los peces de la represa, 
// representa cada uno de ellos usando POO
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
//-----------------------------
var Perro = /** @class */ (function (_super) {
    __extends(Perro, _super);
    function Perro() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.estomago = [];
        return _this;
    }
    Perro.prototype.hacerSonido = function () {
        return "Guau";
    };
    Perro.prototype.comer = function (algo) {
        this.estomago.push(algo);
    };
    return Perro;
}(Animal));
var Pollo = /** @class */ (function (_super) {
    __extends(Pollo, _super);
    function Pollo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.estomago = [];
        return _this;
    }
    Pollo.prototype.hacerSonido = function () {
        return "Pio";
    };
    Pollo.prototype.comer = function (algo) {
        this.estomago.push(algo);
    };
    return Pollo;
}(Animal));
var Pez = /** @class */ (function (_super) {
    __extends(Pez, _super);
    function Pez() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.estomago = [];
        return _this;
    }
    Pez.prototype.hacerSonido = function () {
        return "Glu";
    };
    Pez.prototype.comer = function (algo) {
        this.estomago.push(algo);
    };
    return Pez;
}(Animal));
//.....
var Gavilan = /** @class */ (function () {
    function Gavilan() {
        this.estomago = [];
    }
    Gavilan.prototype.hacerSonido = function () {
        return "Aaaa";
    };
    Gavilan.prototype.comer = function (animal) {
        this.estomago.push(animal);
    };
    Gavilan.prototype.atacar = function (animal) {
        this.comer(animal);
        return true;
    };
    return Gavilan;
}());
var Granja = /** @class */ (function () {
    function Granja() {
        this.animales = [];
    }
    Granja.prototype.agregarAnimal = function (animal) {
        this.animales.push(animal);
    };
    Granja.prototype.mostrarAnimales = function () {
        return this.animales.map(function (animalp) { return animalp.hacerSonido(); });
    };
    Granja.prototype.alerta = function (depredador, victima) {
        // "Nos atacan los animales peligrosos"
    };
    return Granja;
}());
var finca = new Granja();
var perro = new Perro();
var pollo = new Pollo();
var pez = new Pez();
var gavilan = new Gavilan();
finca.agregarAnimal(perro);
finca.agregarAnimal(pollo);
finca.agregarAnimal(pez);
console.log(finca.mostrarAnimales());
gavilan.comer(pollo);
gavilan.comer(pez);
// TOCA BUSCAR LA MANERA DE CREAR UNA ALERTA EN LA GRANJA
