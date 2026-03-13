// FACTORY method (creacion)
// que define una interfaz para crear 
// objetos en una superclase, permitiendo a las
// subclases alterar el tipo de objetos 
// que se crearán

interface Forma {
    dibujar(): void
}

class Triangulo implements Forma {
    dibujar(): void {} 
}

class Circulo implements Forma {
    dibujar(): void {}
}

class Cuadrado implements Forma {
    dibujar(): void {}
}

class FactoryForm {
    public obternerForm(form: string){
        if (form === "triangulo"){
            return new Triangulo()
        }
    }
}

const factory = new FactoryForm()
const forma = factory.obternerForm("triangulo")
console.log(forma)