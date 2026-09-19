let a = Symbol('a')         // symbol 
let b: symbol = Symbol('b') // symbol 
var c = a === b             // boolean 
// let d = a + 'x'             // Error TS2469: The '+' operator cannot be 

                            // to type 'symbol'

function* createFibonacciGenerator() {  
    let a = 0 
    let b = 1 
        while (true) {  
            yield a;  
                [a, b] = [b, a + b]  
            } 
    } 

let fibonacciGenerator = createFibonacciGenerator() // IterableIterator<number> 
 
console.log(fibonacciGenerator.next())    // evaluates to {value: 0, done: false} 
console.log(fibonacciGenerator.next())    // evaluates to {value: 1, done: false}
