// // Interfaces (para dar mensajes)

// interface Acciones {
//     mensaje(): string; // de cualquier tipo
// }

// // clase para uso de composicion

// class Composicion {
//     metodoComposicion1(){
//         return `este es el metodo `
//     }
// }

// // clase abstracta para usar la composicion con la clase anterior

// abstract class ClaseAbstracta {
//     private metodo0: Composicion;
//     constructor(metodo0: Composicion){
//         this.metodo0 = metodo0
//     }

//     getMetodo() {
//         return `ESTE ES EL METODO DE COMPOSICION DE LA CLASE ABSTRACTA: ${this.metodo0.metodoComposicion1()}`
//     }
// }

// // Clase para uso de diseño hacia el objeto

// class Disenio extends ClaseAbstracta{
//     getMetodo(): string {
//         return `Hola `
//     }
//     }

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



