//Pruebas con genericos

interface MyGenericInterface<T, U>{
    myGenericType: T | U
}

const example: MyGenericInterface<string, number| boolean> = {
    myGenericType: true
}

function getValue<T>(value: T){
    console.log(value)
}

getValue<number>(28)

const getValueV2 = <T>(value: T) => {
    console.log(value)
}

type MyGenericType<T,U> = {
    myGenericType: T |U
}

class GenericClass<T>{
    value!: T;
    constructor(value: {new(): T}){
        this.value = new value();
    }
}

class Rodri {
    public name: string = 'Rodri';
    public age: number = 28
}

class Maria {
    public nameMaria: string = 'Rodri'
    public ageMaria: number = 28
}

class Greet extends GenericClass<Rodri>{
    constructor(){
        super(Rodri)
    }

    public great(): void{
        console.log(`Hello, ${this.value.name}`)
    }
}