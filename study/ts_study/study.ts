// Clase base
class Persona {
  private nombre: string = "";

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  getNombre(): string {
    return this.nombre;
  }

}

const persona = new Persona

persona.setNombre("Randolph")

console.log(persona.getNombre())

