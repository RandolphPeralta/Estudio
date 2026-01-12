// Crear un Map donde las claves son strings y los valores son números
var myMap = new Map();
// Métodos comunes
myMap.set('one', 1); // Añadir una entrada
myMap.set('two', 2);
//myMap.set('three', 3);
console.log(myMap.get('two')); // Obtener un valor: Output: 2
console.log(myMap.has('one')); // Comprobar existencia: Output: true
console.log(myMap.size); // Tamaño del Map: Output: 3
myMap.delete('one'); // Eliminar una entrada
console.log(myMap.size); // Output: 2
