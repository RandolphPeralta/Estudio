// 1. interface 

interface IPrestable {
    prestar(): void;
    devolver(): void;
    disponibilidad(): void;
}

// 2. abstract clase disponibilidad

class Disponible {
    private disponible: boolean = true
}

// 3. Clase diseño del libro

class Libro implements IPrestable{
    private titulo: string
    private autor: string
    private codigo: number
    private disponible: Disponible

    constructor(titulo:string, autor: string, codigo:number, disponible: Disponible){
        this.titulo = titulo
        this.autor = autor
        this.codigo = codigo
        this.disponible = new Disponible()
    }

    prestar(): void{
        // this.disponible = false
    }

    devolver(): void{
        //this.disponible = true
    }

    disponibilidad(): void {
        
    }
}

// 3. abstract Clase de Usuario

abstract class Usuario {
    private nombre: string

    constructor (nombre: string){
        this.nombre = nombre
    }
}

// 4. clase de estudiante

class Estudiante {
    private LibroPrestado: Libro[] = []

    PrestarLibro(libro: Libro){
            this.LibroPrestado.push(libro)
        
    }
}