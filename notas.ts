// VISITOR

// 1. Interfaz Visitor
interface Visitor {
    visitElementoA(el: ElementoA): void;
    visitElementoB(el: ElementoB): void;
}

// 2. Interfaz Elemento
interface Elemento {
    accept(visitor: Visitor): void;
}

// 3. Elementos Concretos
class ElementoA implements Elemento {
    accept(visitor: Visitor) { visitor.visitElementoA(this); }
    metodoA() { return "A"; }
}

class ElementoB implements Elemento {
    accept(visitor: Visitor) { visitor.visitElementoB(this); }
    metodoB() { return "B"; }
}

// 4. Visitante Concreto (ej. para reportes)
class ExportarVisitor implements Visitor {
    visitElementoA(el: ElementoA) { console.log(`Exportando ${el.metodoA()}`); }
    visitElementoB(el: ElementoB) { console.log(`Exportando ${el.metodoB()}`); }
}

// Uso
const elementos: Elemento[] = [new ElementoA(), new ElementoB()];
const visitante = new ExportarVisitor();
elementos.forEach(el => el.accept(visitante));




