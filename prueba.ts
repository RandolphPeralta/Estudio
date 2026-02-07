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

interface IGuardado<T> {
  registro(item: T): boolean;
}

interface IEliminado<T> {
  eliminar(item: T): boolean;
}

interface IActualizado<T> {
  actualizar(item: T): boolean;
}

interface IMostrado<T> {
  mostrar(): T[]
}

interface IAccion<T> extends IGuardado<T>, IEliminado<T>, IActualizado<T>, IMostrado<T>{
  registro(item: T): boolean;
  eliminar(item: T): boolean;
  actualizar(item: T): boolean;
  mostrar(): T[]
}

class Memoria<T> implements IAccion<T> {
    private memoria: T[] = []

    registro(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index !== -1) {
            return false;
        }

        this.memoria.push(some)
        return true;
    }

    eliminar(id: any) {
        const index = this.memoria.findIndex((item: any) => item.id === id);

        if (index === -1) {
            return false;
        }

        this.memoria.splice(index, 1);
        return true;

    }

    actualizar(some: any): boolean {
        const index = this.memoria.findIndex((item: any) => item.id === some.id);

        if (index === -1) {
            return false;
        }

        this.memoria[index] = some;
        return true;
    }

    mostrar() {
        return this.memoria
    }
}