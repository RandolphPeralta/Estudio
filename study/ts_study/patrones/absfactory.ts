// ABSTRACT FACTORY
// crear familias de objetos 
// relacionados sin especificar 
// sus clases concretas.

interface Boton {
    render(): void
}

interface Checkbox {
    marcar(): void
}

interface UIFactory {
    crearBoton(): Boton
    crearCheckbox(): Checkbox
}

class BotonWindows implements Boton {
    render(): void { 

    }
}

class CheckboxWindows implements Checkbox {
    marcar(): void { 

    }
}

class BotonMac implements Boton {
    render(): void { 

    }
}

class CheckboxMac implements Checkbox {
    marcar(): void {
        
    }
}

class WindowsFactory implements UIFactory {

    crearBoton(): Boton {
        return new BotonWindows()
    }

    crearCheckbox(): Checkbox {
        return new CheckboxWindows()
    }
}

class MacFactory implements UIFactory {

    crearBoton(): Boton {
        return new BotonMac()
    }

    crearCheckbox(): Checkbox {
        return new CheckboxMac()
    }
}

class Aplicacion {

    constructor(private factory: UIFactory) {}

    renderUI() {
        const boton = this.factory.crearBoton()
        const checkbox = this.factory.crearCheckbox()

        boton.render()
        checkbox.marcar()
    }
}