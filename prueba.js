// Bobby tiene una tienda de barrio y está cansado de llevar todo en un cuaderno. 
// A veces se le olvida cuánto stock le queda, confunde precios y 
// no sabe quiénes son sus clientes frecuentes. 
// Un día decide crear un software sencillo para organizar su negocio.
//----------------------------------------
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.memoria = [];
    }
    Memoria.prototype.save = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index !== -1) {
            return false;
        }
        this.memoria.push(some);
        return true;
    };
    Memoria.prototype.delete = function (id) {
        var index = this.memoria.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return false;
        }
        this.memoria.splice(index, 1);
        return true;
    };
    Memoria.prototype.update = function (some) {
        var index = this.memoria.findIndex(function (item) { return item.id === some.id; });
        if (index === -1) {
            return false;
        }
        this.memoria[index] = some;
        return true;
    };
    Memoria.prototype.show = function () {
        return this.memoria;
    };
    return Memoria;
}());
var Servicio = /** @class */ (function () {
    function Servicio(memoria) {
        this.memoria = memoria;
    }
    Servicio.prototype.save = function (algo) {
        return this.memoria.save(algo);
    };
    Servicio.prototype.delete = function (id) {
        return this.memoria.delete(id);
    };
    Servicio.prototype.update = function (algo) {
        return this.memoria.update(algo);
    };
    Servicio.prototype.show = function () {
        return this.memoria.show();
    };
    return Servicio;
}());
var Tienda = /** @class */ (function () {
    function Tienda(servicioproducto, serviciocliente) {
        this.servicioproducto = servicioproducto;
        this.serviciocliente = serviciocliente;
    }
    Tienda.prototype.vender = function (cliente, productos) {
        this.serviciocliente.save(cliente);
        this.servicioproducto.delete(productos);
        var total = 0;
        for (var _i = 0, productos_1 = productos; _i < productos_1.length; _i++) {
            var producto = productos_1[_i];
            total += producto.precio * producto.cantidad;
        }
        return total;
    };
    Tienda.prototype.registroproducto = function (producto) {
        this.servicioproducto.save(producto);
    };
    Tienda.prototype.verproductos = function () {
        return this.servicioproducto.show();
    };
    return Tienda;
}());
var memoriacliente = new Memoria();
var memoriaproducto = new Memoria();
var serviciocliente = new Servicio(memoriacliente);
var servicioproducto = new Servicio(memoriaproducto);
var tienda = new Tienda(servicioproducto, serviciocliente);
tienda.registroproducto([{ id: 1,
        nombre: "Arroz",
        precio: 3000,
        cantidad: 10 }, { id: 2,
        nombre: "Azucar",
        precio: 2000,
        cantidad: 10
    }]);
var total = tienda.vender({ nombre: "Juan", cedula: "123" }, [{ id: 1, nombre: "Arroz",
        precio: 3000, cantidad: 2 }, { id: 2,
        nombre: "Azucar",
        precio: 2000,
        cantidad: 1
    }]);
var inventario = tienda.verproductos();
console.log("Total a pagar:", total);
console.log("Invenario: ", inventario); // TOCA MIRAR LA CANTIDAD QUE NO ESTA RESTANDO EN LA VENTA
