// ITERATOR
//  recorrer elementos de una colección 
// sin exponer su representación subyacente (lista, pila, árbol, etc.).

interface IIterator<T> {
    siguiente(): T | null
    tieneSiguiente(): boolean
}

class ColeccionUsuarios {

    private usuarios: string[] = []

    agregar(usuario: string) {
        this.usuarios.push(usuario)
    }

    getUsuarios(): string[] {
        return this.usuarios
    }
}

class UsuarioIterator implements IIterator<string> {

    private indice: number = 0

    constructor(private usuarios: string[]) {}

    siguiente(): string | null {
        if (this.tieneSiguiente()) {
            return this.usuarios[this.indice++]
        }
        return null
    }

    tieneSiguiente(): boolean {
        return this.indice < this.usuarios.length
    }
}