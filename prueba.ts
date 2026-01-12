const numbers: number[] = [1, 2, 3, 4];

// Usando map para crear un nuevo array de strings
const squaredNumbers: number[] = numbers.map((x: number) => x * x);

console.log(squaredNumbers); // Output: [1, 4, 9, 16]
console.log(numbers);       // Output: [1, 2, 3, 4] (el original no se modifica)

