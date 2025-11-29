// Gestion de prestacion de libros
abstract class Libro {
    private titulo: string;
    private autor: string;
    private prestado: boolean;

    constructor(titulo: string, autor: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.prestado = false;
    }

    public getTitulo(): string {
        return this.titulo
    }

    public getAutor(): string {
        return this.autor
    }

    public esPrestado(): boolean {
        return this.prestado;
    }

    public setPrestado(prestado: boolean): void {
        this.prestado = prestado
    }
}

// Clase LibroFiccion que hereda de Libro
class LibroFiccion extends Libro {
    constructor(titulo: string, autor: string) {
        super(titulo, autor)
    }
}

// Clase Estudiante
class Estudiante {
    private nombre: string;
    private librosPrestados: Libro[];

    constructor(nombre: string){
        this.nombre = nombre;
        this.librosPrestados = []
    }

    public prestarLibro(libro: Libro): void {
        if (!libro.esPrestado()){
            libro.setPrestado(true);
            this.librosPrestados.push(libro);
            console.log(`Libro ${libro.getTitulo()} prestado a ${this.nombre}`)
        }
        
        else {
            console.log(`Libro ${libro.getTitulo()} no disponible`) 
        }
        
    }

    public devolverLibro(libro: Libro): void {
    } 
}

// Clase biblioteca
class Biblioteca {
    private libros: Libro[];
    private estudiantes: Estudiante[]

    constructor() {
        this.libros = [];
        this.estudiantes = [];
    }

    public agregarLibro(libro: Libro): void {
        this.libros.push(libro);
        console.log("Libro agregado");
    }

    private mostrarLibros(): Libro[] {
        return this.libros
    }



    public agregarEstudiante(estudiante: Estudiante): void {
        this.estudiantes.push(estudiante);
        console.log("Estudiante agregado");
    }

    public prestarLibro(estudiante: Estudiante, libro: Libro): void {
        estudiante.prestarLibro(libro)
        console.log("Libro prestado")
    }

    public devolverLibro(estudiante: Estudiante, libro: Libro): void {
        estudiante.devolverLibro(libro)
        console.log("Libro devuelto")
    }
}

// crear biblioteca
const biblioteca = new Biblioteca();

// agregar libro 
const libro1 = new LibroFiccion("El señor de los anillos", "J.R.R Tolkien");
biblioteca.agregarLibro(libro1)

// agregar estudiante
const estudiante1 = new Estudiante("Pepito")
biblioteca.agregarEstudiante(estudiante1)


biblioteca.prestarLibro(estudiante1, libro1)