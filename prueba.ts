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

interface Calcular<T>{
  sumar(item: T): number
  restar(item: T): number
  dividir(item: T): number
  multiplicar(item: T): number
}

interface Reporte {
  generar(): void
}

class Memoria<T> implements Gestion<T>{
  private memoria = new Set<T>()

  guardar(item: T): boolean {
    if (this.memoria.has(item)) return false
    else (this.memoria.add(item)) 
    return true
  }

  eliminar(item: T): boolean {
    if (!this.memoria.delete(item)) return false
    else (this.memoria.delete(item))
    return true
  }

  mostrar(): T[] {
    return Array.from(this.memoria.values())
  }
}

//----------------------------
