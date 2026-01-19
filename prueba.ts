const myMap = new Map()
const myObject: Record<any, any> = {}

myMap.set("name", "john");
myMap.set("Lastname", "Doe");

myObject.name = "John";
myObject.lastname = "Doe";

console.log(myMap, myObject)