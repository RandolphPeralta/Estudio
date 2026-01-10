// Encapsulamiento

abstract class Abanico {
    abstract encender(): boolean
    abstract apagar(): boolean
    abstract velocidades(velocidad: number): void
    abstract girar(): boolean

    public cantidadDeAspas(): number{
        return 3;
    }
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

    public cantidadDeAspas(): number {
        return 5
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

    public cantidadDeAspas(): number {
        return 3
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

    public cantidadDeAspas(): number {
        return 3
    }

}

class Olimpo implements SuperAbanico{

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

    public cantidadDeAspas(): number {
        return 4;
    }

    public ControlRemoto(): boolean{
        this.encender
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

        const olimpo: SuperAbanico = new Olimpo();
        //console.log(olimpo.cantidadDeAspas())
        //console.log(samurai.cantidadDeAspas)

    }
}

Program.main([""]);
