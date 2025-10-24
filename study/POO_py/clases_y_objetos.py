class Celular():
    def __init__(self, marca, modelo, camara):
        self.marca = marca
        self.modelo = modelo
        self.camara = camara

celular1 = Celular("Samsung", "S83", "48MP")
celular2 = Celular("Apple", "Iphone 15 pro", "96MP")

print(celular1.marca)