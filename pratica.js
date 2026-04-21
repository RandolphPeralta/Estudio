var LocalStorage = require('node-localstorage').LocalStorage;
var storage = new LocalStorage('./scratch');
var Memoria = /** @class */ (function () {
    function Memoria(storage) {
        this.storage = storage;
    }
    Memoria.prototype.guardar = function (key) {
        var clave = String(key);
        return this.storage.setItem(clave, JSON.stringify(key));
    };
    Memoria.prototype.eliminar = function (key) {
        return this.storage.removeItem(key);
    };
    Memoria.prototype.actualizar = function (key, nuevoValor) {
        if (this.storage.getItem(key)) {
            return this.storage.setItem(key, JSON.stringify(nuevoValor));
        }
    };
    Memoria.prototype.findbyid = function (id) {
        var data = this.storage.getItem(id);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    };
    Memoria.prototype.read = function () {
        var datos = [];
        for (var i = 0; i < this.storage.length; i++) {
            var key = this.storage.key(i);
            if (key) {
                var value = this.storage.getItem(key);
                if (value) {
                    datos.push(JSON.parse(value));
                }
            }
        }
        return datos;
    };
    return Memoria;
}());
var memoria = new Memoria(storage);
memoria.guardar("Randolph");
memoria.guardar("Sara");
console.log(memoria.read());
