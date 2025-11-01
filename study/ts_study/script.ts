interface Programador{
    nombre: string,
    tecnologias: string[],
    tomaMate: boolean | null
}

// type Programador =  {
//     nombre: string,
//     tecnologias: string[]
//     tomaMate: boolean | null
// }

let dev: Programador = {
    nombre: "Sergio Cole",
    tecnologias: ["React", "Angular", "Svelte"],
    tomaMate: true
}

let dev2: Programador = {
    nombre: "Fderico",
    tecnologias: ["Html", "Cobol"],
    tomaMate: null
}

function enviarCurriculum(programador : Programador){ 
    console.log('Este curriculum es de ${programador.nombre}')
}

enviarCurriculum(dev)