// CRUD

interface ICreateTask {
    create<T>(data: T): boolean;
    read<T>(): Array<T>
    update<T>(id: number, data: T): boolean
    delete<T>(id: number): boolean
}

// Detalle de implementacion
class TaskService implements ICreateTask {
    private tasks: Array<any> = [];

    create<T>(data: T): boolean {
        return this.tasks.push(data) > 0;
    }

    read<T>(): Array<T> {
        return this.tasks;
    }

    update<T>(id: number, data: T): boolean {
        const located = this.tasks.indexOf(id, 0);
        return true;
    }

    delete<T>(id: number): boolean {
        this.tasks.splice(id);
        return true
    }
}

// Modelo de Guardado

type Task = {
    id: number
    name: string
    fecha: string
    estado: boolean
}

// Clase consumo

class Aplication {
    private _tasksService: ICreateTask 
        
    constructor( _tasks: ICreateTask){
        this._tasksService = _tasks
    }

    start(): void {
        console.log("1. Ingresar Tarea");
        const inputTarea: Task = {
            id: 1,
            name: "Hacer Mercado",
            fecha: "Hoy",
            estado: false
        }

        if (this._tasksService.create(inputTarea)) { 
            console.log("tarea creada exitosamente")
        }

        console.table(this._tasksService.read());
    } 
}

const app = new Aplication(new TaskService);
app.start();