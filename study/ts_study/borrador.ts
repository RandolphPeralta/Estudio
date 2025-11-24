interface Sonido {
  ladrido(): void;
}

abstract class Animal {
  private nombre: string;

  constructor(nombre:string){
    this.nombre = nombre
  }
}

