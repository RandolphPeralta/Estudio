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

//-------

let set = new Set 
set.add(1).add(2).add(3) 
set.has(2) // true 
set.has(4) // false

//.........

interface Food { 
    calories: number 
    tasty: boolean 
} 

interface Sushi extends Food { salty: boolean } 
interface Cake extends Food { sweet: boolean } 

//-----

interface MyMap<K, V> { 
  get(key: K): V 
  set(key: K, value: V): void 
}

type ClassConstructor = new(...args: any[]) => {}  

function withEZDebug<C extends ClassConstructor>(Class: C) {  
    return class extends Class {  
        constructor(...args: any[]) {
            super(...args)  } } 
}

//---------------------

// @serializable 
// class APIPayload { 
//     getValue(): Payload { 
//         // ... } 
// }

type Shoe = { 
  purpose: string 
  walk(): void
} 
 
class BalletFlat implements Shoe {
  walk(): void {
      throw new Error("Method not implemented.")
  } 
  purpose = 'dancing' 
} 

//----

// An existing user that we got from the server 
type ExistingUser = { 
    id: number 
    name: string 
} 
// A new user that hasn't been saved to the server yet 
type NewUser = { 
    name: string 
}

let existingUser: ExistingUser = { 
    id: 123456,
    name: 'Ima User' 
}

//----------------

const x: string = 'x'               
let y = 3                 
var z = true              
// string 
// number 
// boolean 
const d = {x: 3}          // {x: number} 
enum E {x, y, z} 
let e = E.x    

type UserTextEvent = {type: 'TextEvent', value: string, target: HTMLInputElement} 
type UserMouseEvent = {type: 'MouseEvent', value: [number, number], target: HTMLElement} 
 
type UserEvent = UserTextEvent | UserMouseEvent 
 
function handle(event: UserEvent) { 
  if (event.type === 'TextEvent') { 
    event.value  // string 
    event.target // HTMLInputElement 
    // ... 
    return 
  } 
  event.value    // [number, number] 
  event.target   // HTMLElement 
} 

//-------------

type APIResponse = { 
  user: { 
    userId: string 
    friendList: { 
      count: number 
      friends: { 
        firstName: string 
        lastName: string 
      }[] 
    } 
  } 
}

function getAPIResponse(): Promise<APIResponse> { 
  return Promise.resolve({
    user: {
      userId: "12345",
      friendList: {
        count: 2,
        friends: [
          { firstName: "Ana", lastName: "Pérez" },
          { firstName: "Carlos", lastName: "Gómez" }
        ]
      }
    }
  });
}

let response = getAPIResponse() 

//-----------keyof--

function get< O extends object, K extends keyof O >(o: O, k: K): O[K] {  
  return o[k] 
}

type ActivityLog = { 
  lastEvent: Date 
  events: { 
    id: string 
    timestamp: Date 
    type: 'Read' | 'Write' 
  }[] 
} 

type Get = {  
  < O extends object, K1 extends keyof O>(o: O, k1: K1): O[K1]  
  < O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(o: O, k1: K1, k2: K2): O[K1][K2]  
  < O extends object, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3]  
} 

//---------Record------

type Record<K extends keyof any, T> = {[P in K]: T}

type Account = { 
  id: number 
  isEmployee: boolean 
  notes: string[] 
}

// Make all fields optional 
type OptionalAccount = {[K in keyof Account]?: Account[K]} 

// Make all fields nullable 
type NullableAccount = {[K in keyof Account]: Account[K] | null} 

type ReadonlyAccount = {readonly [K in keyof Account]: Account[K]}

type Account2 = { -readonly [K in keyof ReadonlyAccount]: Account[K]}

type Account3 = {[K in keyof OptionalAccount]-?: Account[K]}

const randolph: Readonly<Object> = ""

//-------Companion Object Pattern----

type Currency = { 
  unit: 'EUR' | 'GBP' | 'JPY' | 'USD' 
  value: number 
} 
// let Currency = { 
//   DEFAULT: 'USD', 
//   from(value: number, unit = Currency.DEFAULT): Currency { 
//     return {unit, value} 
// } 
// }

//-----------

let ar: any = [1, true] 

//-----

function isString(a: unknown): boolean { 
  return typeof a === 'string' 
} 

isString('a') // evaluates to true 
isString([7]) // evaluates to false

//-----

type ToArray<T> = T[] 
type A = ToArray<number>          // number[] 
type B = ToArray<number | string> // (number | string)[]

type ToArray2<T> = T extends unknown ? T[] : T[] 
type C = ToArray2<number> // number[] 
type D = ToArray2<number | string> // number[] | string[] 

type Without<T, U> = T extends U ? never : T

type ElementType<T> = T extends unknown[] ? T[number] : T 
type FA = ElementType<number[]> // number

type ElementType2<T> = T extends (infer U)[] ? U : T 

//-----------------------

type AB = number | string
type BC =  string 
type CD = Exclude<AB, BC>  // number