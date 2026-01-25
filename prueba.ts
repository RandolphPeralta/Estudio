// S

class UUsuario {
    constructor(nombre: string){}
}

class Memoria {
    guardarUsuario(usuario : UUsuario){
        //
    }
}

class Email {
    envarEmail(usuario: UUsuario){}
}

// O

interface Accion {
    ejecutar():number;
}

class Sumando implements Accion {
    ejecutar(): number {
        return 1+1
    }
}

class Restando implements Accion {
    ejecutar(): number {
        return 1-1
    }
}

// L

class Avve {}

class Avvevoladora{
    volar(){}
}

class AAguila extends Avvevoladora {
    volar(): void {   
    }
}

class Pingui extends Avve{}

// I

interface Superfuerte {

    superfuerza():void
}

interface Supertrepadormuros {
    Treparmuros():void
}

class Hulk implements Superfuerte {
    superfuerza(): void {
    }

}

// D

interface Basededatos {
    conexion(): void
}

class MySQLL implements Basededatos {
    conexion(): void {     
    }
}

class Appp {
    constructor(private db: Basededatos){}

    conectar(){
        this.db.conexion()
    }
}

