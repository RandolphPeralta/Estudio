// Sistema para gestionar Órdenes de Compra. El sistema debe:
// Crear, Aprobar, Cancelar órdenes
// Guardarlas en algún almacenamiento y Mostrar resultados

interface OrderPersistence<T> {
    save(order: T): boolean
    update(order: T): boolean
    findById(id: string): T | null
}

interface OrderAction<T> {
    execute(order: T): boolean
}

//------------------------------

class MemoryRepository<T extends { id: string }> implements OrderPersistence<T> {

    private storage: T[] = []

    save(order: T): boolean {
        this.storage.push(order)
        return true
    }

    update(order: T): boolean {
        const index = this.storage.findIndex(orderr => orderr.id === order.id)
        if (index === -1) return false
        this.storage[index] = order
        return true
    }

    findById(id: string): T | null {
        return this.storage.find(order => order.id === id) || null
    }
}

class OrderService<T> {

    constructor(private repository: OrderPersistence<T>) {}

    register(order: T): boolean {
        return this.repository.save(order)
    }

    modify(order: T): boolean {
        return this.repository.update(order)
    }
}


















// class ApproveOrder<T> implements OrderAction<T> {

//     constructor(private service: { modify(order: T): boolean }) {}

//     execute(order: T): boolean {
//         return this.service.modify(order)
//     }
// }

// class CreateOrder<T> implements OrderAction<T> {

//     constructor(private service: { register(order: T): boolean }) {}

//     execute(order: T): boolean {
//         return this.service.register(order)
//     }
// }


// class Menu<T> {

//     constructor(private createAction: { execute(order: T): boolean }, private approveAction: { execute(order: T): boolean }) {}

//     create(order: T) {
//         const result = this.createAction.execute(order)
//         console.log(result ? "Orden creada" : "Error al crear")
//     }

//     approve(order: T) {
//         const result = this.approveAction.execute(order)
//         console.log(result ? "Orden aprobada" : "Error al aprobar")
//     }
// }

// class Menu<T>{
//     private ExecuteOrder: any[] = []

//     addactionorder(orderaction:OrderAction<T>){
//         return this.ExecuteOrder.push(orderaction)
//     }

//     executeorder(orderaction: { execute(order: T): boolean }){
        
//     }
// }

// type OrderData = {
//     id: string
//     total: number
// }

// const repository: OrderPersistence<OrderData> = new MemoryRepository<OrderData>()
// const service = new OrderService(repository)

// const create = new CreateOrder(service)
// const approve = new ApproveOrder(service)

// const order: OrderData = { id: "1", total: 100 }

// const menu = new Menu()

// menu.addactionorder(create)

// const menu = new Menu(create, approve)

// menu.approve(order)