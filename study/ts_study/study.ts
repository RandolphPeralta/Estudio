class Person {
  nombre: string = ""
  apellido: string = ""
  edad: number = 0
  genero: string = ""

  Saludo(){
    console.log("Saludo")
  }
}

const person1 = new Person;

person1.nombre = "Randolph"