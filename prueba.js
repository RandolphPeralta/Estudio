var myMap = new Map();
var myObject = {};
myMap.set("name", "john");
myMap.set("Lastname", "Doe");
myObject.name = "John";
myObject.lastname = "Doe";
// console.log(myMap, myObject);
var customKey = {};
console.log("==== Map ====");
myMap.set(1, "Fernando");
myMap.set(true, "Herrera");
myMap.set(customKey, "Costa rica");
console.log(myMap);
// console.log(myMap.get(1))
// console.log(myMap.get(true))
// console.log(myMap.get(customKey))
console.log("=== Object ====");
myObject[1] = 'Fernando';
//myObject[true] = 'Herrera'
//myObject[customKey] = 'Costa rica'
console.log(myObject);
var myChaterObject = new Map([
    [10, 'John'],
    [5, 'Jane'],
    [1, 'Doe']
]);
console.log(myChaterObject);
