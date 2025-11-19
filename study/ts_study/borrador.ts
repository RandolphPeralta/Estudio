interface Acciones {
    mensaje(): string; // de cualquier tipo
}

class Disenio implements Acciones {
    private nombre: string = "";

    mensaje() {
        return `Hola ${this.nombre}`
    }

    setnombre(nombre: string) {
        this.nombre = nombre
    }
}

const palabra = new Disenio()

palabra.setnombre("Randolph")

console.log(palabra.mensaje());