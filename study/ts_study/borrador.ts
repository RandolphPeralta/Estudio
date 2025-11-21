interface accion {
    prestar(libro: Libro): string;
    devolver(libro: Libro): string;
}

interface Estado{
    prestado(): void;
}

abstract class Libro implements Estado{
    private titulo: string
    private autor: string
    private codigo: number
    private estado: boolean 

    constructor (titulo: string, autor: string, codigo: number, estado: boolean){
        this.titulo = titulo
        this.autor = autor
        this.codigo = codigo
        this.estado = estado
    }

    getTitulo(){
        return this.titulo
    }

    prestado(){
        this.estado = true
    }

    getEstado(){
        return this.estado
    }
}

abstract class Usuario {
    private nombre: string
    private oficio: string

    constructor(nombre: string, oficio: string){
        this.nombre = nombre
        this.oficio = oficio
    }

    getNombre(){
        return this.nombre
    }

    getOficio(){
        return this.oficio
    }
}

class Estudiante extends Usuario implements accion{

    private LibrosPrestados: Libro[] = []

    prestar(): string {
        this.LibrosPrestados.push()
        return `Libro prestado`
    }

    devolver(): string{
        return  `Libro devuelto`
    }
}

const estudiante1 = new Estudiante("Randolph", "Estudiante")

console.log(estudiante1.prestar()) 