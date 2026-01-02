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

abstract class Animal {

}

interface Acuatico extends Animal {}

interface Terrestre extends Animal {}

interface Mamiferos extends Terrestre{}

class Perro implements Terrestre{
    
}