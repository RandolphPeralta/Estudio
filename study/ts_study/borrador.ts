// Sistema de gestion de empleados

interface Empleado {
    getNombre(): string;
    getEdad(): number;
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

    getEdad(): number {
        return this.edad
    }

    mostrarDetalles(): void {
        
    }
}

class EmpleadoFijo extends Persona {
    private salario: number = 0;
    private salarioHora: number = 0;

    public setSalario(salario: number): void {
        this.salario = salario
    }

    public getSalario(): number {
        return this.salario
    }
}

class EmpleadoTemporal extends Persona {
    private duracionContrato: number = 0; // meses → también SIN constructor
    private salariohora: number = 0;
    private horasTrabajdas: number = 0;

    setSalarioHora(salariohora: number){
        this.salariohora = salariohora
    }

    setHorasTrabajadas(horasTrabajdas: number){
        this.horasTrabajdas = horasTrabajdas
    }

    setDuracionContrato(meses: number): void {
        this.duracionContrato = meses;
    }

    getDuracionContrato(): number {
        return this.duracionContrato;
    }

    mostrarDetalles(): void {
        console.log(
            `Empleado Temporal: ${this.getNombre()} | Edad: ${this.getEdad()} | Contrato: ${this.duracionContrato} meses`
        );
    }
}


class Departamento {

}