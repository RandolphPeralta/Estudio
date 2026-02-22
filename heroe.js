// Se quiere crear un software donde se crean
// sus propios Characteres y Villanos
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
//-----------------------
var Character = /** @class */ (function () {
    function Character(poder) {
        this.poder = poder;
    }
    Character.prototype.Salvar = function () {
        return this.poder.use();
    };
    Character.prototype.Destruir = function () {
        return this.poder.use();
    };
    return Character;
}());
var Blowup = /** @class */ (function () {
    function Blowup() {
    }
    Blowup.prototype.use = function () {
        return "Blowup por los cielos";
    };
    return Blowup;
}());
var Blowupwithsomething = /** @class */ (function (_super) {
    __extends(Blowupwithsomething, _super);
    function Blowupwithsomething() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Blowupwithsomething.prototype.use = function () {
        return "Blowup por los cielos con algo";
    };
    return Blowupwithsomething;
}(Blowup));
var Speed = /** @class */ (function () {
    function Speed() {
    }
    Speed.prototype.use = function () {
        return "Supervelocidad";
    };
    return Speed;
}());
var Supertelaraña = /** @class */ (function () {
    function Supertelaraña() {
    }
    Supertelaraña.prototype.use = function () {
        return "Trepa muros con telaraña";
    };
    return Supertelaraña;
}());
var Intelligence = /** @class */ (function () {
    function Intelligence() {
    }
    Intelligence.prototype.use = function () {
        return "Muy Inteligente";
    };
    return Intelligence;
}());
var blowup = new Blowup();
var volarcontraje = new Blowup();
var trepamuros = new Supertelaraña();
var Superman = new Character(blowup);
var Ironman = new Character(volarcontraje);
var Spiderman = new Character(trepamuros);
var DuendeVerde = new Character(volarcontraje);
console.log(Superman.Salvar());
