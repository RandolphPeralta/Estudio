class Animal {
    public name: string = "Generic animal";
    private age = 10;
    protected identity = "111"

    constructor(){}

    sayHi(){
        console.log("Grr", this.age)
    }
}

class Dog extends Animal {
    //type: "Pastor Aleman"; // Aqui sale error
    sayHi(){
        this.identity;
    }
}

const myAnimal: Animal = new Animal();