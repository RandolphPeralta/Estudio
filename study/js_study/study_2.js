// Programacion orientado a objetos en Javascript

// Casi todo es un objeto
// console.log(typeof "Hello word".toUpperCase());
// console.log(typeof 100);
// console.log(typeof false);

// console.log(typeof { });
// console.log(typeof [ ]);

// console.log(typeof new Date());
// console.log(typeof new RegExp());

// console.log(new Number(100));
// console.log(new String("hello world"));
// console.log(new Boolean(true));

// Objeto Literal

// console.log( {} );
// let name = "Ryan";
// let lastname 

// Metodos

// function showFullName(){
//     return "Ryan Ray"
// }

// const user = {
//     name: "ryan",
//     lastname: "ray",
//     age: 30,
//     showFullName() {
//         return this.name + " " + this.lastname
//     }
// }

// console.log(user.showFullName());

// const account = {
//     nombre: "12343212343234",
//     amount: 100,
//     deposit(quantity){
//         this.amount = this.amount + quantity
//     },
//     withdraw(quantity){
//         this.amount = this.amount - quantity
//     }
// }

// account.deposit(400);
// account.withdraw(100);
// console.log(account);

// Constructor
function Person() {
    this.name = ""
    this.lastname = ""
    this.age = 0
    this.showFullNam = function () {
        return `${this.name} ${this.lastname}`
    }
}

const users2 = new Person()
console.log(users2)