// Necesito desarrollar una aplicacion para guardar tareas diarias
// Voy a necesitar un proceso de guardado
// Voy a necesitar un proceso de lectura
// Voy a necesitar un proceso de actualizacion
// Voy a necesitar un proceso de eliminacion

interface CreateTask {
    create<T>(data: T): boolean
    read<T>(): Array<T>
    update<T>(id: number, data: T): boolean
    delete<T>(id: number): boolean
}

class TakService implements CreateTask {

    private tasks: Array<any> = [];
    
    create<T>(data: T): boolean {
        return this.tasks.push(data) > 0;
    }
    read<T>(): Array<T> {
        return this.tasks
    }
    update<T>(id: number, data: T): boolean {
        throw new Error("Method not implemented.")
    }
    delete<T>(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    

}