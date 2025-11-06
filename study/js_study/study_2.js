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

const user = {
    name: "ryan",
    lastname: "ray",
    age: 30,
    showFullName() {
        return "Ryan Ray"
    }
}

console.log(user.showFullName());