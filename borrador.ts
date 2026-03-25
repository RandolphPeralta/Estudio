// 1. Interfaz Visitor
interface Visitor {
    visitDocument(doc: any): void;
    visitImage(img: any): void;
}

// 2. Interfaz Element
interface Elemento {
    accept(visitor: Visitor): void;
}

// 3. Elementos Concretos
class Documento implements Elemento {
    accept(visitor: Visitor) { visitor.visitDocument(this); }
}

class Imagen implements Elemento {
    accept(visitor: Visitor) { visitor.visitImage(this); }
}

// 4. Visitante Concreto (ej. Exportar a JSON)
class JSONExportVisitor implements Visitor {
    visitDocument(doc: Document) { console.log("Exportando documento a JSON"); }
    visitImage(img: Imagen) { console.log("Exportando imagen a JSON"); }
}

// 5. Uso
const elements: Elemento[] = [new Documento(), new Imagen()];
const visitor = new JSONExportVisitor();

elements.forEach(elemento => elemento.accept(visitor));


