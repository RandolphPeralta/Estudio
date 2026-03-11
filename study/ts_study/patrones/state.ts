// STATE
// Permite que un objeto cambie 
// su comportamiento dependiendo 
// de su estado interno

interface EstadoMaquina {
    insertarMoneda(): void
    seleccionarProducto(): void
}

class MaquinaExpendedora {

    constructor(private estado: EstadoMaquina) {}

    insertarMoneda() {
        this.estado.insertarMoneda()
    }

    seleccionarProducto() {
        this.estado.seleccionarProducto()
    }
}

class SinMoneda implements EstadoMaquina {

    constructor(private maquina: MaquinaExpendedora) {}

    insertarMoneda(): void {
        console.log("Moneda insertada")
    }

    seleccionarProducto(): void {
        console.log("Debes insertar una moneda")
    }
}

class ConMoneda implements EstadoMaquina {

    constructor(private maquina: MaquinaExpendedora) {}

    insertarMoneda(): void {
        console.log("Ya hay una moneda insertada")
    }

    seleccionarProducto(): void {
        console.log("Producto entregado")
    }
}

const maquina = new MaquinaExpendedora(null as any)

const estadoInicial = new SinMoneda(maquina)

maquina.seleccionarProducto()
maquina.insertarMoneda()
maquina.seleccionarProducto()