//@ts-nocheck

// CRUD
// Consultar Datos por UID  ID

// Persistencia (Memoria, Base de datos, LocalStorage, Redis, Kafka)
// Modelos de Datos
// Capa de Negocio
// Capa de Presentacion
// I/O

//var snacf = require('scaf');

interface CRUD {
    create<T>(playload: T): boolean
    read<T>(): Array<T>
    update<T>(id: number, data: T): boolean
    delete(id: number): boolean
}

//MODELO DE GUARDADO
type Client = {
    id: number
    name: string
}

type Product = {
    id: number
    name: string
    stock: number
}

type Sell = {
    idCliente: Client
    idProducto: Product
}

// DETALLE DE IMPLEMENTACION O NEGOCIO
class InMemoryService implements CRUD {
    private databaseInMemory: Array<any> = []

    create<T>(playload: T): boolean {
        return this.databaseInMemory.push(playload) > 0
    }
    read<T>(): Array<T> {
        return this.databaseInMemory
    }
    update<T>(id: number, data: T): boolean {
        let status = true;
        let indexResult = this.databaseInMemory.findIndex(([key, value]) => id === value)

        if (indexResult === -1)
            status = false

        this.databaseInMemory[indexResult] = data;
        return status;
    }
    delete(id: number): boolean {
        let status = true;
        let indexResult = this.databaseInMemory.findIndex(([key, value]) => id === value)

        if (indexResult === -1)
            status = false

        this.databaseInMemory.splice(indexResult, 1)
        return status;
    }
    
}

// UI - I/O
class View {

    constructor( private _crudService: CRUD){}

    buildMenuAplicaction(): void{
        console.log("============ La tienda de Bobby =============")
        console.log()
        console.log("1. Registrar Cliente");
        console.log()

        const selectedOption = scanf("%s");
        this.processOptonSelected(selectedOption)
    }

    processOptionSelected(option: string): void {
        switch (option){
            case "1":
                this.createClient();
                break
        }
    }

    createClient(): void {
        const clientFormValues: any = {
            id: "Ingrese el ID: ",
            name: "Nombre de Cliente: "
        }

        let dataClient: any = {
            id: 0,
            name: ""
        }
    }

}

// Main
class Application {

    constructor(private _view: View){}

    start(): void {
        this._view.buildMenuAplicaction();
    }
}

// Entry point
const app =  new Application(
    new View(new InMemoryService)
);

app.start();