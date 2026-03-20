// PROXY
// permite proporcionar un sustituto o marcador de posición para otro objeto. 
// Un proxy controla el acceso al objeto original, 
// permitiéndote hacer algo antes o después 
// de que la solicitud llegue al objeto original.

interface VideoService {
    reproducirVideo(nombre: string): void
}

class VideoReal implements VideoService {

    reproducirVideo(nombre: string): void {
        console.log("Reproduciendo video:", nombre)
    }
}

class VideoProxy implements VideoService {

    private videoReal: VideoReal

    constructor(private tienePermiso: boolean) {
        this.videoReal = new VideoReal()
    }

    reproducirVideo(nombre: string): void {
        if (this.tienePermiso) {
            this.videoReal.reproducirVideo(nombre)
        } else {
            console.log("Acceso denegado")
        }
    }
}