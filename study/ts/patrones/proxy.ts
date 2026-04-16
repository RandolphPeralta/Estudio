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

    constructor(private video: VideoService) {
   
    }

    reproducirVideo(): void {
        this.video.reproducirVideo()
    }
}

const videocinema = new VideoCinema()
const proxy = new VideoProxy(videocinema)

proxy.reproducirVideo()