from abc import ABC, abstractmethod

class Vehiculo(ABC):

    @abstractmethod
    def ir(self):
        pass

    @abstractmethod
    def detener(self):
        pass

class Coche(Vehiculo):
    def ir(self):
        print("Conduces el auto")

    def detener(self):
        print("Este coche esta detenido")

class Motocicleta(Vehiculo):
    def ir(self):
        print("Andas en la moto")

    def detener(self):
        print("Esta motocicleta esta detenido")

coche = Coche()
motocicleta = Motocicleta()