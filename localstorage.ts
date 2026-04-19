var lista = []
const nombre = 'Randolph'
localStorage.setItem('nombre', nombre)

class LocalStorageMemoria {
    private memoriaprueba = Array<any>

    guardar<T>(key: T){
        let clave = String(key)
        localStorage.setItem(clave, JSON.stringify(this.memoriaprueba))
    }
}