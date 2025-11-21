interface accion {
    prestar(libro: Libro): string;
    devolver(libro: Libro): string;
}

interface Estado{
    estado(): void;
}

class Libro{
    private titulo: string
    private autor: string
    private codigo: number

    constructor (titulo: string, autor: string, codigo: number, estado: boolean){
        this.titulo = titulo
        this.autor = autor
        this.codigo = codigo
    }

    getTitulo(){
        return this.titulo
    }

    prestado(){
        
    }
}

abstract class Usuario {
    private nombre: string

    constructor(nombre: string){
        this.nombre = nombre

    }

    getNombre(){
        return this.nombre
    }
    
}

class Estudiante extends Usuario implements accion{

    private LibrosPrestados: Libro[] = []

    prestar(libro: Libro): string {
        this.LibrosPrestados.push(libro)
        return `Libro prestado`
    }

    devolver(): string{
        return  `Libro devuelto`
    }
}
