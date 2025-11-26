// Sistema de gestion de empleados

interface Empleado {
    getNombre(): string;
    getSalario(): number;
    mostrarDetalles(): void;
}

abstract class Persona implements Empleado {
    private nombre: string;
    private edad: number;

    constructor(nombre: string, edad: number){
        this.nombre = nombre
        this.edad = edad
    }
    
    getNombre(): string {
        return this.nombre
    }

    getSalario(): number {
        return this.edad
    }

    mostrarDetalles(): void {
        
    }
}

class EmpleadoTemporal extends Persona {
    
}