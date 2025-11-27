// 1. INTERFAZ: contrato para cualquier vehículo
interface IVehiculo {
    encender(): void;
    apagar(): void;
    mover(): void;
}

// 2. CLASE ABSTRACTA: define estructura común
abstract class VehiculoBase {
    // Encapsulamiento: atributos privados
    private marca: string;
    private modelo: string;

    constructor(marca: string, modelo: string) {
        this.marca = marca;
        this.modelo = modelo;
    }

    protected getInfo(): string {
        return `${this.marca} ${this.modelo}`;
    }
}

// 3. HERENCIA + POLIMORFISMO: distintos tipos de vehículos
class Auto extends VehiculoBase implements IVehiculo {
    encender(): void {
        console.log(`🚗 El auto ${this.getInfo()} está encendido`);
    }
    apagar(): void {
        console.log(`🚗 El auto ${this.getInfo()} está apagado`);
    }
    mover(): void {
        console.log(`🚗 El auto ${this.getInfo()} está en movimiento`);
    }
}

class Moto extends VehiculoBase implements IVehiculo {
    encender(): void {
        console.log(`🏍️ La moto ${this.getInfo()} está encendida`);
    }
    apagar(): void {
        console.log(`🏍️ La moto ${this.getInfo()} está apagada`);
    }
    mover(): void {
        console.log(`🏍️ La moto ${this.getInfo()} está rodando`);
    }
}

class Camion extends VehiculoBase implements IVehiculo {
    encender(): void {
        console.log(`🚚 El camión ${this.getInfo()} está encendido`);
    }
    apagar(): void {
        console.log(`🚚 El camión ${this.getInfo()} está apagado`);
    }
    mover(): void {
        console.log(`🚚 El camión ${this.getInfo()} está transportando carga`);
    }
}

// 4. COMPOSICIÓN: gestor que usa vehículos, no hereda de ellos
class GestorVehiculos {
    private vehiculo: IVehiculo;

    constructor(vehiculo: IVehiculo) {
        this.vehiculo = vehiculo;
    }

    public operar(): void {
        this.vehiculo.encender();
        this.vehiculo.mover();
        this.vehiculo.apagar();
    }
}

// 5. USO DEL SISTEMA
const auto = new GestorVehiculos(new Auto("Toyota", "Corolla"));
const moto = new GestorVehiculos(new Moto("Yamaha", "R3"));
const camion = new GestorVehiculos(new Camion("Volvo", "FH16"));

auto.operar();
moto.operar();
camion.operar();
