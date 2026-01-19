const myMap = new Map()
const myObject: Record<any, any> = {}

myMap.set("name", "john");
myMap.set("Lastname", "Doe");

myObject.name = "John";
myObject.lastname = "Doe";

// console.log(myMap, myObject);
const customKey = {}

myMap.set(1, "Fernando");
myMap.set(true, "Herrera");
myMap.set(customKey, "Costa rica")

console.log(myMap.get(1))
console.log(myMap.get(true))
console.log(myMap.get(customKey))