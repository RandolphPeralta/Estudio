// Encapsulamiento: Es la capacidad de ocultar
// los procesos internos de un objto a sus usuarios
// y proporcionar una interfaz solo para los miembros
// que quieren que el cliente
// tenga posibilidad de manipular directamente

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

// Polimorfismo: 

abstract class Mago {
    abstract ataque(): void
    
    pocionMagica(): number {
        return 10;
    }
    //metodo base
}

interface AtaqueEspecial {
    ataqueEspecial(): void
}

// abstract class Guerrero {

// }

class Elfo extends Mago implements AtaqueEspecial {
    
    ataque(): void {
        // accion diferente
    }

    ataqueEspecial(): void {
        // ataque especial
    }

}

class ElfoOscuro extends Mago {

    ataque(): void{
        // accion diferente
    }
}

// Herencia - Composicion - Abstracciones

// El problema del diamante es un mal ejemplo 
// de diseño

// class MyPersonalInfo {

// }

// class MyGuitarLessons extends MyPersonalInfo {

// }

// class MyUniversityLessons extends MyPersonalInfo{

// }

// abstract class Animal {

// }

// interface Acuatico extends Animal {}

// interface Terrestre extends Animal {}

// interface Mamiferos extends Terrestre {}

