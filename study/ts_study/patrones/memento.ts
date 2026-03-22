// MEMENTO
// Permite guardar y restaurar el estado previo 
// de un objeto sin revelar los detalles de su implementación.

class EditorMemento {

    constructor(private contenido: string) {}

    getContenido(): string {
        return this.contenido
    }
}

class Editor {

    private contenido: string = ""

    escribir(texto: string) {
        this.contenido += texto
    }

    mostrar() {
        return this.contenido
    }

    guardar(): EditorMemento {
        return new EditorMemento(this.contenido)
    }

    restaurar(memento: EditorMemento) {
        this.contenido = memento.getContenido()
    }
}

class Historial {

    private historial: EditorMemento[] = []

    guardar(memento: EditorMemento) {
        this.historial.push(memento)
    }

    deshacer(): EditorMemento | undefined {
        return this.historial.pop()
    }
}

const editor = new Editor()
const historial = new Historial()

editor.escribir("Hola ")
historial.guardar(editor.guardar())

editor.escribir("mundo")
editor.mostrar()

const memento = historial.deshacer()
if (memento) {
    editor.restaurar(memento)
}

editor.mostrar()