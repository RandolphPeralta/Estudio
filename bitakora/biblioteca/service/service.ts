import {IAccion } from "../abstration/interface";

export class Servicio<T> implements IAccion<T> {
    constructor(private memoria: IAccion<T>) { }

    guardar(algo: T): boolean {
        return this.memoria.guardar(algo)
    }

    eliminar(id: any): boolean {
        return this.memoria.eliminar(id)
    }

    actualizar(algo: T): boolean {
        return this.memoria.actualizar(algo);
    }

    mostrar() {
        return this.memoria.mostrar()
    }
}