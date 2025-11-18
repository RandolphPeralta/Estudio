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
// CLASE ABSTRACTA
var Vehiculo = /** @class */ (function () {
    function Vehiculo(marca, modelo, año, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this._kilometraje = 0;
        this.precio = precio;
    }
    Object.defineProperty(Vehiculo.prototype, "getMarca", {
        // ENCAPSULAMIENTO - Getters y setters controlados
        get: function () {
            return this.marca;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "getModelo", {
        get: function () {
            return this.modelo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "getKilometraje", {
        get: function () {
            return this._kilometraje;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "kilometraje", {
        set: function (km) {
            if (km >= this._kilometraje) {
                this._kilometraje = km;
            }
        },
        enumerable: false,
        configurable: true
    });
    // Método concreto que pueden usar las subclases
    Vehiculo.prototype.calcularDepreciacion = function (añoActual) {
        var añosUso = añoActual - this.año;
        var depreciacion = añosUso * 0.1 * this.precio;
        return Math.max(this.precio - depreciacion, this.precio * 0.2);
    };
    return Vehiculo;
}());
// COMPOSICIÓN sobre HERENCIA - Usamos interfaces en lugar de herencia múltiple
var Camion = /** @class */ (function (_super) {
    __extends(Camion, _super);
    function Camion(marca, modelo, año, precio, capacidadCarga) {
        var _this = _super.call(this, marca, modelo, año, precio) || this;
        _this.motor = new Motor("Diésel", 8);
        _this.sistemaCarga = new SistemaCarga(capacidadCarga);
        _this.programaMantenimiento = new ProgramaMantenimiento();
        return _this;
    }
    // Implementación de interfaces
    Camion.prototype.encender = function () {
        this.motor.encender();
    };
    Camion.prototype.apagar = function () {
        this.motor.apagar();
    };
    Camion.prototype.getEstadoMotor = function () {
        return this.motor.getEstado();
    };
    Camion.prototype.cargar = function (peso) {
        return this.sistemaCarga.agregarCarga(peso);
    };
    Camion.prototype.descargar = function () {
        this.sistemaCarga.liberarCarga();
    };
    Camion.prototype.getCargaActual = function () {
        return this.sistemaCarga.getCargaActual();
    };
    Camion.prototype.realizarMantenimiento = function () {
        this.programaMantenimiento.registrarMantenimiento();
        this.kilometraje += 500; // Simulación de viaje de prueba
    };
    Camion.prototype.getProximoMantenimiento = function () {
        return this.programaMantenimiento.getProximaFecha();
    };
    // POLIMORFISMO - Implementación específica
    Camion.prototype.getInfo = function () {
        return "CAMION: ".concat(this.marca, " ").concat(this.modelo, " (").concat(this.año, ") - Carga: ").concat(this.getCargaActual(), "kg - Estado: ").concat(this.getEstadoMotor());
    };
    Camion.prototype.viajar = function (distancia) {
        if (this.motor.estaEncendido()) {
            this.kilometraje += distancia;
            console.log("Viajando ".concat(distancia, "km con el cami\u00F3n..."));
        }
        else {
            console.log("El motor debe estar encendido para viajar");
        }
    };
    return Camion;
}(Vehiculo));
var Automovil = /** @class */ (function (_super) {
    __extends(Automovil, _super);
    function Automovil(marca, modelo, año, precio, tipo, pasajeros) {
        var _this = _super.call(this, marca, modelo, año, precio) || this;
        _this.motor = new Motor("Gasolina", 4);
        _this.programaMantenimiento = new ProgramaMantenimiento();
        _this.tipo = tipo;
        _this.pasajeros = pasajeros;
        return _this;
    }
    // Implementación de interfaces
    Automovil.prototype.encender = function () {
        this.motor.encender();
    };
    Automovil.prototype.apagar = function () {
        this.motor.apagar();
    };
    Automovil.prototype.getEstadoMotor = function () {
        return this.motor.getEstado();
    };
    Automovil.prototype.realizarMantenimiento = function () {
        this.programaMantenimiento.registrarMantenimiento();
        this.kilometraje += 100; // Simulación de prueba después de mantenimiento
    };
    Automovil.prototype.getProximoMantenimiento = function () {
        return this.programaMantenimiento.getProximaFecha();
    };
    // POLIMORFISMO - Implementación específica
    Automovil.prototype.getInfo = function () {
        return "AUTOM\u00D3VIL: ".concat(this.marca, " ").concat(this.modelo, " (").concat(this.año, ") - ").concat(this.tipo, " - Pasajeros: ").concat(this.pasajeros, " - Estado: ").concat(this.getEstadoMotor());
    };
    Automovil.prototype.conducir = function (distancia) {
        if (this.motor.estaEncendido()) {
            this.kilometraje += distancia;
            console.log("Conduciendo ".concat(distancia, "km con el autom\u00F3vil..."));
        }
        else {
            console.log("El motor debe estar encendido para conducir");
        }
    };
    return Automovil;
}(Vehiculo));
// CLASES DE COMPOSICIÓN - Estas se usan para construir los vehículos
var Motor = /** @class */ (function () {
    function Motor(tipo, cilindros) {
        this.tipo = tipo;
        this.cilindros = cilindros;
        this.encendido = false;
        this.horasUso = 0;
    }
    Motor.prototype.encender = function () {
        if (!this.encendido) {
            this.encendido = true;
            console.log("Motor encendido");
        }
    };
    Motor.prototype.apagar = function () {
        if (this.encendido) {
            this.encendido = false;
            console.log("Motor apagado");
        }
    };
    Motor.prototype.estaEncendido = function () {
        return this.encendido;
    };
    Motor.prototype.getEstado = function () {
        return this.encendido ? "Encendido (".concat(this.tipo, ", ").concat(this.cilindros, " cilindros)") : "Apagado";
    };
    Motor.prototype.agregarHorasUso = function (horas) {
        this.horasUso += horas;
    };
    return Motor;
}());
var SistemaCarga = /** @class */ (function () {
    function SistemaCarga(capacidadMaxima) {
        this.capacidadMaxima = capacidadMaxima;
        this.cargaActual = 0;
    }
    SistemaCarga.prototype.agregarCarga = function (peso) {
        if (this.cargaActual + peso <= this.capacidadMaxima) {
            this.cargaActual += peso;
            console.log("Carga agregada: ".concat(peso, "kg. Total: ").concat(this.cargaActual, "kg"));
            return true;
        }
        else {
            console.log("No se puede agregar carga. Excede la capacidad m\u00E1xima de ".concat(this.capacidadMaxima, "kg"));
            return false;
        }
    };
    SistemaCarga.prototype.liberarCarga = function () {
        console.log("Carga liberada: ".concat(this.cargaActual, "kg"));
        this.cargaActual = 0;
    };
    SistemaCarga.prototype.getCargaActual = function () {
        return this.cargaActual;
    };
    SistemaCarga.prototype.getCapacidadMaxima = function () {
        return this.capacidadMaxima;
    };
    return SistemaCarga;
}());
var ProgramaMantenimiento = /** @class */ (function () {
    function ProgramaMantenimiento() {
        this.ultimoMantenimiento = new Date();
        this.proximoMantenimiento = this.calcularProximoMantenimiento();
    }
    ProgramaMantenimiento.prototype.registrarMantenimiento = function () {
        this.ultimoMantenimiento = new Date();
        this.proximoMantenimiento = this.calcularProximoMantenimiento();
        console.log("Mantenimiento registrado exitosamente");
    };
    ProgramaMantenimiento.prototype.getProximaFecha = function () {
        return this.proximoMantenimiento;
    };
    ProgramaMantenimiento.prototype.calcularProximoMantenimiento = function () {
        var fecha = new Date();
        fecha.setMonth(fecha.getMonth() + 6); // Próximo mantenimiento en 6 meses
        return fecha;
    };
    return ProgramaMantenimiento;
}());
// SISTEMA PRINCIPAL
var SistemaGestionFlota = /** @class */ (function () {
    function SistemaGestionFlota() {
        this.vehiculos = [];
    }
    SistemaGestionFlota.prototype.agregarVehiculo = function (vehiculo) {
        this.vehiculos.push(vehiculo);
    };
    // POLIMORFISMO - Tratamos diferentes vehículos de manera uniforme
    SistemaGestionFlota.prototype.mostrarFlota = function () {
        console.log("\n=== FLOTA DE VEHÍCULOS ===");
        this.vehiculos.forEach(function (vehiculo) {
            console.log(vehiculo.getInfo()); // Comportamiento polimórfico
        });
    };
    SistemaGestionFlota.prototype.realizarMantenimientoGeneral = function () {
        var _this = this;
        console.log("\n=== MANTENIMIENTO GENERAL ===");
        this.vehiculos.forEach(function (vehiculo) {
            if (_this.esMantenible(vehiculo)) {
                console.log("Realizando mantenimiento a: ".concat(vehiculo.getMarca, " ").concat(vehiculo.getModelo));
                vehiculo.realizarMantenimiento();
            }
        });
    };
    // Type guard para verificar si un vehículo es mantenible
    SistemaGestionFlota.prototype.esMantenible = function (vehiculo) {
        return 'realizarMantenimiento' in vehiculo;
    };
    SistemaGestionFlota.prototype.calcularValorTotalFlota = function () {
        var añoActual = new Date().getFullYear();
        return this.vehiculos.reduce(function (total, vehiculo) {
            return total + vehiculo.calcularDepreciacion(añoActual);
        }, 0);
    };
    return SistemaGestionFlota;
}());
// DEMOSTRACIÓN DEL SISTEMA
function demostrarSistema() {
    var sistema = new SistemaGestionFlota();
    // Crear vehículos usando composición
    var camion1 = new Camion("Volvo", "FH16", 2022, 150000, 25000);
    var camion2 = new Camion("Mercedes", "Actros", 2023, 180000, 30000);
    var auto1 = new Automovil("Toyota", "Corolla", 2023, 25000, "Sedán", 5);
    var auto2 = new Automovil("Honda", "CR-V", 2024, 35000, "SUV", 7);
    // Agregar vehículos al sistema
    sistema.agregarVehiculo(camion1);
    sistema.agregarVehiculo(camion2);
    sistema.agregarVehiculo(auto1);
    sistema.agregarVehiculo(auto2);
    console.log("=== SISTEMA DE GESTIÓN DE FLOTA ===");
    // Mostrar flota inicial
    sistema.mostrarFlota();
    // Demostrar funcionalidades específicas
    console.log("\n--- OPERACIONES CON VEHÍCULOS ---");
    // Operaciones con camión
    camion1.encender();
    camion1.cargar(15000);
    camion1.cargar(12000); // Esto debería fallar si excede capacidad
    camion1.viajar(200);
    // Operaciones con automóvil
    auto1.encender();
    auto1.conducir(150);
    // Mostrar estado actualizado
    sistema.mostrarFlota();
    // Demostrar polimorfismo
    console.log("\n--- DEMOSTRACIÓN DE POLIMORFISMO ---");
    var vehiculos = [camion1, camion2, auto1, auto2];
    vehiculos.forEach(function (vehiculo) {
        // Mismo método, comportamiento diferente según el tipo
        console.log(vehiculo.getInfo());
    });
    // Realizar mantenimiento
    sistema.realizarMantenimientoGeneral();
    // Mostrar valor total de la flota
    console.log("\nValor total de la flota: $".concat(sistema.calcularValorTotalFlota().toLocaleString()));
    // Demostrar encapsulamiento
    console.log("\n--- DEMOSTRACIÓN DE ENCAPSULAMIENTO ---");
    console.log("Kilometraje del cami\u00F3n: ".concat(camion1.getKilometraje, "km"));
    // camion1.kilometraje = -100; // Esto daría error porque es protected
}
// Ejecutar demostración
demostrarSistema();
