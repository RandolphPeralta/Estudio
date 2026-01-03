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


// EJEMPLO DE DATABSE EN MYSQL 

// class DataBaseMySQL<T>{

//     create(data: T): boolean{
//         return true;
//     }
// }

// class Cliente {
//     nombre!: string
// }

// type Producto = {
//     idProducto: string;
//     nombre: string;

// }

// interface OtraCosa {

// }

// const database = new DataBaseMySQL<Cliente>

// database.create()

// const producto: Producto = {
//     idProducto: "A1",
//     nombre: "Cafe"
// }

// const database = new DataBaseMySQL<new Cliente()>
// const database = new DataBaseMySQL<Producto>
// const database = new DataBaseMySQL<OtraCosa>

// database.create(producto)

// Y SI LO QUIERO MAS AGNOSTICO SE APLICA EL T AL METODO Y AL CAMBIO DE MOTOR DE BASE DE DATOS

abstract class Database{
    abstract create<T>(data: T): boolean
}

class DataBaseMySQL extends Database{
    create<T>(data: T): boolean{
        return true;
    }
}

class DataBasePostgreSQL extends Database{
    create<T>(data: T): boolean{  // OJO ESTO ES UN ERROR DE DISEÑO
        return true;
    }
}

class Cliente{
    nombre!:string
}

interface Producto{
    idProducto: string;
    nombre: string
}

type Compra = {
    idCompra: "1",
    idProducto: "2"
}

const cliente = new Cliente;
cliente.nombre = "Victor";

const database: Database = new DataBaseMySQL;

const producto: Producto = {
    idProducto: "1",
    nombre:"Cafe"
}

const compraDeCliente: Compra = {
    idCompra: "1",
    idProducto: "2"
}

database.create<Cliente>(cliente);
database.create<Producto>(producto);
database.create<Compra>(compraDeCliente)


