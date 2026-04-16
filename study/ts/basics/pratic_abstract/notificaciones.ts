// =============================================================
// 1. Interfaz que representa un mensaje
// =============================================================
interface IMensaje {
  getContenido(): string;
  getDestino(): string;
}

// Implementación simple del mensaje
class Mensaje implements IMensaje {
  private contenido: string;
  private destino: string;

  constructor(contenido: string, destino: string) {
    this.contenido = contenido;
    this.destino = destino;
  }

  getContenido(): string {
    return this.contenido;
  }

  getDestino(): string {
    return this.destino;
  }
}

// =============================================================
// 2. Clase Logger (COMPOSICIÓN: usada por los notificadores)
// =============================================================
class Logger {
  log(msg: string): void {
    console.log("📝 LOG:", msg);
  }
}

// =============================================================
// 3. Clase abstracta Notificador (HERENCIA + POLIMORFISMO)
// =============================================================
abstract class Notificador {
  protected logger: Logger; // COMPOSICIÓN

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Método polimórfico
  abstract enviar(mensaje: IMensaje): void;

  protected registrarEnvio(mensaje: IMensaje) {
    this.logger.log(
      `Mensaje enviado a ${mensaje.getDestino()} con contenido: "${mensaje.getContenido()}"`
    );
  }
}

// =============================================================
// 4. Clases concretas (POLIMORFISMO)
// =============================================================
class EmailNotificador extends Notificador {
  enviar(mensaje: IMensaje): void {
    console.log(`📧 Enviando Email a ${mensaje.getDestino()}: ${mensaje.getContenido()}`);
    this.registrarEnvio(mensaje);
  }
}

class SMSNotificador extends Notificador {
  enviar(mensaje: IMensaje): void {
    console.log(`📱 Enviando SMS a ${mensaje.getDestino()}: ${mensaje.getContenido()}`);
    this.registrarEnvio(mensaje);
  }
}

class PushNotificador extends Notificador {
  enviar(mensaje: IMensaje): void {
    console.log(`📲 Enviando Notificación Push a ${mensaje.getDestino()}: ${mensaje.getContenido()}`);
    this.registrarEnvio(mensaje);
  }
}

// =============================================================
// 5. Programa principal (ejemplo de uso)
// =============================================================
const logger = new Logger();

const emailNotifier = new EmailNotificador(logger);
const smsNotifier = new SMSNotificador(logger);
const pushNotifier = new PushNotificador(logger);

const mensaje = new Mensaje("Hola, Randolph!", "Usuario123");

emailNotifier.enviar(mensaje);
smsNotifier.enviar(mensaje);
pushNotifier.enviar(mensaje);
