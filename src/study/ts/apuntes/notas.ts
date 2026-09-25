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
 
// console.log(fibonacciGenerator.next())    // evaluates to {value: 0, done: false} 
// console.log(fibonacciGenerator.next())    // evaluates to {value: 1, done: false}

type Reservation = {}

type Reserve = { (from: Date, to: Date, destination: string): Reservation }

//-------------------------

function filter(array: any, f: any) {  
    let result = [] 
    for (let i = 0; i < array.length; i++) { 
        let item = array[i] 
        if (f(item)) { 
            result.push(item) 
        } } 
        return result 
} 

type Filter = { <T>(array: T[], f: (item: T) => boolean): T[] }

function oldmap(array: unknown[], f:(item: unknown)=> unknown): unknown[] {
    let result = []
    for (let i =0; i< array.length; i++){
        result[i] = f(array[i])
    }

    return result
}

function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result: U[] = []
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
  return result
}

//------

// interface Array<T> {
//     filter(
//         callbackfn: (value: T, index: number, array: T[]) => any, 
//         thisArg?: any): T[] {
//         map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[]
//     }
// }