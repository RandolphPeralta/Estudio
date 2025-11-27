// Sistema de gestion de empleados

interface Trabajador {
    getNombre(): string;
    getEdad(): number;
    mostrarDetalles(): void;
}

abstract class Empleado implements Trabajador {
    private nombre: string;
    private edad: number;

    constructor(nombre: string, edad: number){
        this.nombre = nombre
        this.edad = edad
    }
    
    public getNombre(): string {
        return this.nombre
    }

    public getEdad(): number {
        return this.edad
    }

    public mostrarDetalles(): void {
       console.log(`Empleado: ${this.nombre} - Edad: ${this.edad}`)
    }
}

class EmpleadoFijo extends Empleado {
    private salario: number = 0;
    private salarioHora: number = 0;

    public setSalario(salario: number): void {
        this.salario = salario
    }

    public getSalario(): number {
        return this.salario
    }
}

class EmpleadoTemporal extends Empleado {
    private duracionContrato: number = 0; // meses → también SIN constructor
    private salariohora: number = 0;
    private horasTrabajdas: number = 0;

    public setSalarioHora(salariohora: number){
        this.salariohora = salariohora
    }

    public setHorasTrabajadas(horasTrabajdas: number){
        this.horasTrabajdas = horasTrabajdas
    }

    public getSalario(): number {
        return this.salariohora * this.horasTrabajdas
    }

    public mostrarDetalles(): void {
        console.log(
            `Trabajador Temporal: ${this.getNombre()} | Edad: ${this.getEdad()} | Contrato: ${this.duracionContrato} meses`
        );
    }
}


class Departamento {
    private empleados: Empleado[] = [];

    public agregarEmpleado(empleado: Empleado): void {
        this.empleados.push(empleado)
    }

    public mostrarDepartamento(): void {
        this.empleados.forEach(emp => emp.mostrarDetalles());
    }
}

const empleadofijo1 = new EmpleadoFijo("Randolph", 30)
const empleadofijo2 = new EmpleadoFijo("Sara", 24)
empleadofijo1.setSalario(1000)
//empleadofijo1.mostrarDetalles()

const departamento1 = new Departamento()

departamento1.agregarEmpleado(empleadofijo1)
departamento1.agregarEmpleado(empleadofijo2)
departamento1.mostrarDepartamento()
