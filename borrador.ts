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

class Sistema {
    constructor(private memoria: BaseDatos){}

    Guardarensistema(item: any){
        this.memoria.guardar(item)
    }
}

const basededatos = new Ram()

