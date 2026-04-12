const { Interface } = require("readline")

var fechaIngreso = prompt("Ingrese la fecha", "mm/dd/yyyy")
var fecha = new Date(fechaIngreso)


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