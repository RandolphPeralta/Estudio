// ABSTRACT FACTORY
// crear familias de objetos 
// relacionados sin especificar 
// sus clases concretas.

interface Boton {
    render(): void
}

interface IBotonWindows extends Boton { }
interface IBotonMac extends Boton { }

interface Checkbox {
    marcar(): void
}

interface IChekboxWindows extends Checkbox { }
interface IChekboxMac extends Checkbox { }

interface UIFactory {
    crearBoton(): Boton
    crearCheckbox(): Checkbox
}

interface UIFactoryWinndows extends UIFactory {}
interface UIFactoryMac extends UIFactory {}

class BotonWindows implements IBotonWindows {
    render(): void {

    }
}

class CheckboxWindows implements IChekboxWindows {
    marcar(): void {

    }
}

class BotonMac implements IBotonMac {
    render(): void {

    }
}

class CheckboxMac implements IChekboxMac {
    marcar(): void {

    }
}

class WindowsFactory implements UIFactoryWinndows {

    crearBoton(): Boton {
        return new BotonWindows()
    }

    crearCheckbox(): Checkbox {
        return new CheckboxWindows()
    }
}

class MacFactory implements UIFactoryMac {

    crearBoton(): Boton {
        return new BotonMac()
    }

    crearCheckbox(): Checkbox {
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