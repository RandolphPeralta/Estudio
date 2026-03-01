// Esto no cumple con OCP, Pero si SRP?

interface Ejecucion{
    ejecutar(): any
}

class View implements Ejecucion{
    ejecutar(){
        this.accion1()
    }

    private accion1(){

    }
}