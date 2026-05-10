async function obtenerDatos() {
    return "Datos recibidos";
}

obtenerDatos().then(resultado => console.log(resultado));


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
