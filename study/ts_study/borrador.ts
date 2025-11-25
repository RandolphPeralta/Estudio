// =====================================================
// Interfaces
// =====================================================
interface Movimiento {
  Atacar(): void;
  Defender(): void;
}

// =====================================================
// Clase abstracta
// =====================================================
abstract class Usuario {
  private nombre: string;
  private apellido: string;
  private rol: string;
  private salud: number;

  constructor(nombre: string, apellido: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.rol = "";
    this.salud = 100;
  }

  protected setRol(rol: string): void {
    this.rol = rol
  }

  getRol(): string {
    return this.rol
  }
}

// =====================================================
// Clases hijas
// =====================================================
class Mago extends Usuario implements Movimiento {

  // Se asigna automáticamente sin usar el constructor
  private surol = this.setRol("Mago")

  Atacar(): void {}
  Defender(): void {}
}

class Guerrero extends Usuario implements Movimiento {

  // Igual aquí, sin tocar constructor
  private surol = this.setRol("Guerrero")

  Atacar(): void {}
  Defender(): void {}
}

// =====================================================
// Ejemplo de uso
// =====================================================
const conan = new Guerrero("Conan", "Barbaro");
const merlin = new Mago("Merlin", "Ambrosius");

console.log(conan.getRol()); // "guerrero"
//console.log(merlin.getRol()); // "mago"
