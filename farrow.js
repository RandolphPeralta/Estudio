const sumar = (a, b) => a + b;
console.log(sumar(5, 3)); 

const saludar = () => "Hola mundo";
console.log(saludar());

const cuadrado = x => x * x;
console.log(cuadrado(4));

const sumarMultiplicar = (a, b) => {
    const suma = a + b;
    return suma * 2;
};
console.log(sumarMultiplicar(2, 3));