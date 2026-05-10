function sayHello(greet, msg) {
  console.log(`${greet} ${this.name} ! ${msg}`);
}

const obj = {
  name: "khriztianmoreno",
};

sayHello.call(obj, "Hello", "Good Morning"); 

sayHello.apply(obj, ["Hello", "Good Morning"]); 
