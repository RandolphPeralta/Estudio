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