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
// function Person() {
//     this.name = ""
//     this.lastname = ""
//     this.age = 0
//     this.showFullNam = function () {
//         return `${this.name} ${this.lastname}`
//     }
// }

// const users2 = new Person()
// console.log(users2)

// prototype

// function Person(name, lastname){
//     this.name = name
//     this.lastname = lastname
//     this.displayNone = function(){
//         return `${this.name} ${this.lastname}`
//     }
// }

// const john = new Person("John", "Mcmilian")
// john.name = "Joo"
// console.log(john.displayNone())

// const mario = new Person("Mario", "Rossi")
// console.log(mario.displayNone())

// john.groot = function() {
//     return `Hello I'am ${this.name}`
// }

// console.log(john)

// class Person {

//     constructor(name, lastname) {
//         this.name = name
//         this.lastname = lastname
//     }

//     greet() {
//     return `Hello i am ${this.name} ${this.lastname}`
//     }
// }

// const user = new Person("John", "Ray");
// const user2 = new Person("Ryan", "Ray");

// console.log(user);
// console.log(user2);


// const company = {
//     name: "fazt teach",
//     employess: []
// }

// // Asociacion

// class Person {
//     constructor(name, lastname){
//         this.name = name
//         this.lasname = lastname
//     }
// }

// const john = new Person("john", "say");
// const maria = new Person("maria", "perez")

// // asociation - relation
// maria.parent = john

// // agregation
// company.employees.push(john);
// company.employees.push(maria);

// console.log(maria);
// console.log(john)

// composition

// const person = {
//     name: "ryan",
//     lastname: "ray",
//     address: {
//         street: "123 bakeI street",
//         city: "London",
//         country: "unitd kingdom"
//     }
// }

// Encapsulation
// const company = {
//     name: "fazt tech",
//     employees: [],
//     sortEmployees: function() {}
// }

// company.sortEmployees = "asdsasdsas"

// company.sortEmployees() // Va a parecer un error

function Company(name){
    let employees = []
    this.name = name

    this.getEmployees = function(){
        return employees
    }

    this.addEmployee = function(employee) {
        employees.push(employee)
    }
}

const company = new Company("coca cola")
const company2 = new Company("pepsi")

console.log(company)
console.log(company2)

company.addEmployee({name: "ryan"})
company2.addEmployee({name: "joe"})

console.log(company.getEmployees())
console.log(company2.getEmployees())
