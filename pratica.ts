// Encapsulamiento
// Polimorfismo
// Herencia 

interface IControlador {
    setData(): void;
    otroMetodo(): void;
}

interface IOtroControlador{

}

class Controlador implements IControlador, IOtroControlador {
    private _properties: number = 0;

    public setData(): void {

    }

    public otroMetodo(): void {
        
    }

    public miMetodo(): void {

    }
}

const controlador: IControlador = new Controlador;
const controlador2: IOtroControlador = new Controlador;