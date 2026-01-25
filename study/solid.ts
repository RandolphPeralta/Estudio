// S - SINGLE RESPONSABILITY

// Una clase debe tener una unica responsabilidad 
// Es decir una unica funcion 
// y por ende una razon para cambiar

class Superheroe {
    volar():void {}
    treparparedes(): void {}

}

// 0 - OPEN/CLOSED 

// Una clase debe ser cerrada para su modificacion 
// y abierta para su extension

// Es decir si quiero agregar funcionalidades 
// a la clase no deberia cambiar cosas (codigo)
// sino extender las funcionalidades desde afuera

interface Superpoder {
    superpoder(): any
}

class HeroeVoladorConAlas implements Superpoder {
    private volarconalas(): string {
        return "Volar con alas"
    }

    public superpoder() {
        return this.volarconalas()
    }
}

class HeroeVoladorSinAlas implements Superpoder {
    private volarsinalas(): string {
        return "Volar sin alas"
    }

    public superpoder() {
        return this.volarsinalas()
    }
}

// L - Principio de Liskov

// Si tenemos clases padres e hijas es decir
// Herencia, las instancias se pueden intercambiar 
// sin generar resultados inesperadas


// I - PRINCIPIO DE SEGREGACIONB DE INTERFACES