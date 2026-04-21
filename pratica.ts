const { LocalStorage } = require('node-localstorage');

const storage = new LocalStorage('./scratch');

class Memoria<T> {

    constructor(private storage: any) {}

    guardar(key: T){
        let clave = String(key)
        return this.storage.setItem(clave, JSON.stringify(key))
    }

    eliminar(key: string){
        return this.storage.removeItem(key)
    }

    actualizar(key: string, nuevoValor: T) {
        if (this.storage.getItem(key)) {
            return this.storage.setItem(key, JSON.stringify(nuevoValor))
        }
    }

    findbyid(id: string): T | null {
        let data = this.storage.getItem(id)

        if (data) {
            return JSON.parse(data)
        }

        return null
    }

    read(): any[] {
        let datos: any[] = []

        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i)

            if (key) {
                let value = this.storage.getItem(key)
                if (value) {
                    datos.push(JSON.parse(value))
                }
            }
        }

        return datos
    }
}

const memoria = new Memoria(storage);

memoria.guardar("Randolph")
memoria.guardar("Sara")

console.log(memoria.read());
