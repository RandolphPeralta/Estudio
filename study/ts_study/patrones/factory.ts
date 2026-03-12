// FACTORY (creacion)

interface Forma {
    dibujar(): void
}

class Triangulo implements Forma {
    dibujar(): void {
       
    } 
}

// class circulo, cuadrado...

class FactoryForm {
    public obternerForm(form: string){
        if ( form === "triangulo"){
            return new Triangulo()
        }
    }
}

const factory = new FactoryForm()
const forma = factory.obternerForm("triangulo")
console.log(forma)