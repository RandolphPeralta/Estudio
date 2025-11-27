// Sistema de gestion de empleados
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
    function Empleado(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Empleado.prototype.getNombre = function () {
        return this.nombre;
    };
    Empleado.prototype.getEdad = function () {
        return this.edad;
    };
    Empleado.prototype.mostrarDetalles = function () {
        console.log("Empleado: ".concat(this.nombre, " - Edad: ").concat(this.edad));
    };
    return Empleado;
}());
var EmpleadoFijo = /** @class */ (function (_super) {
    __extends(EmpleadoFijo, _super);
    function EmpleadoFijo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.salario = 0;
        _this.salarioHora = 0;
        return _this;
    }
    EmpleadoFijo.prototype.setSalario = function (salario) {
        this.salario = salario;
    };
    EmpleadoFijo.prototype.getSalario = function () {
        return this.salario;
    };
    return EmpleadoFijo;
}(Empleado));
var EmpleadoTemporal = /** @class */ (function (_super) {
    __extends(EmpleadoTemporal, _super);
    function EmpleadoTemporal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duracionContrato = 0; // meses → también SIN constructor
        _this.salariohora = 0;
        _this.horasTrabajdas = 0;
        return _this;
    }
    EmpleadoTemporal.prototype.setSalarioHora = function (salariohora) {
        this.salariohora = salariohora;
    };
    EmpleadoTemporal.prototype.setHorasTrabajadas = function (horasTrabajdas) {
        this.horasTrabajdas = horasTrabajdas;
    };
    EmpleadoTemporal.prototype.getSalario = function () {
        return this.salariohora * this.horasTrabajdas;
    };
    EmpleadoTemporal.prototype.mostrarDetalles = function () {
        console.log("Trabajador Temporal: ".concat(this.getNombre(), " | Edad: ").concat(this.getEdad(), " | Contrato: ").concat(this.duracionContrato, " meses"));
    };
    return EmpleadoTemporal;
}(Empleado));
var Departamento = /** @class */ (function () {
    function Departamento() {
        this.empleados = [];
    }
    Departamento.prototype.agregarEmpleado = function (empleado) {
        if (!this.empleados) {
            this.empleados = [];
        }
        this.empleados.push(empleado);
    };
    Departamento.prototype.mostrarDepartamento = function () {
        this.empleados.forEach(function (emp) { return emp.mostrarDetalles(); });
    };
    return Departamento;
}());
var empleadofijo1 = new EmpleadoFijo("Randolph", 30);
var empleadofijo2 = new EmpleadoFijo("Sara", 24);
empleadofijo1.setSalario(1000);
//empleadofijo1.mostrarDetalles()
var departamento1 = new Departamento();
departamento1.agregarEmpleado(empleadofijo1);
departamento1.agregarEmpleado(empleadofijo2);
departamento1.mostrarDepartamento();
