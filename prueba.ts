// Bobby tiene una tienda de barrio y está cansado de llevar todo en un cuaderno. 
// A veces se le olvida cuánto stock le queda, confunde precios y 
// no sabe quiénes son sus clientes frecuentes. 
// Un día decide crear un software sencillo para organizar su negocio.

// El sistema que Bobby quiere debe permitirle registrar los productos que vende 
// (con su precio y cantidad disponible), registrar los clientes que le compran 
// (con sus datos básicos) y, cuando alguien haga una compra, 
// crear una venta donde se selecciona el cliente, 
// se agregan uno o varios productos con sus cantidades, 
// se calcula el total y se descuenta el stock.

// Con ese software, Bobby espera dejar de cometer errores, 
// saber exactamente qué vendió y a quién, 
// y tener su tienda más ordenada y controlada.

// SOLUCION

interface ISave<T> {
  save(item: T): boolean;
}

interface IDelete<T> {
  delete(item: T): boolean;
}

interface IUpdate<T> {
  update(item: T): boolean;
}

interface IShow<T> {
  show(): T[]
}

interface ICommand {
    ejecutar(item: any): any
}

interface ICommando {
    ejecutar(): any
}

interface IAction<T> extends ISave<T>, IDelete<T>, IUpdate<T>, IShow<T> {
  save(item: T): boolean;
  delete(item: T): boolean;
  update(item: T): boolean;
  show(): T[]
}

//----------------------------------------

class Memoria<T> implements IAction<T> {
    
    private memoria: T[] = []

    save(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
            return false;
        }

        this.memoria.push(some)
        return true;
    }

    delete(id: any) {
        const index = this.memoria.findIndex((item: any) => item.id === id);

        if (index === -1) {
            return false;
        }

        this.memoria.splice(index, 1);
        return true;

    }

    update(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index === -1) {
            return false;
        }

        this.memoria[index] = some;
        return true;
    }

    show() {
        return this.memoria
    }
}

class Servicio<T> {
    constructor(private memoria: IAction<T>) { }

    register(algo: T): boolean {
        return this.memoria.save(algo)
    }

    delete(id: any): boolean {
        return this.memoria.delete(id)
    }

    update(algo: T): boolean {
        return this.memoria.update(algo);
    }

    getAll() {
        return this.memoria.show()
    }
}

type Producto = {
    nombre: string,
    precio: number,
    cantidad: number
}

type Cliente = {
    nombre: string,
    cedula: string
}

class Tienda {
   
}

const memoriacliente = new Memoria<Cliente>() 
const memoriaproducto = new Memoria<Producto>() 

const serviciocliente = new Servicio<Cliente>(memoriacliente)
const servicioproducto = new Servicio<Producto>(memoriaproducto)

// const tienda = new Tienda()

//------