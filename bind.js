function sayHello() {
  console.log(this.name);
}

const obj = { name: "khriztianmoreno" };

// it won't invoke, it just returns back the new function instance
const newFunc = sayHello.bind(obj); 

newFunc(); // khriztianmoreno