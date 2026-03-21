// VISITOR
// separa algoritmos de los objetos sobre los que operan.

interface Visitante {
    visitarCirculo(circulo: any): void;
    visitarRectangulo(rectangulo: any): void;
}

interface Forma {
    accept(visitante: Visitante): void;
}

class Circulo implements Forma {
    constructor(public radio: number) {}

    public accept(visitante: Visitante): void {
        visitante.visitarCirculo(this);
    }
}

class Rectangulo implements Forma {
    constructor(public ancho: number, public alto: number) {}

    public accept(visitante: Visitante): void {
        visitante.visitarRectangulo(this);
    }
}

class ExportarJSON implements Visitante {
    visitarCirculo(circulo: Circulo): void {
        
    }

    visitarRectangulo(rectangulo: Rectangulo): void {
        
    }
}

class CalcularArea implements Visitante {
    visitarCirculo(circulo: Circulo): void {
        Math.PI * Math.pow(circulo.radio, 2);
    }

    visitarRectangulo(rectangulo: Rectangulo): void {
        rectangulo.ancho * rectangulo.alto;
    }
}

