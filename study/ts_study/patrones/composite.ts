// COMPOSITE
// compone objetos en estructuras de árbol 
// y trabajar con esas estructuras como si 
// fueran objetos individuales.

interface Componente {
    mostrar(indice: string): void
}

class Archivo implements Componente {

    constructor(private nombre: string) {}

    mostrar(indice: string): void {
        console.log(indice + "- Archivo: " + this.nombre)
    }
}

class Carpeta implements Componente {

    private elementos: Componente[] = []

    constructor(private nombre: string) {}

    agregar(componente: Componente): void {
        this.elementos.push(componente)
    }

    mostrar(indice: string): void {
        console.log(indice + "+ Carpeta: " + this.nombre)

        for (const elemento of this.elementos) {
            elemento.mostrar(indice + "  ")
        }
    }
}