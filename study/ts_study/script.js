// type Programador =  {
//     nombre: string,
//     tecnologias: string[]
//     tomaMate: boolean | null
// }
var dev = {
    nombre: "Sergio Cole",
    tecnologias: ["React", "Angular", "Svelte"],
    tomaMate: true
};
var dev2 = {
    nombre: "Fderico",
    tecnologias: ["Html", "Cobol"],
    tomaMate: null
};
function enviarCurriculum(programador) {
    console.log("Este curriculum es de ".concat(programador.nombre));
}
enviarCurriculum(dev);
