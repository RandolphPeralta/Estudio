interface Person {
    name: String;
    age: number;

}

interface GetPerson {
    getName: () => string;
    getAge: () => number;
}

type Getter<T> = {
    [Property in keyof T]: () => T[Property];
}

// type GetPerson = Getter<Person>;