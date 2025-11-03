//Encapsulamiento
// Polimorfismo
// Herencia

interface IControlador {
    setData(): void
    otroMetodo(): void
}

interface IDControlador {

}

class Controlador implements IControlador, IDControlador {
    private _propertie:number = 0;

    public setData(): void {

    }

    public otroMetodo(): void {
        
    }

    public miMetodo(): void {

    }
}

const controlador: IControlador = new Controlador;