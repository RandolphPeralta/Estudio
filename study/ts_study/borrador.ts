// =============================================================
// Interfaces
// =============================================================
interface Speaking {
  hablar(palabra: string): void;
}

interface Listening {
  escuchar(palabra: string): void;
}

// =============================================================
// Clase abstracta base
// =============================================================
abstract class Usuario {
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }
}

// =============================================================
// Hablador
// =============================================================
class Hablador extends Usuario implements Speaking {

  hablar(palabra: string): string {
    const mensaje = `${this.getNombre()} dice: ${palabra}`;
    console.log(mensaje);
    return mensaje;  // Esto permite que otros objetos "reciban" lo que se dijo
  }
}

// =============================================================
// Escuchador
// =============================================================
class Escuchador extends Usuario implements Listening {
  private historial: string[] = [];

  escuchar(palabra: string): void {
    const registro = `${this.getNombre()} escuchó: ${palabra}`;
    this.historial.push(registro);
    console.log(registro);
  }

  getHistorial(): string[] {
    return this.historial;
  }
}

// =============================================================
// Ejemplo de uso (composición)
// =============================================================
const hablador = new Hablador("Sara");
const escuchador = new Escuchador("Valentina");

// El hablador dice algo
const mensaje = hablador.hablar("Hola, ¿cómo estás?");

// El escuchador escucha lo que el hablador dijo
escuchador.escuchar(mensaje);

// Mostrar historial
console.log("Historial de lo escuchado:", escuchador.getHistorial());
