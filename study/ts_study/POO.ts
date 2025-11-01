class Pelicula {
    nombre?: string;
    protagonista?: string[];
    actores?: string[];

    proyectarEnCine(){
        console.log( ` La pelicula ${this.nombre} esta siendo `)
    }

    constructor(nombre:string, protagoristas: string[], actores: string[]){
        
    }
}
// const pelicula = new Pelicula()

// console.log(pelicula)