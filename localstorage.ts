var lista = []
const nombre = 'Randolph'
localStorage.setItem('nombre', nombre)

class Memoria {

    guardar<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    mostrar<T>(key: string): T | null {
        let data = localStorage.getItem(key)

        if (data) {
            return JSON.parse(data)
        }

        return null
    }

    eliminar(key: string): void {
        localStorage.removeItem(key)
    }

    actualizar<T>(key: string, nuevoValor: T): void {
        if (localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(nuevoValor))
        }
    }

    mostrarTodo(): any[] {
        let datos: any[] = []

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)

            if (key) {
                let value = localStorage.getItem(key)
                if (value) {
                    datos.push(JSON.parse(value))
                }
            }
        }

        return datos
    }
}