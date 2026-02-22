// Se quiere crear un software donde se crean
// sus propios Heroes y Villanos
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
var PersonajeBase = /** @class */ (function () {
    function PersonajeBase() {
        this.poderes = [];
    }
    PersonajeBase.prototype.agregarPoder = function (poder) {
        this.poderes.push(poder);
    };
    PersonajeBase.prototype.activarPoder = function () {
        return this.poderes.map(function (poder) { return poder.usar(); });
    };
    return PersonajeBase;
}());
var Heroe = /** @class */ (function (_super) {
    __extends(Heroe, _super);
    function Heroe(identidad) {
        var _this = _super.call(this) || this;
        _this.identidad = identidad;
        return _this;
    }
    Heroe.prototype.salvarCiudad = function () {
        return "".concat(this.identidad.nombre, " salva la ciudad, con su poder donde ").concat(this.activarPoder());
    };
    return Heroe;
}(PersonajeBase));
var Villano = /** @class */ (function (_super) {
    __extends(Villano, _super);
    function Villano(identidad) {
        var _this = _super.call(this) || this;
        _this.identidad = identidad;
        return _this;
    }
    Villano.prototype.destruirCiudad = function () {
        return "".concat(this.identidad.nombre, " est\u00E1 destruyendo la ciudad, con su poder ").concat(this.activarPoder());
    };
    return Villano;
}(PersonajeBase));
var Invisibilidad = /** @class */ (function () {
    function Invisibilidad() {
    }
    Invisibilidad.prototype.usar = function () {
        return "Se vuelve invisible";
    };
    return Invisibilidad;
}());
var SuperFuerza = /** @class */ (function () {
    function SuperFuerza() {
    }
    SuperFuerza.prototype.usar = function () {
        return "Se vuelve muy fuerte";
    };
    return SuperFuerza;
}());
var persona = {
    nombre: "Randolph"
};
var poder1 = new SuperFuerza();
var heroe1 = new Heroe(persona);
heroe1.agregarPoder(poder1);
console.log(heroe1.salvarCiudad());
console.log(heroe1.activarPoder());
