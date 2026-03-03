// Sistema de domicilio, este software va a guardar ordenes y decir si se lograron entregar o no

interface BaseDatos {
    guardar(item: any): void
    mostrar(): any
}

interface IMemoriaRAM extends BaseDatos{
    actualizar(item: any): void
}

interface IMYSQL extends BaseDatos{
    eliminar(item: any): void
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

class SistemaDB {

    constructor(private memoria: BaseDatos){}

    GuardarOrden<T>(item: T){
        this.memoria.guardar(item)
    }

    MostrarOrdenes(){
        this.memoria.mostrar()
    }
}

class sistemaRAM {

    constructor(private memoria: IMemoriaRAM){}

    GuardarOrden<T>(item: T){
        this.memoria.guardar(item)
    }

    MostrarOrdenes(){
        this.memoria.mostrar()
    }

    ActualizarOrden<T>(item: T){
        this.memoria.actualizar(item)
    }
}

type Orden = {
    pedido: string
    direccion: string
    estado: boolean
}

const basededatos = new Ram()
const sistema = new SistemaDB(basededatos)

const ordenhamburguesa: Orden = {
    pedido: "Hamburguesas",
    direccion: "Calle 10",
    estado: true
}

sistema.GuardarOrden(ordenhamburguesa)

