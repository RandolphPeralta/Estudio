// ABSTRACT FACTORY
// crear familias de objetos 
// relacionados sin especificar 
// sus clases concretas.

interface IBoton {
    render(): void
}

interface ICheckbox {
    marcar(): void
}

interface UIFactory {
    crearBoton(): IBoton
    crearCheckbox(): ICheckbox
}

class BotonWindows implements IBoton {
    render(): void {

    }
}

class CheckboxWindows implements ICheckbox {
    marcar(): void {

    }
}

class BotonMac implements IBoton {
    render(): void {

    }
}

class CheckboxMac implements ICheckbox {
    marcar(): void {

    }
}

class WindowsFactory implements UIFactory {

    crearBoton(): IBoton {
        return new BotonWindows()
    }

    crearCheckbox(): ICheckbox {
        return new CheckboxWindows()
    }
}

class MacFactory implements UIFactory {

    crearBoton(): IBoton {
        return new BotonMac()
    }

    crearCheckbox(): ICheckbox {
        return new CheckboxMac()
    }
}

class Aplicacion {

    constructor(private factory: UIFactory) { }

    renderUI() {
        const boton = this.factory.crearBoton()
        const checkbox = this.factory.crearCheckbox()

        boton.render()
        checkbox.marcar()
    }
}