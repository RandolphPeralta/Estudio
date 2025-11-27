interface Firma {
    firma(): void
}

abstract class ClaseAbstracta implements Firma {
    private atributo: Object;

    constructor(atributo: Object){
        this.atributo = atributo
    }
    
    firma(): void {
        console.log("Esta es su firma")
    }
}

class Clasehija extends ClaseAbstracta {
    // Cualquier cosa
}

const objeto = new Clasehija("ASD")