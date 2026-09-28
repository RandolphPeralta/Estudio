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

let promise = new Promise(resolve => resolve(45))

//-------

type MyEvent<T> = { 
    target: T 
    type: string 
}

type ButtonEvent = MyEvent<HTMLButtonElement>

type TimedEvent<T> = { 
    event: MyEvent<T> 
    from: Date 
    to: Date 
}

function triggerEvent<T>(event: MyEvent<T>): void {
// ... 
} 

triggerEvent({ target: document.querySelector('#myButton'), type: 'mouseover'})

//-----------------

type TreeNode = {value: string}

type LeafNode = TreeNode & { isLeaf: true} 

type InnerNode = TreeNode & {children: [TreeNode] | [TreeNode, TreeNode] }

//----------------

type HasSides = {numberOfSides: number}

type SidesHaveLength = {sideLength: number}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength) 
    return s 
} 

function call<T extends unknown[], R>(  f: (...args: T) => R,  ...args: T ): R {  
    return f(...args) 
} 

//--------------------------

type MyEvent2<Type extends string, Target extends HTMLElement = HTMLElement,> = { 
    target: Target 
    type: Type 
}