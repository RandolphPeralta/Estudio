interface Person {
    name: string;
    code: string | number;
    charge: number;
    description?: string;
    sayHello: () => string;
}

let persona: Person = {
    name: "Kevin",
    code: "01",
    charge: 1,
    description: "Hola",
    sayHello: () => {
        // guadarToken();
        // tomarFoto();
        return "Hola"
    },
};

let secondPerson: Person = {
    name: "",
    code: "",
    charge: 0,
    sayHello: () => "Hola 2"
}