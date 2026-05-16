// Toca colocar otro ejemplo

// Global scope ó Modulo Scope
// Local Scope o Function Scope
// Block Scope

// Scope 

// Global
var username = "Tzuzul"
function sayHi(){

    // Local o Function Scope
    var username = "Code" // variable local
    console.log(username)
    // block scope: let y const
    if(true){
        let fullname = "Tzuzul code"
        console.log(fullname)
    }

    console.log(fullname)

    const sayGoodBye = () => {
        console.log("God bye");
    } // Const y let no hacen hoisting

    sayGoodBye() // Hoisting -> elevacion

}

sayHi();

//Closures
function greet(fname){
    //Function Scope
    let greeting = "Welcome! " + fname //Local variable
    let message = function(){
        //Function Scope
        console.log(gretting);
    }
    return message
}

let sayHello = greet("Tzuzul");
sayHello
