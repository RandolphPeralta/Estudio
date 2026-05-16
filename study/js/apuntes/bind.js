function sayHello() {
  console.log(this.name);
}

const obj = { name: "Randolph" };

const newFunc = sayHello.bind(obj); 

newFunc();

//--------------

// function sayHello(greet){
//   console.log(`${greet} ${this.name}`)
// };

// const obj = {name : "Randolph"};

// const newFunc = sayHello.bind(obj, "Hello");
// newFunc();
