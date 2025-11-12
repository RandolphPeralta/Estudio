class Calculadora {
  suma(a:number, b:number){
    return a+b
  }

  resta(a:number, b:number){
    return a-b
  }

  multiplicacion(a:number, b:number){
    return a*b
  }

  division(a:number, b:number){
    return a/b
  }
}

const calculadora = new Calculadora;

const sumando = calculadora.suma(1,2)

console.log(sumando);