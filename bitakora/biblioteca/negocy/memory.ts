import {IAccion } from "../abstration/interface";

export class Memoria<T> implements IAccion<T> {
    private memoria: T[] = []

    guardar(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
            return false;
        }

        this.memoria.push(some)
        return true;
    }

    eliminar(id: any) {
        const index = this.memoria.findIndex((item: any) => item.id === id);

        if (index === -1) {
            return false;
        }

        this.memoria.splice(index, 1);
        return true;

    }

    actualizar(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index === -1) {
            return false;
        }

        this.memoria[index] = some;
        return true;
    }

    mostrar() {
        return this.memoria
    }
}