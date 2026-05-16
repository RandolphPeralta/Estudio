// function ponerCarbon(){
//   setTimeout(()=>{
//     console.log("2. El carbon está listo")
//   }, 3000)
// }

// console.log("1. Alguien enciende el carbon");
// ponerCarbon();
// console.log("3. Colocamos la carne")

async function ponerCarbon() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("2. El carbon esta listo");
    }, 3000);
  })
}

async function prepararParrillada() {
  console.log("1. Encendiendo carbon ...");
  const carbonlisto = await ponerCarbon();
  console.log(carbonlisto);
  console.log("3. Ahora sí, pongo la carne en la parrillada");
}

// prepararParrillada();

// -------------

// async function obtenerDatos() {
//     return "Datos recibidos";
// }

// obtenerDatos().then(resultado => console.log(resultado));

// //-----------------
// async function obtenerDatosa() {
//   try {
//     const respuesta = await fetch('https://api.example.com/data');
//     const datos = await respuesta.json();
//     console.log(datos);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// obtenerDatosa();

// //--------------
// function resolveAfter2Seconds() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   console.log("llamando");
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // Salida esperada: "resolved"
// }

// asyncCall();

// //-----------

// async function obtenerDatos() {
//   const respuesta = await fetch('https://example.com');
//   const datos = await respuesta.json();
//   console.log(datos);
// }

// async function procesar() {
//   try {
//     const respuesta = await fetch('url-invalida');
//     const datos = await respuesta.json();
//   } catch (error) {
//     console.error('Error al obtener datos:', error);
//   }
// }
