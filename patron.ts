// SINGLETON
// Garantiza que solo exista una instancia 
// de una clase, proveyendo un acceso global 
// a esa única instancia.

class Excalibur {
    private static instance: Excalibur | null = null;

    private constructor(){}

    public static getInstance(): any {
        if (!Excalibur.instance) {
            Excalibur.instance = new Excalibur();
            console.log("Se ha forjado la legendaria espada!")
        }

        return Excalibur.instance;
    }

    public portarEspada(): void {
        console.log("El elegido empuña la legendaria espada Excalibur!")
    }
}

const espadaReyArturo = Excalibur.getInstance();