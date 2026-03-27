// FLYWEIGHT
// permite mantener más objetos dentro de 
// la cantidad disponible de RAM 
// compartiendo las partes comunes del estado 
// entre varios objetos en lugar de mantener 
// toda la información en cada objeto.

class ArbolFlyweight {

    constructor(
        private tipo: any,
        private color: any
    ) {}

    dibujar(posicionhorizontal: number, posicionvertical: number) {
       
    }
}

class ArbolFactory {

    private cache: { [key: string]: ArbolFlyweight } = {}

    dameArbol(tipo: string, color: string): ArbolFlyweight {
        const key = tipo + color

        if (!this.cache[key]) {
            this.cache[key] = new ArbolFlyweight(tipo, color)
        }

        return this.cache[key]
    }
}

class Arbol {

    constructor(
        private posicionhorizontal: any,
        private posicionvertical: any,
        private flyweight: ArbolFlyweight
    ) {}

    dibujar() {
        this.flyweight.dibujar(this.posicionhorizontal, this.posicionvertical)
    }
}

const factory = new ArbolFactory()

const bosque: Arbol[] = []

bosque.push(new Arbol(1, 2, factory.dameArbol("roble", "verde")))
bosque.push(new Arbol(3, 4, factory.dameArbol("roble", "verde")))
bosque.push(new Arbol(5, 6, factory.dameArbol("pino", "oscuro")))

bosque.forEach(arbol => arbol.dibujar())