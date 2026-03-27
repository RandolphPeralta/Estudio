// 1. Interfaz Visitor
interface Visitor {
    visitDocument(doc: any): void;
    visitImage(img: any): void;
}

// 2. Interfaz Element
interface Elemento {
    accept(visitor: Visitor): void;
}

// 3. Elementos Concretos
class Documento implements Elemento {
    accept(visitor: Visitor) { visitor.visitDocument(this); }
}

class Imagen implements Elemento {
    accept(visitor: Visitor) { visitor.visitImage(this); }
}

// 4. Visitante Concreto (ej. Exportar a JSON)
class JSONExportVisitor implements Visitor {
    visitDocument(doc: Document) { console.log("Exportando documento a JSON"); }
    visitImage(img: Imagen) { console.log("Exportando imagen a JSON"); }
}

// 5. Uso
const elements: Elemento[] = [new Documento(), new Imagen()];
const visitor = new JSONExportVisitor();

elements.forEach(elemento => elemento.accept(visitor));

//--------------------------


// 1. Interfaz Command
interface Command {
    execute(): void;
    undo(): void; // Opcional: para revertir acciones
}

// 2. Receiver (Receptor)
class Light {
    turnOn() { console.log("Luz encendida"); }
    turnOff() { console.log("Luz apagada"); }
}

// 3. Concrete Command
class TurnOnCommand implements Command {
    constructor(private light: Light) {}

    execute() {
        this.light.turnOn();
    }
    undo() {
        this.light.turnOff();
    }
}

// 4. Invoker (Invocador)
class RemoteControl {
    private history: Command[] = [];
    private command!: Command;

    setCommand(command: Command) {
        this.command = command;
    }

    pressButton() {
        this.command.execute();
        this.history.push(this.command);
    }

    undoLast() {
        const command = this.history.pop();
        if (command) command.undo();
    }
}

// 5. Uso (Cliente)
const light = new Light();
const turnOn = new TurnOnCommand(light);
const remote = new RemoteControl();

remote.setCommand(turnOn);
remote.pressButton(); // Salida: Luz encendida
remote.undoLast();    // Salida: Luz apagada

