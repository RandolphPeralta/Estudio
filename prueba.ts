// Una empresa desea desarrollar un sistema para gestionar su personal. 
// El sistema debe permitir registrar empleados, calcular salarios y generar reportes. 
// Existen diferentes tipos de empleados:
// Empleados de tiempo completo
// Empleados por horas
// Contratistas
// Cada tipo de empleado tiene una forma diferente de calcular su salario

interface Gestion<T> {
  guardar(item: T): boolean
  eliminar(item: T): boolean
  mostrar(): T[]
}

abstract class Empleado {
  abstract CalcularSalario(): number
}

interface Reporte {
  generar(): void
}

class Memoria<T> implements Gestion<T> {
  private memoria = new Set<T>()

  guardar(item: T): boolean {
    if (this.memoria.has(item)) return false
    this.memoria.add(item)
    return true
  }

  eliminar(item: T): boolean {
    return this.memoria.delete(item)
  }

  mostrar(): T[] {
    return Array.from(this.memoria)
  }
}

//----------------------------

// class ReporteSalarios implements Reporte {
//   constructor(private empleados: Gestion<Empleado>) {}

//   generar(): void {
//     const trabajadores = this.empleados.mostrar()
//     const salarios = trabajadores.map(empleado => ({
//       tipo: empleado.constructor.name,
//       salario: empleado.CalcularSalario()
//     }))

//     console.table(salarios)
//   }
// }

type Persona = {
   cedula: string
   nombre: string
 };

// type EmpleadoSalarioporHora = Persona & {
//   horas: number,
//   valor: number
// };

type EmpleadoSalarioMensual = Persona & {
   salario: number
 }

// type EmpleadoContratista = Persona & {
//   valorproyecto: number
// }

class EmpleadoTiempoCompleto extends Empleado {
  constructor(private persona: EmpleadoSalarioMensual) {super()}

  CalcularSalario(): number {
    return this.persona.salario
  }
}

// class EmpleadoPorHoras extends Empleado {
//   constructor(private persona: EmpleadoSalarioporHora) {super()}

//   CalcularSalario(): number {
//     return this.persona.horas * this.persona.valor
//   }
// }

// class Contratista extends Empleado {
//   constructor(private persona: EmpleadoContratista) {super()}

//   CalcularSalario(): number {
//     return this.persona.valorproyecto
//   }
// }

// const persona1: EmpleadoSalarioMensual = {
//   cedula: "123456",
//   nombre: "Carlos",
//   salario: 30000
// }

// const persona2: EmpleadoSalarioporHora = {
//   cedula: "987654",
//   nombre: "Sara",
//   horas: 20,
//   valor: 5000
// }

// const persona3: EmpleadoContratista = {
//   cedula: "2001744",
//   nombre: "Ana",
//   valorproyecto: 70000
// }

// const memoria = new Memoria<Empleado>()

// const empleado1: Empleado = new EmpleadoTiempoCompleto(persona1)
// const empleado2 = new EmpleadoPorHoras(persona2)
// const empleado3 = new Contratista(persona3)

// memoria.guardar(empleado1)
// memoria.guardar(empleado2)
// memoria.guardar(empleado3)

// const reporte = new ReporteSalarios(memoria)
// reporte.generar()


