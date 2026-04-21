var LocalStorage = require('node-localstorage').LocalStorage;
var Memoria = /** @class */ (function () {
    function Memoria() {
    }
    Memoria.prototype.guardar = function (key) {
        var clave = String(key);
        return localStorage.setItem(clave, JSON.stringify(key));
    };
    Memoria.prototype.eliminar = function (key) {
        return localStorage.removeItem(key);
    };
    Memoria.prototype.actualizar = function (key, nuevoValor) {
        if (localStorage.getItem(key)) {
            return localStorage.setItem(key, JSON.stringify(nuevoValor));
        }
    };
    Memoria.prototype.findbyid = function (id) {
        var data = localStorage.getItem(id);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    };
    Memoria.prototype.read = function () {
        var datos = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key) {
                var value = localStorage.getItem(key);
                if (value) {
                    datos.push(JSON.parse(value));
                }
            }
        }
        return datos;
    };
    return Memoria;
}());
var memoria = new Memoria();
memoria.guardar("Randolph");
memoria.guardar("Sara");
console.log(memoria.read());
