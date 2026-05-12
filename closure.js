function crearSaludo(saludo) {
  return function(nombre) {
    console.log(saludo + ' ' + nombre);
  };
}

const saludarHola = crearSaludo('Hola');
saludarHola('Randolph');

// CONSULTAR UN POCO MAS DE CLOUSURE

const miContador = (
  function(){
  var _contador = 0;

  function incrementar(){
    return ++_contador;
  }

  function decrementar(){
    return --_contador;
  }

  function valor(){
    return _contador
  }

  return {
    valor,
    incrementar,
    decrementar,
    
  }
})();

console.log(miContador.valor());        
console.log(miContador.incrementar());  
console.log(miContador.valor()); 
console.log(miContador.decrementar());