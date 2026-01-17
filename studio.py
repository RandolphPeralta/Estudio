from abc import ABC, abstractmethod

class Vehiculo(ABC):

    @abstractmethod
    def ir(self):
        pass

class Coche(Vehiculo):
    def ir(self):
        print("Conduces el auto")

class Motocicleta(Vehiculo):
    def ir(self):
        print("Andas en la moto")

vehiculo = Vehiculo()
coche = Coche()
motocicleta = Motocicleta()

vehiculo.ir()
coche.ir()
motocicleta.ir()