const sayHiFromFunction = (fn: Function) => {
  fn('Miguel')
}

sayHiFromFunction((name: string)=> {
  console.log(`Hola ${name}`)
})

