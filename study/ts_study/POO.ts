class Pelicula {
    nombre?: string;
    protagonistas?: string[];
    actores?: string[];

    proyectarEnCine(){
        console.log( ` La pelicula ${this.nombre} esta siendo `)
    }

    constructor(nombre:string, protagonistas: string[], actores: string[]){
        this.nombre = nombre,
        this.protagonistas = protagonistas
        this.actores = actores

    }
}

const persona = new Pelicula('Barbie', ['Barbie', 'Ken'], ['Margot Robbie', 'Bryan Gonsling'])
const persona2 = new Pelicula('Openheimer', ['Openheimer', 'Strauss'], ['Cillian Murphy', 'Robert downey jr'])
// const pelicula = new Pelicula()

console.log(persona2)
// console.log(pelicula)