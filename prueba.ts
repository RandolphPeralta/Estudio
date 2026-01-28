//@ts-nocheck
// SINGLE RESPONSABILITY

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

// OPEN/CLOSED

//#region Example 1
// BAD
class Button {
    text: string;
    style: string;

    constructor(text: string, style: string){
        this.text = text
        this.style = style
    }

    render(): void {
        if (this.style === "primary"){
            // Lógica para renderizar un botón de estilo primario
        } else if (this.style === "secondary") {
            // Lógica para renderizar un botón de estilo secundario
        } else {
            throw new Error("Estilo de botón no soportado")
        }

    }
}

// Uso de la clase Button
const primaryButton = new Button("Enviar", "primary")
primaryButton.render();

const secondaryButton = new Button("cancelar", "secondary");
secondaryButton.render();



// BETTER

interface ButtonStyle {
    render(text: string): void;
}

class PrimaryButtonStyle implements ButtonStyle{
    render(text: strng): void {
        //....logic
    }
}

class SecondButtonStyle implements ButtonStyle{
    render(text: strng): void {
        //....logic
    }
}

class Button {
    text: string;
    style: string;

    constructor(text: string, style: ButtonStyle){
        this.text = text
        this.style = style
    }

    render(): void {
        this.style.render(this.text)
    }
}


//#endregion

//#region Example 2

//BAD
class GreetingService{

    language: string;
    
    constructor(language:string){
        this.language = language
    }

    execute(): string {
        switch(this.language){
            case "en": {
                return "Hello";
            }

            case "es": {
                return "Hola"
            }

            case "fr": {
                return "Bonjour"
            }

            default:
                return "";
        }
    }
}

//BETTER

interface LanguageProvider {
    greet(): string;
}

class ENLanguageProvider implements LaanguageProvider {
    greet(): string {
        return "Hello";
    }
}

class FRLanguageProvider implements LaanguageProvider {
    greet(): string {
        return "Bonjour";
    }
}

class ESLanguageProvider implements LaanguageProvider {
    greet(): string {
        return "Hola";
    }
}

class GreetingService{

    languageProvider: LanguageProvider;
    
    constructor(languageProvider: LanguageProvider){
        this.languageProvider = languageProvider
    }

    execute(): string {
        return this.languageProvider.greet();
    }
}

const provider = new FRLanguageProvider(); //Se puede cambiar el lenguaje
const grettingService = new GreetingService(provider);
grettingService.execute()
//#endregion

// LISKOV SUBSTITUTION

// BAD

 

// INVERSE DEPENDENCY

//#region Example 1

//BAD
interface Worker{
    eat: () => void;
    work: () => void;
    sleep: () => void;
}

class Chef implements Worker {
    work(){}
    sleep(){}
    eat(){}
}

class Driver implements Worker {
    work(){}
    sleep(){}
    eat(){}
}

const kevin = new Chef();
kevin.sleep();

// BETTER

interface Workable{
    work(): void;
}

interface Eatable{
    eat(): void;
}

interface Sleepable{
    sleep(): void;
}

class Chefsito implements Workable, Eatable{
    work(): void {
        
    }

    eat(): void {
        
    }
}

//##endregion