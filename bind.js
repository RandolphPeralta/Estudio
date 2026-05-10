function sayHello() {
  console.log(this.name);
}

const obj = { name: "Randolph" };

const newFunc = sayHello.bind(obj); 

newFunc();