// S - SINGLE RESPONSABILITY

// Una clase debe tener una unica responsabilidad 
// Es decir una unica funcion 
// y por ende una razon para cambiar

class SuperHero {
    DoSuperSkill(){}
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

// L - LISKOV PRINCIPLE (Principio de Liskov)

// Si tenemos clases padres e hijas es decir
// Herencia, las instancias se pueden intercambiar 
// sin generar resultados inesperadas

// Es decir evitar agregar restriciones 
// o comportamientos heredados en una clase, 
// para no tener comportamientos inesperados

// I - PRINCIPIO DE SEGREGACION DE INTERFACES

// Los clientes no deben verse obligados a dependerse
// de interfaces que no utilizan, es decir que el cliente
// debe conocer los metodos que va a utilizar

interface TrepaMuros {}

interface Superheroe {}

interface Volador {}


class SuperHeroTrepaMuros implements TrepaMuros {}

class SuperHeroVolador implements Volador {}


class Spiderman extends SuperHeroTrepaMuros {}

// D - INVERSION DE DEPENDENCIAS

// Depende de abstraciones no de implementacion concreta
// Las clases de alto nivel no deben 
// depender de las clases de bajo nivel
// sino que ambas deben depender de abstracciones

class TheAvengers {
    
}

interface Avenger extends TheAvengers {

}

