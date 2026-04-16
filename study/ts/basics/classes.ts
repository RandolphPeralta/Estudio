class Animal {
    public name: string = "Generic animal";
    private age = 10;
    protected identity = "111"

    sayHi(){
        console.log("Grr", this.age)
    }
}

class Dog extends Animal {
     // Aqui sale error cuando colocamos un tipo
}

const myAnimal: Animal = new Animal();
myAnimal.sayHi();

const mnyDog: Dog = new Dog();
mnyDog.name