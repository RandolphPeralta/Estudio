interface Speaking {
  hablar(palabras: string): void;
}

interface Listening {
  escuchar(): void;
}

abstract class Usuario {
  private nombre: string;
  constructor(nombre: string){
    this.nombre = nombre
  }
  
  setNombre(): void{
    this.nombre
  }

  getNombre(): string{
    return this.nombre
  }
}

class Hablador extends Usuario implements Speaking{
  hablar(palabra: string): void {
    //conversacion: string[] = []
    console.log(`${palabra}`)
  }
}

class Escuchador extends Usuario implements Listening {
  palabras: string[] = []
  escuchar(): void {
  }
}

