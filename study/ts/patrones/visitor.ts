// VISITOR
// separa algoritmos de los objetos sobre los que operan.

interface Visitor {
    visitLibro(libro: any): void
    visitElectronico(eletrico: any): void
}

interface Elemento {
    accept(visitor: Visitor): void
}

class Libro implements Elemento {

    accept(visitor: Visitor): void {
        visitor.visitLibro(this)
    }
}

class Electronico implements Elemento {

    accept(visitor: Visitor): void {
        visitor.visitElectronico(this)
    }
}

class DescuentoVisitor implements Visitor {

    visitLibro(libro: Libro): void {
        
    }

    visitElectronico(e: Electronico): void {
        
    }
}

const productos: Elemento[] = [
    new Libro(),
    new Electronico()
]

const visitor = new DescuentoVisitor()

productos.forEach(producto => producto.accept(visitor))