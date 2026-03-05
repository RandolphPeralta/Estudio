// Sistema para crear un automovil

interface AutomovilBase {
    Encender(): boolean
    Apagar(): boolean
}

interface Nissan extends AutomovilBase{
    Estacionar(): void
}

interface Tesla extends AutomovilBase {
    Reparar(): void
}

class DisenioNissan implements Nissan {
    Estacionar(): void {
        
    }

    Encender(): boolean {
       return true
    }

    Apagar(): boolean {
        return false
    }
}

class DisenioTesla implements Tesla {
    Reparar(): void {
        
    }

     Encender(): boolean {
       return true
    }
    
    Apagar(): boolean {
        return false
    }
}

class AutoNissan {
    constructor(private disenio: Nissan){}

    Arrancar(){
        return this.disenio.Encender()
    }

    Apagarse(){
        this.disenio.Estacionar()
        return this.disenio.Apagar()
    }
}

class AutoTesla {
    constructor(private disenio: Tesla){}

    Arrancar(){
        return this.disenio.Encender()
    }

    Apagarse(){
        return this.disenio.Apagar()
    }

    AccionEspecial(){
        return this.disenio.Reparar()
    }
}

const disenioNissan: Nissan= new DisenioNissan() // SRP, OCP
const disenioTesla: Tesla = new DisenioTesla() // SRP, OCP
const disenio = new DisenioNissan() // LSP
const disenioTesla2: AutomovilBase = new DisenioTesla() //, ISP
const autoNissan = new AutoNissan(disenioNissan) // DIP
const dautoTesla = new AutoTesla(disenioTesla) // DIP














































// Sistema de domicilio, este software va a guardar ordenes y decir si se lograron entregar o no

interface IBaseDatos {
    guardar<T>(item: T): void
    mostrar(): any
}

interface IMemoriaRAM extends IBaseDatos{
    actualizar<T>(item: T): void
}

interface IMYSQL extends IBaseDatos{
    eliminar<T>(item: T): void
}

//----------------------------

class Ram implements IMemoriaRAM {

    guardar(item: any): void {
        throw new Error("Method not implemented.")
    }
    mostrar() {
        throw new Error("Method not implemented.")
    }
    actualizar(item: any): void {
        throw new Error("Method not implemented.")
    }
}

class Mysql implements  IMYSQL {

    guardar(item: any): void {
        throw new Error("Method not implemented.")
    }
    mostrar() {
        throw new Error("Method not implemented.")
    }
    eliminar(item: any): void {
        throw new Error("Method not implemented.")
    }
}

// LA INVERSION DE DEPENDENCIA LO QUE HARIA SERIA CREAR CADA DISEÑO, 
// ES DECIR CREAR UNA CLASE PARA CADA ABSTRACION, 
// PARA RESPETAR EL PRINCIPIO DE LISKOV?

class Sistema {
    constructor(){}
}

const basededatos = new Mysql()