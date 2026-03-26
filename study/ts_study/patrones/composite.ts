// COMPOSITE
// compone objetos en estructuras de árbol 
// y trabajar con esas estructuras como si 
// fueran objetos individuales.

interface Componente {
    mostrar(): void
}

class Archivo implements Componente {

    mostrar(): void {

    }
}

class Carpeta implements Componente {

    private elementos: Componente[] = []

    agregar(componente: Componente): void {
        this.elementos.push(componente)
    }

    mostrar(): void {

    }
}