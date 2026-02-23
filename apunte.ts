interface IEmpleado {
  calcularSalario(): number
}

interface IEmpleadoRepository {
  guardar(empleado: IEmpleado): boolean
  obtenerTodos(): IEmpleado[]
}

class EmpleadoTiempoCompleto implements IEmpleado {
  constructor(private salarioMensual: number) {} // SALARIO MENSUAL ES UN DETALLE

  calcularSalario(): number {
    return this.salarioMensual
  }
}

class EmpleadoPorHoras implements IEmpleado {
  constructor(
    private horasTrabajadas: number,
    private valorHora: number
  ) {}

  calcularSalario(): number {
    return this.horasTrabajadas * this.valorHora
  }
}