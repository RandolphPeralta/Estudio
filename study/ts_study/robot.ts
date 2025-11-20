// -----------------------------
// Interfaces
// -----------------------------

interface IMotor {
  encender(): void;
  apagar(): void;
}

interface IHerramienta {
  usar(): void;
}

// -----------------------------
// Implementación por composición
// -----------------------------

class MotorElectrico implements IMotor {
  encender(): void {
    console.log("⚡ Motor eléctrico encendido.");
  }
  apagar(): void {
    console.log("⚡ Motor eléctrico apagado.");
  }
}

class MotorHidraulico implements IMotor {
  encender(): void {
    console.log("💧 Motor hidráulico encendido.");
  }
  apagar(): void {
    console.log("💧 Motor hidráulico apagado.");
  }
}

class Soldador implements IHerramienta {
  usar(): void {
    console.log("🔧 Soldando componentes...");
  }
}

class Pintor implements IHerramienta {
  usar(): void {
    console.log("🎨 Pintando piezas...");
  }
}

// -----------------------------
// Clase Abstracta (Herencia mínima)
// -----------------------------

abstract class Robot {
  // Encapsulamiento
  private _id: number;
  protected motor: IMotor;       // hereda a los hijos
  protected herramienta: IHerramienta; // composición

  constructor(id: number, motor: IMotor, herramienta: IHerramienta) {
    this._id = id;
    this.motor = motor;
    this.herramienta = herramienta;
  }

  // Getter para ID (encapsulado)
  get id(): number {
    return this._id;
  }

  // Polimorfismo: cada robot define su propia tarea
  abstract realizarTarea(): void;

  iniciarRobot(): void {
    console.log(`🤖 Robot ${this.id} iniciando...`);
    this.motor.encender();
  }

  detenerRobot(): void {
    this.herramienta.usar();
    this.motor.apagar();
    console.log(`🛑 Robot ${this.id} detenido.`);
  }
}

// -----------------------------
// Clases hijas con polimorfismo
// -----------------------------

class RobotSoldador extends Robot {
  realizarTarea(): void {
    console.log(`🤖 Robot Soldador ${this.id} realizando soldadura.`);
    this.herramienta.usar();
  }
}

class RobotPintor extends Robot {
  realizarTarea(): void {
    console.log(`🤖 Robot Pintor ${this.id} aplicando pintura.`);
    this.herramienta.usar();
  }
}

// -----------------------------
// Uso del sistema
// -----------------------------

const robot1 = new RobotSoldador(101, new MotorElectrico(), new Soldador());
const robot2 = new RobotPintor(202, new MotorHidraulico(), new Pintor());

robot1.iniciarRobot();
robot1.realizarTarea();
robot1.detenerRobot();

console.log("------------------------------------------------");

robot2.iniciarRobot();
robot2.realizarTarea();
robot2.detenerRobot();
