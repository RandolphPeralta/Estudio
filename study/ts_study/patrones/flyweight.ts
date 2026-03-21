// FLYWEIGHT
// permite mantener más objetos dentro de 
// la cantidad disponible de RAM 
// compartiendo las partes comunes del estado 
// entre varios objetos en lugar de mantener 
// toda la información en cada objeto.

interface Letra {
    mostrar(posX: number, posY: number): void
}

class LetraConcreta implements Letra {

    constructor(private caracter: string) {}

    mostrar(posX: number, posY: number): void {
        console.log(`Letra ${this.caracter} en (${posX}, ${posY})`)
    }
}

class LetraFactory {

    private letras: { [key: string]: Letra } = {}

    obtenerLetra(caracter: string): Letra {
        if (!this.letras[caracter]) {
            this.letras[caracter] = new LetraConcreta(caracter)
        }
        return this.letras[caracter]
    }
}

const factory = new LetraFactory()
const texto = "ABA"

for (let i = 0; i < texto.length; i++) {
    const letra = factory.obtenerLetra(texto[i])
    letra.mostrar(i, 0)
}