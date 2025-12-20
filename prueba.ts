// type guard

type alphanumeric = string | number;

function add(a: alphanumeric, b: alphanumeric ){
    if(typeof  a == "number" && typeof b == "number"){
        return a +b;
    }
}

add(5,5)