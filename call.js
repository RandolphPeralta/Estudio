const obj = {
  myName: "khriztianmoreno",
  printName: function () {
    console.log(this.myName);
  },
};

obj.printName(); // khriztianmoreno

const newObj = {
  myName: "mafeserna",
};

obj.printName.call(newObj); //mafeserna