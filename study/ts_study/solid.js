// Encapsulamiento
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
var Abanico = /** @class */ (function () {
    function Abanico() {
    }
    Abanico.prototype.cantidadDeAspas = function () {
        return 3;
    };
    return Abanico;
}());
var Samurai = /** @class */ (function (_super) {
    __extends(Samurai, _super);
    function Samurai() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Samurai.prototype.encender = function () {
        return true;
    };
    Samurai.prototype.apagar = function () {
        return true;
    };
    Samurai.prototype.velocidades = function (velocidad) {
        var speed = velocidad;
    };
    Samurai.prototype.girar = function () {
        return true;
    };
    Samurai.prototype.cantidadDeAspas = function () {
        return 5;
    };
    return Samurai;
}(Abanico));
// encenderConctrolRemoto(): boolean{
//        return true;
//    }
var Sanyo = /** @class */ (function (_super) {
    __extends(Sanyo, _super);
    function Sanyo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sanyo.prototype.encender = function () {
        return true;
    };
    Sanyo.prototype.apagar = function () {
        return true;
    };
    Sanyo.prototype.velocidades = function (velocidad) {
        var speed = velocidad;
    };
    Sanyo.prototype.girar = function () {
        return true;
    };
    Sanyo.prototype.cantidadDeAspas = function () {
        return 3;
    };
    return Sanyo;
}(Abanico));
var KDK = /** @class */ (function (_super) {
    __extends(KDK, _super);
    function KDK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KDK.prototype.encender = function () {
        return true;
    };
    KDK.prototype.apagar = function () {
        return true;
    };
    KDK.prototype.velocidades = function (velocidad) {
        var speed = velocidad;
    };
    KDK.prototype.girar = function () {
        return true;
    };
    KDK.prototype.cantidadDeAspas = function () {
        return 3;
    };
    return KDK;
}(Abanico));
var Olimpo = /** @class */ (function () {
    function Olimpo() {
    }
    Olimpo.prototype.encender = function () {
        return true;
    };
    Olimpo.prototype.apagar = function () {
        return true;
    };
    Olimpo.prototype.velocidades = function (velocidad) {
        var speed = velocidad;
    };
    Olimpo.prototype.girar = function () {
        return true;
    };
    Olimpo.prototype.cantidadDeAspas = function () {
        return 4;
    };
    Olimpo.prototype.controlRemoto = function () {
        this.encender;
        return true;
    };
    return Olimpo;
}());
var Program = /** @class */ (function () {
    function Program() {
    }
    Program.main = function (args) {
        // correr programa
        var samurai = new Samurai;
        samurai.velocidades(5);
        var sanyo = new Sanyo();
        sanyo.encender();
        var olimpo = new Olimpo();
        console.log(olimpo.cantidadDeAspas());
        console.log(samurai.cantidadDeAspas);
    };
    return Program;
}());
Program.main([""]);
