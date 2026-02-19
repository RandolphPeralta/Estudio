"use strict";
// Bobby tiene una tienda de barrio y está cansado de llevar todo en un cuaderno. 
// A veces se le olvida cuánto stock le queda, confunde precios y 
// no sabe quiénes son sus clientes frecuentes. 
// Un día decide crear un software sencillo para organizar su negocio.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// El sistema que Bobby quiere debe permitirle registrar los productos que vende 
// (con su precio y cantidad disponible), registrar los clientes que le compran 
// (con sus datos básicos) y, cuando alguien haga una compra, 
// crear una venta donde se selecciona el cliente, 
// se agregan uno o varios productos con sus cantidades, 
// se calcula el total y se descuenta el stock.
// Con ese software, Bobby espera dejar de cometer errores, 
// saber exactamente qué vendió y a quién, 
// y tener su tienda más ordenada y controlada.
var promptSync = require("prompt-sync");
var prompt = promptSync();
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
var MenuOpcion = /** @class */ (function () {
    function MenuOpcion() {
    }
    MenuOpcion.REGISTRAR_PRODUCTOS = 1;
    MenuOpcion.ELIMINAR_PROUCTOS = 2;
    MenuOpcion.VER_PRODUCTOS = 3;
    MenuOpcion.ACTUALIZAR_PRODUCTOS = 4;
    MenuOpcion.REGISTRAR_CLIENTE = 5;
    MenuOpcion.VENDER = 6;
    MenuOpcion.VER_VENTAS = 7;
    MenuOpcion.SALIR = 0;
    return MenuOpcion;
}());
var MenuAccion = /** @class */ (function () {
    function MenuAccion(serviciocliente, servicioproducto, servicioventa) {
        this.serviciocliente = serviciocliente;
        this.servicioproducto = servicioproducto;
        this.servicioventa = servicioventa;
    }
    MenuAccion.prototype.ejecutar = function (opcion) {
        switch (opcion) {
            case MenuOpcion.REGISTRAR_PRODUCTOS:
                this.RegistrarProducto();
                this.pause();
                break;
            case MenuOpcion.ELIMINAR_PROUCTOS:
                this.EliminarProducto();
                this.pause();
                break;
            case MenuOpcion.VER_PRODUCTOS:
                console.table(this.servicioproducto.show());
                this.pause();
                break;
            case MenuOpcion.ACTUALIZAR_PRODUCTOS:
                this.ActualizarProducto();
                this.pause();
                break;
            case MenuOpcion.REGISTRAR_CLIENTE:
                this.RegistrarCliente();
                this.pause();
                break;
            case MenuOpcion.VENDER:
                this.VenderProductos();
                this.pause();
                break;
            case MenuOpcion.VER_VENTAS:
                this.VerVentas();
                this.pause();
                break;
            case MenuOpcion.SALIR:
                return false;
            default:
                console.log("Opción inválida");
        }
        return true;
    };
    MenuAccion.prototype.RegistrarProducto = function () {
        var id = String(prompt("ID: "));
        var nombre = String(prompt("Nombre: "));
        var precio = Number(prompt("Precio: "));
        var cantidad = Number(prompt("Cantidad: "));
        var producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };
        var productoregistrado = this.servicioproducto.save(producto);
        if (productoregistrado) {
            console.log("Producto registrado");
        }
        else {
            console.log("El producto ya existe con este ID");
        }
    };
    MenuAccion.prototype.RegistrarCliente = function () {
        var nombre = String(prompt("Nombre: "));
        var cedula = String(prompt("Cedula: "));
        var cliente = {
            id: cedula,
            nombre: nombre,
            cedula: cedula
        };
        var clienteregistrado = this.serviciocliente.save(cliente);
        if (clienteregistrado) {
            console.log("Cliente registrado");
        }
        else {
            console.log("El Cliente ya existe con esta cedula");
        }
    };
    MenuAccion.prototype.EliminarProducto = function () {
        var id = String(prompt("ID: "));
        this.servicioproducto.delete(id);
        console.log("Estudiante Eliminado");
    };
    MenuAccion.prototype.ActualizarProducto = function () {
        var id = String(prompt("ID: "));
        var nombre = String(prompt("Nombre: "));
        var precio = Number(prompt("precio: "));
        var cantidad = Number(prompt("cantidad: "));
        var producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };
        var productoctualizado = this.servicioproducto.update(producto);
        if (productoctualizado) {
            console.log("Producto actualizado");
        }
        else {
            console.log("No existe un producto con ese ID");
        }
    };
    MenuAccion.prototype.VenderProductos = function () {
        var cedula = String(prompt("Cedula del cliente: "));
        var clientes = this.serviciocliente.show();
        var cliente = clientes.find(function (clientep) { return clientep.cedula === cedula; });
        if (!cliente) {
            console.log("Cliente no encontrado");
            return;
        }
        console.log("Cliente encontrado:", cliente.nombre);
        var productosVenta = [];
        var total = 0;
        var continuar = true;
        var _loop_1 = function () {
            console.table(this_1.servicioproducto.show());
            var idProducto = String(prompt("ID del producto: "));
            var producto = this_1.servicioproducto
                .show()
                .find(function (productop) { return productop.id === idProducto; });
            if (!producto) {
                console.log("Producto no encontrado");
                return "continue";
            }
            var cantidad = Number(prompt("Cantidad: "));
            if (cantidad > producto.cantidad) {
                console.log("No hay suficiente stock");
                return "continue";
            }
            var subtotal = producto.precio * cantidad;
            total += subtotal;
            producto.cantidad -= cantidad;
            this_1.servicioproducto.update(producto);
            productosVenta.push(__assign(__assign({}, producto), { cantidad: cantidad }));
            var respuesta = String(prompt("¿Agregar otro producto? (s/n): "));
            if (respuesta.toLowerCase() !== "s") {
                continuar = false;
            }
        };
        var this_1 = this;
        while (continuar) {
            _loop_1();
        }
        console.log("\nResumen de venta:");
        console.table(productosVenta);
        console.log("TOTAL A PAGAR: $", total);
        var venta = {
            id: Date.now().toString(),
            cliente: cliente,
            productos: productosVenta,
            total: total,
            fecha: new Date()
        };
        this.servicioventa.save(venta);
        console.log("Venta registrada correctamente");
    };
    MenuAccion.prototype.VerVentas = function () {
        var ventas = this.servicioventa.show();
        if (ventas.length === 0) {
            console.log("No hay ventas registradas");
            return;
        }
        ventas.forEach(function (venta, index) {
            console.log("\n===============================");
            console.log("VENTA #".concat(index + 1));
            console.log("Cliente:", venta.cliente.nombre);
            console.log("Cédula:", venta.cliente.cedula);
            console.log("Productos:");
            console.table(venta.productos);
            console.log("TOTAL:", venta.total);
            console.log("FECHA:", venta.fecha.toLocaleString());
        });
    };
    MenuAccion.prototype.pause = function () {
        console.log("\nPresiona ENTER para continuar...");
        prompt("");
    };
    return MenuAccion;
}());
var ConsoleView = /** @class */ (function () {
    function ConsoleView() {
    }
    ConsoleView.prototype.mensaje = function () {
        var opciones = [
            "1. Registrar producto",
            "2. Eliminar producto",
            "3. Ver producto",
            "4. Actualizar producto",
            "5. Registrar cliente",
            "6. Vender",
            "7. Ver ventas",
            "0. Salir"
        ];
        console.log("Bienvenidos a la tienda ¿qué desea?");
        for (var _i = 0, opciones_1 = opciones; _i < opciones_1.length; _i++) {
            var opcion = opciones_1[_i];
            console.log(opcion);
        }
    };
    return ConsoleView;
}());
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.run = function () {
        var continuar = true;
        while (continuar) {
            view.mensaje();
            var opcion = Number(prompt("Seleccione opción: "));
            continuar = menu.ejecutar(opcion);
        }
    };
    return App;
}());
var serviciocliente = new Servicio(new Memoria());
var servicioproducto = new Servicio(new Memoria());
var servicioventa = new Servicio(new Memoria());
var menu = new MenuAccion(serviciocliente, servicioproducto, servicioventa);
var view = new ConsoleView();
var app = new App();
app.run();
