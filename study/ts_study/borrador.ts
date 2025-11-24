interface Movimiento {
  Atacar(): void;
  Defender(): void;
}

abstract class Usuario {
  private nombre: string;
  private apellido: string;
  private rol: string;
  private salud: number

  constructor(nombre: string, apellido: string, rol: string){
    this.nombre = nombre
    this.apellido = apellido
    this.rol = rol
    this.salud = 100
  }
}

class Mago extends Usuario implements Movimiento{

  Atacar(): void {
    // Ataque del mago
  }

  Defender(): void {
    // Defensa del mago
  }
}

class Guerrero extends Usuario implements Movimiento {
  Atacar(): void {
    // Ataque del guerrero
  }

  Defender(): void {
    // Defensa del guerrero
  }
}

const conan = new Guerrero("Conan", "Barbaro", "Guerrero")
