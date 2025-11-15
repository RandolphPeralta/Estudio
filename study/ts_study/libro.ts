// Interfaces modificadas para usar return en lugar de console.log
interface Prestable {
    prestar(): void;  // Ahora retorna string en lugar de void
    devolver(): void;  // Ahora retorna string en lugar de void
    estaDisponible(): boolean;
}

interface Identificable {
    getId(): number;
}

// Clase que aplica COMPOSICIÓN - modificada para usar return
class EstadoPrestamo {
    private disponible: boolean = true;

    public prestar(): void {
        if (this.disponible) {
            this.disponible = false;
            console.log("📕 El recurso ha sido prestado")
        } else {
            console.log("❌ El recurso no está disponible")
        }
    }

    public devolver(): void {
        this.disponible = true;
        console.log("📗 El recurso ha sido devuelto.");
    }

    public estaDisponible(): boolean {
        return this.disponible;
    }
}

// Clase Libro usando Composicion e interfaces

class Libro implements Prestable, Identificable {
    private id: number;
    private titulo: string;
    private autor: string;
    private estado: EstadoPrestamo;

  constructor(id: number, titulo: string, autor: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.estado = new EstadoPrestamo(); // COMPOSICIÓN
  }

  getId(): number {
    return this.id;
  }

  getTitulo(): string {
    return this.titulo;
  }

  prestar(): void {
    this.estado.prestar();
  }

  devolver(): void {
    this.estado.devolver();
  }

  estaDisponible(): boolean {
    return this.estado.estaDisponible();
  }
}

// Clase abstracta Usuario - base para herencia

abstract class Usuario {
    private nombre: string;

    constructor(nombre:string){
        this.nombre = nombre
    }

    // Metodo polimorfismo
    abstract mostrarInfo(): void;
}

// Clase cliente que heredade usuario y aplica polimorfismo
