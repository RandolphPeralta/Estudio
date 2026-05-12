function crearSaludo(saludo) {
  return function(nombre) {
    console.log(saludo + ' ' + nombre);
  };
}

const saludarHola = crearSaludo('Hola');
saludarHola('Randolph');