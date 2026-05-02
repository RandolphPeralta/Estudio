// Promises
const miPromesa = new Promise((resolve, reject) => {
  let exito = true;
  if (exito) {
    resolve("¡Operación exitosa!");
  } else {
    reject("Hubo un error");
  }
});


miPromesa
  .then((mensaje) => console.log(mensaje)) 
  .catch((error) => console.error(error))
  .finally(() => console.log("Operación finalizada"));


// asincrono
async function asincrona() {

    const resultado = await promesa;
    return resultado;
}

function sincrona() {
    return resultado;
}

//XHR
const client = new XMLHttpRequest();

client.open("GET", "/robots.txt");    
client.send();

console.log(client.responseText);


// IIFE
(function () {
  console.log('funcion IIFE clasica');
})();


(() => {
  console.log('funcion IIFE');
})();

// Declaration
function hello(name){
  console.log(`Hello ${name}`)
}

//expression
const sayHello = function(name){
  console.log(`Hello ${name}`)
}









// let listaNombres = ["Luisiana", "Gabriel"]

// let nombreBuscar = prompt("Ingresa el nombre: ")

// function buscarNombre(listaNombres, nombreBuscar){
//     return listaNombres.includes(nombreBuscar)
// }

// let esono = buscarNombre(listaNombres, nombreBuscar);

// if (esono == true ){
//     console.log("El nombre esta")
// }
// else{
//     console.log("El nombre no esta")
// }
// let frase = "Bienvenido a la biblioteca";
// let bandera = frase.includes("biblioteca");

// if (bandera == true){
//     console.log("Encontre en la posicion");
// }

// else {
//     console.log("No encontre la palabra buscada")
// }



// let nombrePkm = ['Charmander', 'Pikachu', 'Bulbasaur', 'Squirtle']

// let habilidades = [
//     [80, 75, 90],
//     [65, 55, 95],
//     [80, 70, 65],
//     [85, 90, 70]
// ];

// function calcularPromHab(habilidades){
//     let promedios = [];

//     for (let i=0; i < habilidades.length; i++){
//         let fila = habilidades[i];
//         let suma = fila.reduce((total, habilidad)=> total+habilidad, 0);
//         promedios[i] = suma/fila.length;   
//     }

//     return promedios;
// }

// function evaluarAptitud(nombresPkm, promedios) {

//     for (let i=0; i<promedios.length; i++){
//         if (promedios[i]>=70){
//             console.log("El pokemon " + nombresPkm[i]+ " Supera el promedio con: " + promedios[i]);
//         }
//         else {
//             console.log("El pokemon " + nombresPkm[i] + " No supera el promedio con: " + promedios[i])
//         }
//     }
// }

// let promedios = calcularPromHab(habilidades);
// evaluarAptitud(nombrePkm,promedios);

// function sumar(num1, num2){
//     let resultado;
//     resultado = num1 + num2;
//     return resultado
// }

// let suma = sumar(5,2)
// console.log("El resultadop es: " + suma)

// function saludar() {
//     console.log("Hla")
// }

// saludar();

// let matriz = new Array(3);

// for ( let i=0; i<3; i++){
//     matriz[i] = new Array(3);
// }

// let miVector = ["Luisiana", 3,4,5]

// console.log(miVector[2])

// let miMatriz = [[1,2,3], 
//                 [4,5,6], 
//                 [7,8,9]];

// console.log(miMatriz[1][1]);

// const { Interface } = require("readline")

// var fechaIngreso = prompt("Ingrese la fecha", "mm/dd/yyyy")
// var fecha = new Date(fechaIngreso)


// var valor1 = parseInt(window.prompt("Ingrese un numero"));
// var valor2 = parseInt(window.prompt("Ingrese otro numero"));

// if ( valor1 > valor2) {
//     alert("El numero mayor es el valor: " + valor1)
// }

// else {
//     alert("El numero mayor es " + valor2)
// }

// var confirmacion = window.confirm("¿Quieres matricularte?")

// if (confirmacion == true){
//     alert("Muchas gracias por matricularse")
// } 
// else {
//     alert("Ok, la matricula no se hizo")
// }

// var respuesta = window.prompt("Ya te matriculaste?", "Si ya estoy matriculado");

// alert("Su respuesta fue " + respuesta);