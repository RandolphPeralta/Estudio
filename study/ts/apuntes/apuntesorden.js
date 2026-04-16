// Sistema para gestionar Órdenes de Compra. El sistema debe:
// Crear, Aprobar, Cancelar órdenes
// Guardarlas en algún almacenamiento y Mostrar resultados
//------------------------------
var MemoryRepository = /** @class */ (function () {
    function MemoryRepository() {
        this.storage = [];
    }
    MemoryRepository.prototype.save = function (order) {
        this.storage.push(order);
        return true;
    };
    MemoryRepository.prototype.update = function (order) {
        var index = this.storage.findIndex(function (orderr) { return orderr.id === order.id; });
        if (index === -1)
            return false;
        this.storage[index] = order;
        return true;
    };
    MemoryRepository.prototype.findById = function (id) {
        return this.storage.find(function (order) { return order.id === id; }) || null;
    };
    return MemoryRepository;
}());
var OrderService = /** @class */ (function () {
    function OrderService(repository) {
        this.repository = repository;
    }
    OrderService.prototype.register = function (order) {
        return this.repository.save(order);
    };
    OrderService.prototype.modify = function (order) {
        return this.repository.update(order);
    };
    return OrderService;
}());
var ApproveOrder = /** @class */ (function () {
    function ApproveOrder(service) {
        this.service = service;
    }
    ApproveOrder.prototype.execute = function (order) {
        return this.service.modify(order);
    };
    return ApproveOrder;
}());
var CreateOrder = /** @class */ (function () {
    function CreateOrder(service) {
        this.service = service;
    }
    CreateOrder.prototype.execute = function (order) {
        return this.service.register(order);
    };
    return CreateOrder;
}());
var Mapeo = /** @class */ (function () {
    function Mapeo() {
        this.mapeo = new Map();
        // create(order: T){
        //   const result = this.mapeo.set(1, order)
        // }
    }
    Mapeo.prototype.create = function (number, order) {
        this.mapeo.set(number, order);
    };
    Mapeo.prototype.getall = function () {
        return this.mapeo.values();
    };
    return Mapeo;
}());
var Menu = /** @class */ (function () {
    function Menu(createAction, approveAction) {
        this.createAction = createAction;
        this.approveAction = approveAction;
    }
    Menu.prototype.create = function (order) {
        var result = this.createAction.execute(order);
        console.log(result ? "Orden creada" : "Error al crear");
    };
    Menu.prototype.approve = function (order) {
        var result = this.approveAction.execute(order);
        console.log(result ? "Orden aprobada" : "Error al aprobar");
    };
    return Menu;
}());
var repository = new MemoryRepository();
var service = new OrderService(repository);
var create = new CreateOrder(service);
var approve = new ApproveOrder(service);
var menu = new Menu(create, approve);
var order = { id: "1", total: 100 };
var mapeo = new Mapeo();
mapeo.create(1, create);
mapeo.create(2, approve);
menu.create(order);
menu.approve(order);
console.log(mapeo.getall());
