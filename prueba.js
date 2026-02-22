// Una empresa desea desarrollar un sistema para gestionar su personal. 
// El sistema debe permitir registrar empleados, calcular salarios y generar reportes. 
// Existen diferentes tipos de empleados:
// Empleados de tiempo completo
// Empleados por horas
// Contratistas
// Cada tipo de empleado tiene una forma diferente de calcular su salario
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
var Empleado = /** @class */ (function () {
    function Empleado() {
    }
    return Empleado;
}());
var Memoria = /** @class */ (function () {
    function Memoria() {
        this.memoria = new Set();
    }
    Memoria.prototype.guardar = function (item) {
        if (this.memoria.has(item))
            return false;
        else
            (this.memoria.add(item));
        return true;
    };
    Memoria.prototype.eliminar = function (item) {
        if (!this.memoria.delete(item))
            return false;
        else
            (this.memoria.delete(item));
        return true;
    };
    Memoria.prototype.mostrar = function () {
        return Array.from(this.memoria.values());
    };
    return Memoria;
}());
//----------------------------
var ReporteSalarios = /** @class */ (function () {
    function ReporteSalarios(empleados) {
        this.empleados = empleados;
    }
    ReporteSalarios.prototype.generar = function () {
        var trabajadores = this.empleados.mostrar();
        var salarios = trabajadores.map(function (empleado) { return ({
            tipo: empleado.constructor.name,
            salario: empleado.CalcularSalario()
        }); });
        console.table(salarios);
    };
    return ReporteSalarios;
}());
var EmpleadoTiempoCompleto = /** @class */ (function (_super) {
    __extends(EmpleadoTiempoCompleto, _super);
    function EmpleadoTiempoCompleto(persona) {
        var _this = _super.call(this) || this;
        _this.persona = persona;
        return _this;
    }
    EmpleadoTiempoCompleto.prototype.CalcularSalario = function () {
        return this.persona.salario;
    };
    return EmpleadoTiempoCompleto;
}(Empleado));
var EmpleadoPorHoras = /** @class */ (function (_super) {
    __extends(EmpleadoPorHoras, _super);
    function EmpleadoPorHoras(persona) {
        var _this = _super.call(this) || this;
        _this.persona = persona;
        return _this;
    }
    EmpleadoPorHoras.prototype.CalcularSalario = function () {
        return this.persona.horas * this.persona.valor;
    };
    return EmpleadoPorHoras;
}(Empleado));
var Contratista = /** @class */ (function (_super) {
    __extends(Contratista, _super);
    function Contratista(persona) {
        var _this = _super.call(this) || this;
        _this.persona = persona;
        return _this;
    }
    Contratista.prototype.CalcularSalario = function () {
        return this.persona.valorproyecto;
    };
    return Contratista;
}(Empleado));
var persona1 = {
    cedula: "123456",
    nombre: "Carlos",
    salario: 30000
};
var persona2 = {
    cedula: "987654",
    nombre: "Sara",
    horas: 20,
    valor: 5000
};
var persona3 = {
    cedula: "2001744",
    nombre: "Ana",
    valorproyecto: 70000
};
var memoria = new Memoria();
var empleado1 = new EmpleadoTiempoCompleto(persona1);
var empleado2 = new EmpleadoPorHoras(persona2);
var empleado3 = new Contratista(persona3);
memoria.guardar(empleado1);
memoria.guardar(empleado2);
memoria.guardar(empleado3);
var reporte = new ReporteSalarios(memoria);
reporte.generar();
