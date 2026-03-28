// ABSTRACT FACTORY
// crear familias de objetos 
// relacionados sin especificar 
// sus clases concretas.

interface IBoton {
    render(): void
}


interface IBotonWindows extends IBoton {}
interface IBotonMac extends IBoton {}

interface ICheckbox {
    marcar(): void
}

interface ICheckboxWindows extends ICheckbox{}
interface ICheckboxMac extends ICheckbox{}

interface UIFactory {
    crearBoton(): IBoton
    crearCheckbox(): ICheckbox
}

interface UIFactoryWindows extends UIFactory{}
interface UIFactorMac extends UIFactory{}

class BotonWindows implements IBotonWindows {
    render(): void {

    }
}

class CheckboxWindows implements ICheckboxWindows {
    marcar(): void {

    }
}

class BotonMac implements IBotonMac {
    render(): void {

    }
}

class CheckboxMac implements ICheckboxMac {
    marcar(): void {

    }
}

class WindowsFactory implements UIFactoryWindows {

    crearBoton(): IBoton {
        return new BotonWindows()
    }

    crearCheckbox(): ICheckbox {
        return new CheckboxWindows()
    }
}

class MacFactory implements UIFactorMac {

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