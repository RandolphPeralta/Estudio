// Sistema de domicilio, este software va a guardar ordenes y decir si se lograron entregar o no

interface BaseDatos {
    guardar(item: any): void
    mostrar(): any
}

interface MemoriaRAM extends BaseDatos{
    actualizar(item: any): void
}

interface MYSQL extends BaseDatos{
    eliminar(item: any): void
}

class Ram implements MemoriaRAM {
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

class Mysql implements  MYSQL {
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
}

const basededatos = new Ram()

