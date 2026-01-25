//@ts-nocheck
//#region Example 1
// BAD - Too coupled
class Products {
    products = []
    getAllProucts(){
        const connection = new SQLConnection().get("Products");
        return connection.data;
        
    }
}

// BETTER

class Connection {
    SQLConection = new SQLConection();
    get(table:string){
        return this.SQLConection.get(table);
    }
}

class Products {
    products = []
    constructor(connection: Connection)
    getAllProucts(){
        this.products = this.connection.get("proucts").data
        return connection.data;
        
    }
}
//#endregion

//#region Example 2
class Task{}

class TaskManager{
    tasks: Task[];

    

}


//#endregion