// aqui se empieza a programar
// segunda modificacion
// Tercera

// REGLA DESCENDENTE
// class HTTP {
//     public get(): void{
//         this.request();
//         //
//         //
//         //
//         this.otroMetodo();
//     }

//     private request(): void {

//     }

//     private otroMetodo(): void{

//     }
// }

// INYECCION DE DEPENDENCIA

interface IProduct {

}

// DIP

// INVERSION DE DEPENDENCIA

class Products implements IProduct {

    public createProduct(product: any): void{

    }
}

class Clientes {

}
 
class UI {
    constructor(private _product: Products){} // ACA SE TIENE LA INYECCION DE DEPENDENCIA

    createProduct(data:any): void{
        this._product.createProduct(data)
    }
}

const UiApp = new UI(new Products)  // CUANDO SE INSTANCIA A UIAPP EL ESPERA UN ARGUMENTO EN SU CONSTRUCTOR EL CUAL ES PRODUCT, PERO LA INYECCION DE DEPENDENCIA SE APOYA DE UN ELEMENTO QUE SE LLAMA EL INVERSOR DE CONTROL Y ESTA RECIBIENDO A LA CLASE Y LA IDEA ES QUE RECIBA LA INTERFAZ