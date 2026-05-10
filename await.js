async function obtenerDatos() {
  const respuesta = await fetch('https://example.com'); 
  const datos = await respuesta.json(); 
  console.log(datos);
}

async function procesar() {
  try {
    const respuesta = await fetch('url-invalida');
    const datos = await respuesta.json();
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}
