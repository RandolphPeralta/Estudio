// Interfaces (para dar mensajes)

interface Acciones {
    mensaje(): string; // de cualquier tipo
}

// clase para uso de composicion

class Composicion {
    metodoComposicion1(){
        return `este es el metodo `
    }
}

// clase abstracta para usar la composicion con la clase anterior

abstract class ClaseAbstracta implements Acciones{
    private metodo0: Composicion;
    constructor(metodo0: Composicion){
        this.metodo0 = metodo0
    }

    getMetodo(): string {
        return `ESTE ES EL METODO DE COMPOSICION DE LA CLASE ABSTRACTA: ${this.metodo0.metodoComposicion1()}`
    }

    mensaje(): string{
        return "Hola"
    }
}

// Clase para uso de diseño hacia el objeto

class Disenio extends ClaseAbstracta{
    getdiseno(): string {
        return this.getMetodo()   
    }
}
    
const argumento = new Composicion;
const prueba = new Disenio(argumento)

console.log(prueba.getdiseno());




