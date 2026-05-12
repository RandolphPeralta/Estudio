function crearSaludo(saludo) {
  return function(nombre) {
    console.log(saludo + ' ' + nombre);
  };
}

const saludarHola = crearSaludo('Hola');
saludarHola('Randolph');

// CONSULTAR UN POCO MAS DE CLOUSURE