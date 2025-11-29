interface Compra {
    comprar(ropa: Ropa): void;    
}

interface Venta {
    verder(ropa: Ropa): void;
}

abstract class Usuario {
    private nombre:string
    private altura:number = 0
    private peso: number = 0
    private edad: number = 0

    constructor(nombre: string){
        this.nombre = nombre
    }

    getNombre(){
        return this.nombre
    }

}

class Ropa {
    private tipo: string = ""
    private color: string = ""
    private precio: number = 0

    getTipo() {
        return this.tipo
    }

    setTipo(tipo:string){
        this.tipo = tipo
    }
}

class Cliente extends Usuario implements Compra {
    private listaropa: Ropa[] = []
    
    comprar(ropa: Ropa): void{
        this.listaropa.push(ropa)
        console.log(`El cliente ${this.getNombre()} compro un ${ropa.getTipo()}`)
    }

    getlistaRopa(){
       return this.listaropa
    }
}
    
const cliente = new Cliente("Randolph")
cliente.getNombre()

const ropa = new Ropa()
ropa.setTipo("Sueter")

cliente.comprar(ropa)

console.log(cliente.getlistaRopa())
