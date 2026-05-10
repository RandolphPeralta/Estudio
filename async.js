async function obtenerDatos() {
    return "Datos recibidos";
}

obtenerDatos().then(resultado => console.log(resultado));

//-----------------
async function obtenerDatosa() {
  try {
    const respuesta = await fetch('https://api.example.com/data');
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error('Error:', error);
  }
}
obtenerDatosa();

//--------------
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("llamando");
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Salida esperada: "resolved"
}

asyncCall();
