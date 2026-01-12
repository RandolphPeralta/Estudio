const myMap = new Map<string, number>();

myMap.set('one', 1); 
myMap.set('two', 2);

console.log(myMap.get('two')); 
console.log(myMap.has('one'));  
console.log(myMap.size);  
myMap.delete('one');
console.log(myMap.size);



