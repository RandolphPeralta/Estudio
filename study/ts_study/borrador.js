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
// =============================================================
// Clase abstracta base
// =============================================================
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    return Usuario;
}());
// =============================================================
// Hablador
// =============================================================
var Hablador = /** @class */ (function (_super) {
    __extends(Hablador, _super);
    function Hablador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hablador.prototype.hablar = function (palabra) {
        var mensaje = "".concat(this.getNombre(), " dice: ").concat(palabra);
        console.log(mensaje);
        return mensaje; // Esto permite que otros objetos "reciban" lo que se dijo
    };
    return Hablador;
}(Usuario));
// =============================================================
// Escuchador
// =============================================================
var Escuchador = /** @class */ (function (_super) {
    __extends(Escuchador, _super);
    function Escuchador() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.historial = [];
        return _this;
    }
    Escuchador.prototype.escuchar = function (palabra) {
        var registro = "".concat(this.getNombre(), " escuch\u00F3: ").concat(palabra);
        this.historial.push(registro);
        console.log(registro);
    };
    Escuchador.prototype.getHistorial = function () {
        return this.historial;
    };
    return Escuchador;
}(Usuario));
// =============================================================
// Ejemplo de uso (composición)
// =============================================================
var hablador = new Hablador("Sara");
var escuchador = new Escuchador("Valentina");
// El hablador dice algo
var mensaje = hablador.hablar("Hola, ¿cómo estás?");
// El escuchador escucha lo que el hablador dijo
escuchador.escuchar(mensaje);
// Mostrar historial
console.log("Historial de lo escuchado:", escuchador.getHistorial());
