// -----------------------------
// Interfaces
// -----------------------------
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
// -----------------------------
// Implementación por composición
// -----------------------------
var MotorElectrico = /** @class */ (function () {
    function MotorElectrico() {
    }
    MotorElectrico.prototype.encender = function () {
        console.log("⚡ Motor eléctrico encendido.");
    };
    MotorElectrico.prototype.apagar = function () {
        console.log("⚡ Motor eléctrico apagado.");
    };
    return MotorElectrico;
}());
var MotorHidraulico = /** @class */ (function () {
    function MotorHidraulico() {
    }
    MotorHidraulico.prototype.encender = function () {
        console.log("💧 Motor hidráulico encendido.");
    };
    MotorHidraulico.prototype.apagar = function () {
        console.log("💧 Motor hidráulico apagado.");
    };
    return MotorHidraulico;
}());
var Soldador = /** @class */ (function () {
    function Soldador() {
    }
    Soldador.prototype.usar = function () {
        console.log("🔧 Soldando componentes...");
    };
    return Soldador;
}());
var Pintor = /** @class */ (function () {
    function Pintor() {
    }
    Pintor.prototype.usar = function () {
        console.log("🎨 Pintando piezas...");
    };
    return Pintor;
}());
// -----------------------------
// Clase Abstracta (Herencia mínima)
// -----------------------------
var Robot = /** @class */ (function () {
    function Robot(id, motor, herramienta) {
        this._id = id;
        this.motor = motor;
        this.herramienta = herramienta;
    }
    Object.defineProperty(Robot.prototype, "id", {
        // Getter para ID (encapsulado)
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Robot.prototype.iniciarRobot = function () {
        console.log("\uD83E\uDD16 Robot ".concat(this.id, " iniciando..."));
        this.motor.encender();
    };
    Robot.prototype.detenerRobot = function () {
        this.herramienta.usar();
        this.motor.apagar();
        console.log("\uD83D\uDED1 Robot ".concat(this.id, " detenido."));
    };
    return Robot;
}());
// -----------------------------
// Clases hijas con polimorfismo
// -----------------------------
var RobotSoldador = /** @class */ (function (_super) {
    __extends(RobotSoldador, _super);
    function RobotSoldador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RobotSoldador.prototype.realizarTarea = function () {
        console.log("\uD83E\uDD16 Robot Soldador ".concat(this.id, " realizando soldadura."));
        this.herramienta.usar();
    };
    return RobotSoldador;
}(Robot));
var RobotPintor = /** @class */ (function (_super) {
    __extends(RobotPintor, _super);
    function RobotPintor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RobotPintor.prototype.realizarTarea = function () {
        console.log("\uD83E\uDD16 Robot Pintor ".concat(this.id, " aplicando pintura."));
        this.herramienta.usar();
    };
    return RobotPintor;
}(Robot));
// -----------------------------
// Uso del sistema
// -----------------------------
var robot1 = new RobotSoldador(101, new MotorElectrico(), new Soldador());
var robot2 = new RobotPintor(202, new MotorHidraulico(), new Pintor());
robot1.iniciarRobot();
robot1.realizarTarea();
robot1.detenerRobot();
console.log("------------------------------------------------");
robot2.iniciarRobot();
robot2.realizarTarea();
robot2.detenerRobot();
