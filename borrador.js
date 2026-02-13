"use strict";
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
var promptSync = require("prompt-sync");
var prompt = promptSync();
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.memoria = new Set();
    }
    Memoria.prototype.save = function (item) {
        if (this.memoria.has(item))
            return false;
        this.memoria.add(item);
        return true;
    };
    Memoria.prototype.delete = function (item) {
        return this.memoria.delete(item);
    };
    Memoria.prototype.update = function (oldItem, newItem) {
        if (!this.memoria.has(oldItem))
            return false;
        this.memoria.delete(oldItem);
        this.memoria.add(newItem);
        return true;
    };
    Memoria.prototype.show = function () {
        return Array.from(this.memoria.values());
    };
    return Memoria;
}());
var Servicio = /** @class */ (function () {
    function Servicio(memoria) {
        this.memoria = memoria;
    }
    Servicio.prototype.save = function (item) {
        return this.memoria.save(item);
    };
    Servicio.prototype.delete = function (id) {
        return this.memoria.delete(id);
    };
    Servicio.prototype.update = function (item, newitem) {
        return this.memoria.update(item, newitem);
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
        var idProducto = String(prompt("ID del producto: "));
        var producto = this.servicioproducto
            .show()
            .find(function (productop) { return productop.id === idProducto; });
        var productoeliminado = this.servicioproducto.delete(producto);
        if (productoeliminado) {
            console.log("Cliente registrado");
        }
        else {
            console.log("El Cliente ya existe con esta cedula");
        }
    };
    MenuAccion.prototype.ActualizarProducto = function () {
        var idProducto = String(prompt("ID: "));
        var productoviejo = this.servicioproducto
            .show()
            .find(function (productop) { return productop.id === idProducto; });
        var nombre = String(prompt("Nombre: "));
        var precio = Number(prompt("precio: "));
        var cantidad = Number(prompt("cantidad: "));
        var producto = {
            id: idProducto,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };
        var productoctualizado = this.servicioproducto.update(productoviejo, producto);
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
            this_1.servicioproducto.update(producto, producto);
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
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
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
