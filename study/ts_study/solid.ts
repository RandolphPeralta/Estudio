// Encapsulamiento

abstract class Abanico {
    abstract encender(): boolean
    abstract apagar(): boolean
    abstract velocidades(velocidad: number): void
    abstract girar(): boolean
}

interface SuperAbanico extends Abanico {
    controlRemoto(): boolean
}

class Samurai extends Abanico{

    public encender(): boolean {
        return true
    }

    public apagar(): boolean {
        return true
    }

    public velocidades(velocidad: number): void {
        const speed = velocidad;
    }

    public girar(): boolean {
        return true
    }

    public ControlRemoto(){

    }
}

// encenderConctrolRemoto(): boolean{
//        return true;
//    }

class Sanyo extends Abanico {

    public encender(): boolean {
        return true
    }

    public apagar(): boolean {
        return true
    }

    public velocidades(velocidad: number): void {
        const speed = velocidad;
    }

    public girar(): boolean {
        return true
    }

}

class KDK extends Abanico {

    public encender(): boolean {
        return true
    }

    public apagar(): boolean {
        return true
    }

    public velocidades(velocidad: number): void {
        const speed = velocidad;
    }

    public girar(): boolean {
        return true
    }

}

class Olimpo extends Abanico{

    public encender(): boolean {
        return true
    }

    public apagar(): boolean {
        return true
    }

    public velocidades(velocidad: number): void {
        const speed = velocidad;
    }

    public girar(): boolean {
        return true
    }

}

class Program {

    public static main(args: string[]): void { // 
        // correr programa

        const samurai: Abanico = new Samurai
        samurai.velocidades(5)

        const sanyo: Abanico = new Sanyo();
        sanyo.encender();

    }
}

Program.main([""]);
