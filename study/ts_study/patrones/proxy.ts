// PROXY
// permite proporcionar un sustituto o marcador de posición para otro objeto. 

interface VideoService {
    reproducirVideo(): void
}

class VideoCinema implements VideoService {

    reproducirVideo(): void {
        
    }
}

class VideoProxy implements VideoService {

    private videoReal: VideoService

    constructor(private tienePermiso: boolean) {
        this.videoReal = new VideoCinema()
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