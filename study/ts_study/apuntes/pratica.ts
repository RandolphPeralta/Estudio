// Encapsulamiento
// Polimorfismo
// Herencia - Composicion - Abstracciones

//Encapsulamiento

// interface IControlador {
//     setData(): void;
//     otroMetodo(): void;
// }

// interface IOtroControlador{

// }

// class Controlador implements IControlador //, IOtroControlador 
// {
//     private _properties: number = 0;

//     public setData(): void {

//     }

//     public otroMetodo(): void {
        
//     }

//     public miMetodo(): void {

//     }
// }

// const controlador: IControlador = new Controlador;
// const controlador2: IOtroControlador = new Controlador;

// Polimorfismo

// abstract class Mago{
//     // abstract ataquee(): void; // metodo base
//     ataque(): void{
//         // algo aqui
//     } 

//     pocionMagica(): number {
//         return 10;
//     }
// }

// interface AtaqueEspecial {
//     ataqueEspecial(): void
// }

// class Elfo extends Mago implements AtaqueEspecial{
    
//     ataqueEspecial(): void {
//         this.ataque();

//         if (this.pocionMagica() > 10){
//             //
//         }

//         else{
//             //
//         }
//     }
// }

// class ElfoOscuro extends Mago implements AtaqueEspecial{
//     ataque(): void {
//          // accion diferente
//     }

//     ataqueEspecial(): void {
        
//     }
// }

// Herencia 

// El problema del diamante

// class MyPersonalInfo {

// }

// class MyGuitarLessons extends MyPersonalInfo{

// }

// class MyUniversityLessons extends MyPersonalInfo{

// }

// abstract class Animal {

// }

// interface Acuatico extends Animal {}

// interface Terrestre extends Animal {}

// interface Mamiferos extends Terrestre{}

// class Perro implements Terrestre{
    
// }

// RECOMENDACIONES DE CLASES DE NEGOCIO Y DE CONSUMO

abstract class MaterialBibliografico {
    abstract prestar(): void; //Pueden ser bases de implementacion y pueden tener atributos
}

class EstadoPrestamo extends MaterialBibliografico{
    private _estado: boolean = false

    prestar(): void{
        this._estado = true;  //Detalles de implementacion
    }

    devolver(): void {
        this._estado = false;
    }

    estaDisponible(): boolean{
        return !this._estado
    }
}

class Libro extends EstadoPrestamo {

}

const libro1 = new Libro();

// ESTO DE AQUI ES NEGOCIO

//------------------

// ESTO DE AQUI ES CONSUMO
// class Application {
//     run(): void {
//         const libro = new EstadoPrestamo();

//         console.log("Estado inicial (deberia ser disponible): ", libro.estaDisponible());

//         libro.prestar();
//         console.log("Estado despues de prestar(deberia no estar disponible): ", libro.estaDisponible());

//         libro.devolver();
//         console.log("Estado después de devolver (deberia ser disponible): ", libro.estaDisponible());

//     }

// }

// LA CLASE APLICATION PUEDE CAMBIAR EN UN .JSX, PUEDE SER UN COMPONENTE DE REACT

// const AppComponent = () => {
//      const libro = new EstadoPrestamo();
//      
//        return {
//                     <div>
//                         <h1>Estado del prestamo del libro</h1>
//                         <p>Disponilbe: {libro.estaDisponible() ? 'Si' : 'No'}</p>
//                         <Button onClick>......
// }
//  

const AppComponent = () => {
    const libro = new EstadoPrestamo();
    libro.prestar();
    console.log("¿El libro esta disponible?", libro.estaDisponible()); // Deberia mostrar: false

    libro.devolver();
    console.log("¿El libro esta disponible?", libro.estaDisponible()); // Deberia mostrar: true

    return null;
}

export default AppComponent;

// const app = new Application();
// app.run();

