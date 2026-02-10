interface ISave<T> {
    save(item: T): any
}

interface IAccion<T> extends ISave<T> {}

//-----------------------

class Save<T extends { id: string }> implements ISave<T> {
    constructor(private memoria: T[]) {}

    save(item: T): boolean {
        const index = this.memoria.findIndex(miembro => miembro.id === item.id);
        if (index !== -1) return false;

        this.memoria.push(item);
        return true;
    }
}

class Memoria<T> implements IAccion<T> {
    constructor(private accion: IAccion<T>) {}

    save(item: T): boolean {
        return this.accion.save(item);
    }
}
