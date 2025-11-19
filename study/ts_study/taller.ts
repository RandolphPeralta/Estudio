// =============================================================
// 1. Interfaces
// =============================================================
interface IMantenible {
  realizarMantenimiento(): void;
}

interface IIdentificable {
  getId(): number;
}

// =============================================================
// 2. Clase Motor - COMPOSICIÓN (preferida sobre herencia)
// =============================================================
class Motor {
  private potencia: number;

  constructor(potencia: number) {
    this.potencia = potencia;
  }

  public encender(): void {
    console.log(`🔧 Motor encendido con potencia de ${this.potencia} HP.`);
  }

  public getPotencia(): number {
    return this.potencia;
  }
}

// =============================================================
// 3. Clase abstracta Vehiculo
// =============================================================
abstract class Vehiculo implements IMantenible, IIdentificable {
  private id: number;
  private marca: string;
  protected motor: Motor; // COMPOSICIÓN

  constructor(id: number, marca: string, motor: Motor) {
    this.id = id;
    this.marca = marca;
    this.motor = motor;
  }

  getId(): number {
    return this.id;
  }

  getMarca(): string {
    return this.marca;
  }

  // Método que será polimórfico
  abstract descripcion(): void;

  realizarMantenimiento(): void {
    console.log(`🛠️ Realizando mantenimiento al vehículo ${this.marca}...`);
  }
}

// =============================================================
// 4. Clases derivadas (HERENCIA) aplicando POLIMORFISMO
// =============================================================
class Auto extends Vehiculo {
  descripcion(): void {
    console.log(`🚗 Auto marca ${this.getMarca()} con motor de ${this.motor.getPotencia()} HP.`);
  }
}

class Moto extends Vehiculo {
  descripcion(): void {
    console.log(`🏍️ Moto marca ${this.getMarca()} con motor de ${this.motor.getPotencia()} HP.`);
  }
}

// =============================================================
// 5. Programa principal
// =============================================================
const motorAuto = new Motor(120);
const motorMoto = new Motor(45);

const auto = new Auto(1, "Toyota", motorAuto);
const moto = new Moto(2, "Yamaha", motorMoto);

auto.descripcion();            // Polimorfismo
moto.descripcion();            // Polimorfismo

auto.realizarMantenimiento();
moto.realizarMantenimiento();

motorAuto.encender();
motorMoto.encender();
