// PROXY
// permite proporcionar un sustituto o marcador de posición para otro objeto. 

interface VideoService {
    reproducirVideo(): void
}

class VideoReal implements VideoService {

    reproducirVideo(): void {
        
    }
}

class VideoProxy implements VideoService {

    private videoReal: VideoReal

    constructor(private tienePermiso: boolean) {
        this.videoReal = new VideoReal()
    }

    reproducirVideo(): void {
        if (this.tienePermiso) {
            this.videoReal.reproducirVideo()
        } else {
            console.log("Acceso denegado")
        }
    }
}

const proxy = new VideoProxy(true)

proxy.reproducirVideo()