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

import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface ICommand {
  ejecutar(item: any): any
}

interface ICommando {
  ejecutar(): any
}

interface IRead<T> {
  show(): T[]
}

interface IAction<T> extends IRead<T> {
  save(item: any): any;
  delete(item: any): any;
  update(item: any): any;
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

class Servicio<T> implements IAction<T> {
  constructor(private memoria: IAction<T>) { }

  save(algo: T): boolean {
    return this.memoria.save(algo)
  }

  delete(id: any): boolean {
    return this.memoria.delete(id)
  }

  update(algo: T): boolean {
    return this.memoria.update(algo);
  }

  show() {
    return this.memoria.show()
  }
}

type Producto = {
  id: string
  nombre: string
  precio: number
  cantidad: number
}

type Cliente = {
  nombre: string,
  cedula: string
}

type Venta = {
  cliente: Cliente,
  productos: Producto[]
}

class MenuOpcion {
  static REGISTRAR_PRODUCTOS = 1;
  static ELIMINAR_PROUCTOS = 2;
  static VER_PRODUCTOS = 3;
  static ACTUALIZAR_PRODUCTOS = 4;

  static REGISTRAR_CLIENTE = 5;

  static VENDER = 6;

  static VER_VENTAS = 7;

  static SALIR = 0;
}

class MenuAccion {
  constructor(
    private serviciocliente: IAction<Cliente>,
    private servicioproducto: IAction<Producto>,
    private servicioventa: IAction<Venta>
  ) { }

  ejecutar(opcion: number): boolean {
    switch (opcion) {
      case MenuOpcion.REGISTRAR_PRODUCTOS:
        this.RegistrarProducto();
        this.pause();
        break;

      case MenuOpcion.ELIMINAR_PROUCTOS:
        this.EliminarProducto();
        this.pause();
        break

      case MenuOpcion.VER_PRODUCTOS:
        console.table(this.servicioproducto.show());
        this.pause();
        break;

      case MenuOpcion.ACTUALIZAR_PRODUCTOS:
        this.ActualizarProducto()
        this.pause();
        break;

      case MenuOpcion.REGISTRAR_CLIENTE:
        this.RegistrarCliente();
        this.pause();
        break;

      case MenuOpcion.VENDER:
        this.VenderProductos();
        this.pause();
        break;

      case MenuOpcion.VER_VENTAS:
        this.VerVentas();
        this.pause();
        break;

      case MenuOpcion.SALIR:
        return false;

      default:
        console.log("Opción inválida");
    }

    return true;
  }

  private RegistrarProducto() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const precio = Number(prompt("Precio: "));
    const cantidad = Number(prompt("Cantidad: "));

    const producto: Producto = {
      id: id,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    }

    const productoregistrado = this.servicioproducto.save(producto);

    if (productoregistrado) {
      console.log("Producto registrado");
    } else {
      console.log("El producto ya existe con este ID");
    }
  }

  private RegistrarCliente() {
    const nombre = String(prompt("Nombre: "));
    const cedula = String(prompt("Cedula: "));

    const cliente: Cliente = {
      nombre: nombre,
      cedula: cedula
    }

    const clienteregistrado = this.serviciocliente.save(cliente);

    if (clienteregistrado) {
      console.log("Cliente registrado");
    } else {
      console.log("El Cliente ya existe con esta cedula");
    }
  }

  private EliminarProducto() {
    const id = String(prompt("ID: "));
    this.servicioproducto.delete(id)
    console.log("Estudiante Eliminado")
  }

  private ActualizarProducto() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const precio = Number(prompt("precio: "));
    const cantidad = Number(prompt("cantidad: "));

    const producto: Producto = {
      id: id,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    }

    const productoctualizado = this.servicioproducto.update(producto);

    if (productoctualizado) {
      console.log("Producto actualizado");
    } else {
      console.log("No existe un producto con ese ID");
    }
  }

  private VenderProductos() {

    const cedula = String(prompt("Cedula del cliente: "));

    const clientes = this.serviciocliente.show();
    const cliente = clientes.find(clientep => clientep.cedula === cedula);

    if (!cliente) {
      console.log("Cliente no encontrado");
      return;
    }

    console.log("Cliente encontrado:", cliente.nombre);

    let productosVenta: Producto[] = [];
    let total = 0;
    let continuar = true;

    while (continuar) {

      console.table(this.servicioproducto.show());

      const idProducto = String(prompt("ID del producto: "));
      const producto = this.servicioproducto
        .show()
        .find(productop => productop.id === idProducto);

      if (!producto) {
        console.log("Producto no encontrado");
        continue;
      }

      const cantidad = Number(prompt("Cantidad: "));

      if (cantidad > producto.cantidad) {
        console.log("No hay suficiente stock");
        continue;
      }

      const subtotal = producto.precio * cantidad;
      total += subtotal;

      producto.cantidad -= cantidad;
      this.servicioproducto.update(producto);

      productosVenta.push({
        ...producto,
        cantidad: cantidad
      });  // HAY QUE COMPONER ESTO

      const respuesta = String(prompt("¿Agregar otro producto? (s/n): "));
      if (respuesta.toLowerCase() !== "s") {
        continuar = false;
      }
    }

    console.log("\nResumen de venta:");
    console.table(productosVenta);
    console.log("TOTAL A PAGAR: $", total);

    const venta: Venta = {
      cliente: cliente,
      productos: productosVenta
    };

    this.servicioventa.save(venta);

    console.log("Venta registrada correctamente");
  }

  private VerVentas() {

  const ventas = this.servicioventa.show();

  if (ventas.length === 0) {
    console.log("No hay ventas registradas");
    return;
  }

  ventas.forEach((venta, index) => {
    console.log("\n===============================");
    console.log(`VENTA #${index + 1}`);
    console.log("Cliente:", venta.cliente.nombre);
    console.log("Cédula:", venta.cliente.cedula);
    console.log("Productos:");

    console.table(venta.productos);

    const total = venta.productos.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );

    console.log("TOTAL:", total);
  });
}

  private pause() {
    console.log("\nPresiona ENTER para continuar...");
    prompt("");
  }
}

class ConsoleView {
  mensaje(): void {
    const opciones: string[] = [
      "1. Registrar producto",
      "2. Eliminar producto",
      "3. Ver producto",
      "4. Actualizar producto",
      "5. Registrar cliente",
      "6. Vender",
      "7. Ver ventas",

      "0. Salir"
    ];

    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }
}

class App{
  run(): void{
  
  let continuar = true;

  while (continuar) {
    view.mensaje();
    const opcion = Number(prompt("Seleccione opción: "));
    continuar = menu.ejecutar(opcion);
    }
  }
}

const serviciocliente = new Servicio<Cliente>(new Memoria<Cliente>())
const servicioproducto = new Servicio<Producto>(new Memoria<Producto>())
const servicioventa = new Servicio<Venta>(new Memoria<Venta>())

const menu = new MenuAccion(serviciocliente, servicioproducto, servicioventa)

const view = new ConsoleView();
const app = new App()
app.run()