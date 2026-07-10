// Encapsulamiento

// interface IControlador{
//     setData(): void
//     otroMetodo(): void
// }

// interface IDcontrolador {

// }

// class Controlador implements IControlador, IDcontrolador {
//     private _propertie: number = 0;
    
//     public setData(): void {

//     }

//     public otroMetodo(): void {

//     }

//     public miMetodo(): void {

//     }
// }

// const controlador = new Controlador;

// const controlador: IControlador = new Controlador;

// controlador.otroMetodo()

// Polimorfismo

// class Mago {
//     ataque(): void {
//         // Metodo base
//     }

//     pocionMagica(): number {
//         return 10;
//     }
// }

// interface AtaqueEspecial {
//     ataqueEspecial(): void
// }

// class Elfo extends Mago {
    
//     ataqueEspecial(): void {
//         this.ataque();
//     }
// }

// class ElfoOscuro extends Mago implements AtaqueEspecial {
//     ataque(): void {
//         // accion diferente
//     }

//     ataqueEspecial(): void {
//         // 
//     }
// }

// Herencia - Composicion - Abstracciones

// class MyPersonalInfo {

// }

// class MyGuitarLessos extends MyPersonalInfo{

// }

// class MyUniversityLessons extends MyPersonalInfo {

// }

// abstract class Animal {

// }

// interface Acuatico extends Animal {}

// interface Terrestre extends Animal{}

// interface Mamiferos extends Terrestre {}

// class Perro implements Terrestre {

// }