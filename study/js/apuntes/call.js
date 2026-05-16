const obj = {
  myName: "Randolph",
  printName: function () {
    console.log(this.myName);
  },
};

obj.printName();

const newObj = {
  myName: "Rafael",
};

obj.printName.call(newObj); 