var lista = []
const nombre = 'Randolph'
localStorage.setItem('nombre', nombre)

class Memoria<T> {

    guardar(key: T){
        let clave = String(key)
        localStorage.setItem(clave, JSON.stringify(key))
    }

    eliminar(key: string){
        localStorage.removeItem(key)
    }

    actualizar(key: string, nuevoValor: T): void {
        if (localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(nuevoValor))
        }
    }
}
