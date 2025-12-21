// type guard

type alphanumeric = string | number;

function add(a: alphanumeric, b: alphanumeric ){
    if(typeof  a == "number" && typeof b == "number"){
        return a +b;
    }
}

add(5,5)

// instanceof guard

class Banana {
    isTasty(): boolean {
        return true
    }
}

class Apple {
    isJuicy(): boolean {
        return true
    }
}

type Fruit = Banana | Apple;

function buyFruit(fruit: Fruit): number{
    let price = 0;

    if (fruit instanceof Banana){
        price = fruit.isTasty() ? 5: 10;
    }
    return price
}

const apple = new Apple();
buyFruit(apple)

// In guard



