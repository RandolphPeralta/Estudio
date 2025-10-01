from pytube import YouTube

url = "https://www.youtube.com/watch?v=ebJ_2E10zfU"

try: 
    video = YouTube(url)
except:
    print("Error de conexion")

download_video = video.streams.get_by_resolution("720")

try:
    download_video.download('.')
except:
    print("Se presento un error en la descagra")

print("Se termino el proceso")