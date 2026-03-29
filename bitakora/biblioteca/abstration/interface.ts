export interface ICommand {
    ejecutar(): any;
}

export interface ICommandE {
    ejecutar(some: any): any;
}

export interface IMostrar<T> {
    mostrar(): T[];
}

export interface IAccion<T> extends IMostrar<T> {
    guardar(item: T): boolean;
    eliminar(item: T): boolean;
    actualizar(item: T): boolean;
}
