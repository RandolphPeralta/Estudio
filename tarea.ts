interface Database {

}

interface Mysql extends Database {

}

interface PostgrestSQL extends Database {
    
}

interface constratoalgo {
    accion1(): void
}

interface contratoalgoadicional {
    accion2(): void
}

//-------------------

class SQL implements Mysql {

}

class PSQL implements PostgrestSQL {

}

class trabajador implements constratoalgo {
    accion1(): void {
        throw new Error("Method not implemented.")
    }

    accion2(): void {

    }

}

const trabajador1: contratoalgoadicional = new trabajador()
trabajador1.accion2()
const sql = new PSQL()