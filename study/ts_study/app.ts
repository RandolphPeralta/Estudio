// MySQL - Workbrench

// estamos contruyendo una aplicacion con mysql
// class Cliente {
//     crearCliente(): boolean {
//         return true
//     }

//     crearProducto(): void{

//     }
// }

// const cliente = new Cliente;

// cliente.crearCliente();

// SUPONGAMOS QUE QUEREMOS GESTIONAR CLIENTES
// ESTO NO ES UN BUEN EJEMPLO YA QUE SI ME 
// PONGO A PONER MAS METODOS, LA CLASE NO TENDRA FIN

class DataBaseMySQL<T>{

    create(data: T): boolean{
        return true;
    }


}

class Cliente {

}

type Producto = {

}

interface OtraCosa {

}

const dataBaseObjectMySQL = new DataBaseMySQL<Cliente>

// const dataBaseObjectMySQL = new DataBaseMySQL<new Cliente()>
// const dataBaseObjectMySQL = new DataBaseMySQL<Producto>
// const dataBaseObjectMySQL = new DataBaseMySQL<OtraCosa>