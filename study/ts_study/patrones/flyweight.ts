// FLYWEIGHT
// permite mantener más objetos dentro de 
// la cantidad disponible de RAM 
// compartiendo las partes comunes del estado 
// entre varios objetos en lugar de mantener 
// toda la información en cada objeto.

// 🎯 Ejemplo: Caracteres de texto (editor)

// Imagina que renderizas miles de letras:

// A A A A A A A A A

// ❌ Sin Flyweight → creas muchos objetos "A"
// ✅ Con Flyweight → creas una sola "A" y la reutilizas

// Flyweight (objeto compartido)
interface Letra {
    mostrar(posX: number, posY: number): void
}

// Flyweight concreto
class LetraConcreta implements Letra {

    constructor(private caracter: string) {}

    mostrar(posX: number, posY: number): void {
        console.log(`Letra ${this.caracter} en (${posX}, ${posY})`)
    }
}

// Fábrica de Flyweights
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