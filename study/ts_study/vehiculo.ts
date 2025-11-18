// INTERFACES para definir comportamientos
interface Motorizable {
  encender(): void;
  apagar(): void;
  getEstadoMotor(): string;
}

interface Transportable {
  cargar(peso: number): boolean;
  descargar(): void;
  getCargaActual(): number;
}

interface Mantenible {
  realizarMantenimiento(): void;
  getProximoMantenimiento(): Date;
}

// CLASE ABSTRACTA
abstract class Vehiculo {
  protected marca: string;
  protected modelo: string;
  protected año: number;
  protected _kilometraje: number;
  protected precio: number;

  constructor(marca: string, modelo: string, año: number, precio: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this._kilometraje = 0;
    this.precio = precio;
  }

  // ENCAPSULAMIENTO - Getters y setters controlados
  public get getMarca(): string {
    return this.marca;
  }

  public get getModelo(): string {
    return this.modelo;
  }

  public get getKilometraje(): number {
    return this._kilometraje;
  }

  protected set kilometraje(km: number) {
    if (km >= this._kilometraje) {
      this._kilometraje = km;
    }
  }

  // Método abstracto para polimorfismo
  abstract getInfo(): string;

  // Método concreto que pueden usar las subclases
  public calcularDepreciacion(añoActual: number): number {
    const añosUso = añoActual - this.año;
    const depreciacion = añosUso * 0.1 * this.precio;
    return Math.max(this.precio - depreciacion, this.precio * 0.2);
  }
}

// COMPOSICIÓN sobre HERENCIA - Usamos interfaces en lugar de herencia múltiple
class Camion extends Vehiculo implements Motorizable, Transportable, Mantenible {
  // Composición: El camión tiene un motor y sistema de carga
  private motor: Motor;
  private sistemaCarga: SistemaCarga;
  private programaMantenimiento: ProgramaMantenimiento;

  constructor(marca: string, modelo: string, año: number, precio: number, capacidadCarga: number) {
    super(marca, modelo, año, precio);
    this.motor = new Motor("Diésel", 8);
    this.sistemaCarga = new SistemaCarga(capacidadCarga);
    this.programaMantenimiento = new ProgramaMantenimiento();
  }

  // Implementación de interfaces
  public encender(): void {
    this.motor.encender();
  }

  public apagar(): void {
    this.motor.apagar();
  }

  public getEstadoMotor(): string {
    return this.motor.getEstado();
  }

  public cargar(peso: number): boolean {
    return this.sistemaCarga.agregarCarga(peso);
  }

  public descargar(): void {
    this.sistemaCarga.liberarCarga();
  }

  public getCargaActual(): number {
    return this.sistemaCarga.getCargaActual();
  }

  public realizarMantenimiento(): void {
    this.programaMantenimiento.registrarMantenimiento();
    this.kilometraje += 500; // Simulación de viaje de prueba
  }

  public getProximoMantenimiento(): Date {
    return this.programaMantenimiento.getProximaFecha();
  }

  // POLIMORFISMO - Implementación específica
  public getInfo(): string {
    return `CAMION: ${this.marca} ${this.modelo} (${this.año}) - Carga: ${this.getCargaActual()}kg - Estado: ${this.getEstadoMotor()}`;
  }

  public viajar(distancia: number): void {
    if (this.motor.estaEncendido()) {
      this.kilometraje += distancia;
      console.log(`Viajando ${distancia}km con el camión...`);
    } else {
      console.log("El motor debe estar encendido para viajar");
    }
  }
}

class Automovil extends Vehiculo implements Motorizable, Mantenible {
  // Composición: El automóvil tiene motor y características específicas
  private motor: Motor;
  private programaMantenimiento: ProgramaMantenimiento;
  private tipo: string;
  private pasajeros: number;

  constructor(marca: string, modelo: string, año: number, precio: number, tipo: string, pasajeros: number) {
    super(marca, modelo, año, precio);
    this.motor = new Motor("Gasolina", 4);
    this.programaMantenimiento = new ProgramaMantenimiento();
    this.tipo = tipo;
    this.pasajeros = pasajeros;
  }

  // Implementación de interfaces
  public encender(): void {
    this.motor.encender();
  }

  public apagar(): void {
    this.motor.apagar();
  }

  public getEstadoMotor(): string {
    return this.motor.getEstado();
  }

  public realizarMantenimiento(): void {
    this.programaMantenimiento.registrarMantenimiento();
    this.kilometraje += 100; // Simulación de prueba después de mantenimiento
  }

  public getProximoMantenimiento(): Date {
    return this.programaMantenimiento.getProximaFecha();
  }

  // POLIMORFISMO - Implementación específica
  public getInfo(): string {
    return `AUTOMÓVIL: ${this.marca} ${this.modelo} (${this.año}) - ${this.tipo} - Pasajeros: ${this.pasajeros} - Estado: ${this.getEstadoMotor()}`;
  }

  public conducir(distancia: number): void {
    if (this.motor.estaEncendido()) {
      this.kilometraje += distancia;
      console.log(`Conduciendo ${distancia}km con el automóvil...`);
    } else {
      console.log("El motor debe estar encendido para conducir");
    }
  }
}

// CLASES DE COMPOSICIÓN - Estas se usan para construir los vehículos
class Motor {
  private tipo: string;
  private cilindros: number;
  private encendido: boolean;
  private horasUso: number;

  constructor(tipo: string, cilindros: number) {
    this.tipo = tipo;
    this.cilindros = cilindros;
    this.encendido = false;
    this.horasUso = 0;
  }

  public encender(): void {
    if (!this.encendido) {
      this.encendido = true;
      console.log("Motor encendido");
    }
  }

  public apagar(): void {
    if (this.encendido) {
      this.encendido = false;
      console.log("Motor apagado");
    }
  }

  public estaEncendido(): boolean {
    return this.encendido;
  }

  public getEstado(): string {
    return this.encendido ? `Encendido (${this.tipo}, ${this.cilindros} cilindros)` : "Apagado";
  }

  public agregarHorasUso(horas: number): void {
    this.horasUso += horas;
  }
}

class SistemaCarga {
  private capacidadMaxima: number;
  private cargaActual: number;

  constructor(capacidadMaxima: number) {
    this.capacidadMaxima = capacidadMaxima;
    this.cargaActual = 0;
  }

  public agregarCarga(peso: number): boolean {
    if (this.cargaActual + peso <= this.capacidadMaxima) {
      this.cargaActual += peso;
      console.log(`Carga agregada: ${peso}kg. Total: ${this.cargaActual}kg`);
      return true;
    } else {
      console.log(`No se puede agregar carga. Excede la capacidad máxima de ${this.capacidadMaxima}kg`);
      return false;
    }
  }

  public liberarCarga(): void {
    console.log(`Carga liberada: ${this.cargaActual}kg`);
    this.cargaActual = 0;
  }

  public getCargaActual(): number {
    return this.cargaActual;
  }

  public getCapacidadMaxima(): number {
    return this.capacidadMaxima;
  }
}

class ProgramaMantenimiento {
  private ultimoMantenimiento: Date;
  private proximoMantenimiento: Date;

  constructor() {
    this.ultimoMantenimiento = new Date();
    this.proximoMantenimiento = this.calcularProximoMantenimiento();
  }

  public registrarMantenimiento(): void {
    this.ultimoMantenimiento = new Date();
    this.proximoMantenimiento = this.calcularProximoMantenimiento();
    console.log("Mantenimiento registrado exitosamente");
  }

  public getProximaFecha(): Date {
    return this.proximoMantenimiento;
  }

  private calcularProximoMantenimiento(): Date {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + 6); // Próximo mantenimiento en 6 meses
    return fecha;
  }
}

// SISTEMA PRINCIPAL
class SistemaGestionFlota {
  private vehiculos: Vehiculo[];

  constructor() {
    this.vehiculos = [];
  }

  public agregarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculos.push(vehiculo);
  }

  // POLIMORFISMO - Tratamos diferentes vehículos de manera uniforme
  public mostrarFlota(): void {
    console.log("\n=== FLOTA DE VEHÍCULOS ===");
    this.vehiculos.forEach(vehiculo => {
      console.log(vehiculo.getInfo()); // Comportamiento polimórfico
    });
  }

  public realizarMantenimientoGeneral(): void {
    console.log("\n=== MANTENIMIENTO GENERAL ===");
    this.vehiculos.forEach(vehiculo => {
      if (this.esMantenible(vehiculo)) {
        console.log(`Realizando mantenimiento a: ${vehiculo.getMarca} ${vehiculo.getModelo}`);
        vehiculo.realizarMantenimiento();
      }
    });
  }

  // Type guard para verificar si un vehículo es mantenible
  private esMantenible(vehiculo: Vehiculo): vehiculo is Vehiculo & Mantenible {
    return 'realizarMantenimiento' in vehiculo;
  }

  public calcularValorTotalFlota(): number {
    const añoActual = new Date().getFullYear();
    return this.vehiculos.reduce((total, vehiculo) => {
      return total + vehiculo.calcularDepreciacion(añoActual);
    }, 0);
  }
}

// DEMOSTRACIÓN DEL SISTEMA
function demostrarSistema(): void {
  const sistema = new SistemaGestionFlota();

  // Crear vehículos usando composición
  const camion1 = new Camion("Volvo", "FH16", 2022, 150000, 25000);
  const camion2 = new Camion("Mercedes", "Actros", 2023, 180000, 30000);
  const auto1 = new Automovil("Toyota", "Corolla", 2023, 25000, "Sedán", 5);
  const auto2 = new Automovil("Honda", "CR-V", 2024, 35000, "SUV", 7);

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
  const vehiculos: Vehiculo[] = [camion1, camion2, auto1, auto2];
  vehiculos.forEach(vehiculo => {
    // Mismo método, comportamiento diferente según el tipo
    console.log(vehiculo.getInfo());
  });

  // Realizar mantenimiento
  sistema.realizarMantenimientoGeneral();

  // Mostrar valor total de la flota
  console.log(`\nValor total de la flota: $${sistema.calcularValorTotalFlota().toLocaleString()}`);

  // Demostrar encapsulamiento
  console.log("\n--- DEMOSTRACIÓN DE ENCAPSULAMIENTO ---");
  console.log(`Kilometraje del camión: ${camion1.getKilometraje}km`);
  // camion1.kilometraje = -100; // Esto daría error porque es protected
}

// Ejecutar demostración
demostrarSistema();