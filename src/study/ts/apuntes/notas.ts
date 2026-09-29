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

//-----------CHESS---------

type Color = 'Black' | 'White' 
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' 
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// A set of coordinates for a piece 
class Position { 
    constructor(private file: File,  private rank: Rank ) {} 

    distanceFrom(position: Position) { 
        return { rank: Math.abs(position.rank - this.rank), 
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)) 
    } 
  } 
} 

// A chess piece 
class Piece { 
    protected position: Position  
    constructor(private readonly color: Color,  file: File, rank: Rank ) { 
        this.position = new Position(file, rank)    
    } 
}

class King extends Piece { 
  canMoveTo(position: Position) { 
    let distance = this.position.distanceFrom(position) 
    return distance.rank < 2 && distance.file < 2 
  } 
} 

class Queen extends Piece {}
class Bishop extends Piece {} 
class Knight extends Piece {} 
class Rook extends Piece {} 
class Pawn extends Piece {}

// Represents a chess game 
class Game { 
  private pieces = Game.makePieces() 
 
  private static makePieces() { 
    return [ 
 
      // Kings 
      new King('White', 'E', 1), 
      new King('Black', 'E', 8), 
 
      // Queens 
      new Queen('White', 'D', 1), 
      new Queen('Black', 'D', 8), 
 
      // Bishops 
      new Bishop('White', 'C', 1), 
      new Bishop('White', 'F', 1), 
      new Bishop('Black', 'C', 8), 
      new Bishop('Black', 'F', 8), 
 
      // ... 
    ] 
  } 
}