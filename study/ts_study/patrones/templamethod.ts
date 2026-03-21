// TEMPLATE METHOD
// define el esqueleto de un algoritmo en la superclase 
// pero permite que las subclases sobrescriban pasos del 
// algoritmo sin cambiar su estructura.

abstract class GeneradorReporte {

    public generar(): void {
        this.abrirArchivo();
        this.analizarDatos();
        this.alistarArchivo();
    }

    abstract abrirArchivo(): void;
    abstract analizarDatos(): void;
    abstract alistarArchivo(): void;

}

class ReportePDF extends GeneradorReporte {

    abrirArchivo(): void { }
    alistarArchivo(): void { }
    analizarDatos(): void { }

}

class ReporteCSV extends GeneradorReporte {

    abrirArchivo(): void { }
    alistarArchivo(): void { }
    analizarDatos(): void { }

}

class EmpresaNoticias {
    constructor(private generador: GeneradorReporte) { }

    ejecutar() {
        this.generador.generar()
    }
}

const empresacaracol = new EmpresaNoticias(new ReportePDF)
empresacaracol.ejecutar()

const empresarcn = new EmpresaNoticias(new ReporteCSV)
empresarcn.ejecutar()