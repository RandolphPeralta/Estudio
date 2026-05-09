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

miPromesa.then((mensaje) => console.log(mensaje),
(error) => console.error(error))



// TOCA BUSCAR LAS FUNCIONES DE EXPRESION Y DE DECLARACION
// Y LUEGO EL HOISTING (EL ES MAS EXPRESIVO) PARA LOS EJEMPLOS Y REPASAR LOS ANTERIORES

fetch('https://example.com') // Supongamos que esta API existe
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return otroProcesoAsincrono(data); // Retornar otra promesa
    })
    .then(resultadoFinal => {
        console.log(resultadoFinal);
    })
    .catch(error => {
        console.error("Error en la cadena:", error);
    });
