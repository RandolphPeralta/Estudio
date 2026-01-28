// S - SINGLE RESPONSABILITY
// Una clase debe tener una unica responsabilidad 
// Es decir una unica funcion 
// y por ende una razon para cambiar
// Mal ejemplo:
// class Usuario {
//     guardarEnBD() {}
//     enviarEmail() {}
// }
//Buen ejemplo:
var Usuario = /** @class */ (function () {
    function Usuario(nombre) {
        this.nombre = nombre;
    }
    return Usuario;
}());
var UsuarioRepository = /** @class */ (function () {
    function UsuarioRepository() {
    }
    UsuarioRepository.prototype.guardar = function (usuario) { };
    return UsuarioRepository;
}());
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.enviar = function (usuario) { };
    return EmailService;
}());
// 0 - OPEN/CLOSED 
// Una clase debe ser cerrada para su modificacion 
// y abierta para su extension
// Es decir si quiero agregar funcionalidades 
// a la clase no deberia cambiar cosas (codigo)
// sino extender las funcionalidades desde afuera
// Mal ejemplo
var Calculadora = /** @class */ (function () {
    function Calculadora() {
    }
    Calculadora.prototype.calcular = function (tipo) {
        if (tipo === "suma")
            return 1 + 1;
        if (tipo === "resta")
            return 2 - 1;
    };
    return Calculadora;
}());
var Suma = /** @class */ (function () {
    function Suma() {
    }
    Suma.prototype.ejecutar = function () {
        return 1 + 1;
    };
    return Suma;
}());
var Resta = /** @class */ (function () {
    function Resta() {
    }
    Resta.prototype.ejecutar = function () {
        return 2 - 1;
    };
    return Resta;
}());
var Aguila = /** @class */ (function () {
    function Aguila() {
    }
    Aguila.prototype.volar = function () { };
    return Aguila;
}());
var Pinguino = /** @class */ (function () {
    function Pinguino() {
    }
    return Pinguino;
}());
var Pez = /** @class */ (function () {
    function Pez() {
    }
    Pez.prototype.nadar = function () { };
    return Pez;
}());
var MySQL = /** @class */ (function () {
    function MySQL() {
    }
    MySQL.prototype.conectar = function () { };
    return MySQL;
}());
var App = /** @class */ (function () {
    function App(db) {
        this.db = db;
    }
    return App;
}());
var VolarConAlas = /** @class */ (function () {
    function VolarConAlas() {
    }
    VolarConAlas.prototype.usar = function () {
        return "Volar con alas";
    };
    return VolarConAlas;
}());
var Heroe = /** @class */ (function () {
    function Heroe(poder) {
        this.poder = poder;
    }
    Heroe.prototype.activarPoder = function () {
        return this.poder.usar();
    };
    return Heroe;
}());
var volarconalas = new VolarConAlas;
var heroe = new Heroe(volarconalas);
console.log(heroe.activarPoder());
