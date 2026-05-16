// Promises

//Ejemplo 1
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


// Ejemplo 2

const obtenerDatosUsuario = (id) => {
  return new Promise((resolve, reject) => {
    console.log("Cargando usuario...");
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, nombre: "Randolph" });
      } else {
        reject(new Error("Usuario no encontrado"));
      }
    }, 1500);
  });
};

obtenerDatosUsuario(1)
  .then((usuario) => console.log(usuario))
  .catch((error) => console.error(error.message)); 
