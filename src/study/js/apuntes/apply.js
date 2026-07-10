function sayHello(greet, msg) {
  console.log(`${greet} ${this.name} ! ${msg}`);
}

const obj = {
  name: "Randolph",
}; 

sayHello.apply(obj, ["Hola", "Buenos dias"]); 
