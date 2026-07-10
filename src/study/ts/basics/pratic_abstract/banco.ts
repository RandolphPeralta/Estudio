// Interfaz para operaciones

interface ITransaccion {
  realizarTransaccion(monto: number): any;
}

// Clase abstracta Cuenta

abstract class Cuenta implements ITransaccion {

  abstract saldo: number;
  // Polimorfismo: cada cuenta opera diferente
  abstract realizarTransaccion(monto: number): any;

  //constructor(saldoInicial: number) {
  //  this.saldo = saldoInicial;
  //}

  // Encapsulamiento: acceso controlado al saldo
  //getSaldo(): number {
  //  return this.saldo;
  //}

  
}

// ==================================
// Cuenta de Ahorros (Herencia y Override)
// ==================================
// class CuentaAhorros extends Cuenta {
//   realizarTransaccion(monto: number): void {
//     if (this.saldo >= monto) {
//       this.saldo -= monto;
//       console.log(`Retiro exitoso en Ahorros: -${monto}`);
//     } else {
//       console.log("Fondos insuficientes en Cuenta de Ahorros.");
//     }
//   }
// }

// ==================================
// Cuenta Corriente (Herencia y Override)
// ==================================
// class CuentaCorriente extends Cuenta {
//   private sobregiro: number = 200; // Encapsulado

//   realizarTransaccion(monto: number): void {
//     if (this.saldo + this.sobregiro >= monto) {
//       this.saldo -= monto;
//       console.log(`Retiro exitoso en Corriente (con sobregiro si aplica): -${monto}`);
//     } else {
//       console.log("Fondos insuficientes incluso con sobregiro.");
//     }
//   }
// }

// ==============================
// Clase Cliente (Composición > Herencia)
// ==============================
// class Cliente {
//   private nombre: string;
//   private cuenta: Cuenta; // Composición: un cliente TIENE una cuenta

//   constructor(nombre: string, cuenta: Cuenta) {
//     this.nombre = nombre;
//     this.cuenta = cuenta;
//   }

//   mostrarInfo(): void {
//     console.log(`Cliente: ${this.nombre}`);
//     console.log(`Saldo actual: ${this.cuenta.getSaldo()}`);
//   }

//   realizarOperacion(monto: number) {
//     this.cuenta.realizarTransaccion(monto);
//     this.mostrarInfo();
//   }
// }

// ==============================
// PROGRAMA DEMO
// ==============================

// Cliente con cuenta de ahorros
// const cliente1 = new Cliente("Randolph", new CuentaAhorros(500));
// cliente1.realizarOperacion(200);

// Cliente con cuenta corriente
// const cliente2 = new Cliente("María", new CuentaCorriente(100));
// cliente2.realizarOperacion(250);
