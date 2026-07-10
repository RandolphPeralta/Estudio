// Necesito desarrollar una aplicacion para guardar tareas diarias
// Voy a necesitar un proceso de guardado
// Voy a necesitar un proceso de lectura
// Voy a necesitar un proceso de actualizacion
// Voy a necesitar un proceso de eliminacion

interface ICreateTask {
    create<T>(data: T): boolean
    read<T>(): Array<T>
    update<T>(id: number, data: T): boolean
    delete<T>(id: number): boolean
}

// ESTOS SON DETALLES DE IMPLEMENTACION
class TaskMemoryService implements ICreateTask {

    private tasks: Array<any> = [];
    
    create<T>(data: T): boolean {
        return this.tasks.push(data) > 0;
    }
    read<T>(): Array<T> {
        return this.tasks
    }
    update<T>(id: number, data: T): boolean {
        //const located = this.tasks.indexOf(id, 0):
        return true
    }
    delete<T>(id: number): boolean {
        this.tasks.splice(id)
        return true
    }
}

// ESTOS SON DETALLES DE IMPLEMENTACION EN LOCALSTORAGE
// class TaskLocalStorageService implements CreateTask {
//     create<T>(data: T): boolean {
//         // return this.localstorage.save(data)>0;
//         throw new Error("Method not implemented.");
//     }
//     read<T>(): Array<T> {
//         throw new Error("Method not implemented.");
//     }
//     update<T>(id: number, data: T): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete<T>(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }

// }

// Modelo de Guardado

type Task = {
    id: string
    name:string
    fecha: string
    estado: boolean
}

// Consumidora 
class Aplication{

    constructor(private _task: ICreateTask){ }

    start(): void {
        console.log("1. Ingresar Tarea")
        const inputTarea: Task = {
            id: "1",
            name: "Hacer Mercado",
            fecha: "hoy",
            estado: false
        }

        if (this._task.create(inputTarea)){
            console.log("Tarea creada exitosamente")
        }

        console.table(this._task.read<Task>());
        const readData = this._task.read<Task>();

        readData.forEach(data => console.log(data.id))  // data.id) NO ES NECESARIO CREAR UN GET Y UN SET
    }
}

const app = new Aplication(new TaskMemoryService)
app.start();
