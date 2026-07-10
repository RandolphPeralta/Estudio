const sayHi = (name: string) => {
    console.log(`Hola ${name}`);
};

sayHi("estudiantes");

function sayGoodbye(name: string) {
    console.log(`Adios ${name}`)
}

sayGoodbye("Estudiantes");

// function show(): number{
//     console.log("Hola")
//     return 1;
//  }

// const respons = show()

interface ResponseServiceCD {
    id: number;
    name: string;
    charge: string;
    number: number;
}


const response: ResponseServiceCD = {
    id: 1,
    name: "Kevin",
    charge: "Developer",
    number:4,
};

function show({name, ...other}:ResponseServiceCD ): number {
    console.log("El id mandado es: ", name);
    console.log("Otros datos ", other);
    
    return 1;
}
