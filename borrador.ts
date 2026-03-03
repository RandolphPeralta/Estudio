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



