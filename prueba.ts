//@ts-nocheck
//#region Example 1
// BAD - Too coupled
class Products {
    products = []
    getAllProucts(){
        const connection = new SQLConnection().get("Products");
        return connection.data;
        
    }
}

// BETTER

class Connection {
    SQLConection = new SQLConection();
    get(table:string){
        return this.SQLConection.get(table);
    }
}

class Products {
    products = []
    constructor(connection: Connection)
    getAllProucts(){
        this.products = this.connection.get("proucts").data
        return connection.data;
        
    }
}
//#endregion

//#region Example 2

// BAD
class Task{}

class TaskManager{
    tasks: Task[];

    constructor(){
        this.tasks = [];
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    completeTask(index: numder): void {
        this.tasks[index].markAsCompleted();
    }

    displayTasks():void{
        //... logic
    }

}

const taskManage = new TaskManager();
const task1 = new Task("Completar el informe");

taskManager.addTask(task1);
taskManager.displayTasks();
 
taskManager.completeTask(0);
taskManager.displayTasks();

// BETTER

class UIManager {
    displayTasks(tasks: Task[]): void {
        //......logic
    }
}

const taskmanager = new TaskManager();
const uiManager =  new UIManager();

const task1 = new Task("Completar el informe");
taskmanager.addTask(task1);

const taks = taskmanager.getTasks();
uiManager.displayTasks(tasks);

taskmanager.completeTask(0);
uiManager.displayTasks(tasks)

//#endregion