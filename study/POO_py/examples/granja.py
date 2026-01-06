from abc import ABC, abstractmethod
from typing import List

class Animal(ABC):

    def __init__(self):
        self.estomago: List = []

    @abstractmethod
    def hacer_sonido(self) -> str:
        pass

    @abstractmethod
    def comer(self, algo):
        pass

class Peligroso(Animal):

    @abstractmethod
    def atacar(self, animal: Animal) -> bool:
        pass

class Perro(Animal):

    def hacer_sonido(self):
        return "Guau"

    def comer(self, algo):
        self.estomago.append(algo)

class Pollo(Animal):

    def hacer_sonido(self):
        return "Pio"

    def comer(self, algo):
        self.estomago.append(algo)

class Pez(Animal):

    def hacer_sonido(self):
        return "Glu"

    def comer(self, algo):
        self.estomago.append(algo)

class Granja:

    def __init__(self):
        self.animales: List[Animal] = []

    def agregar_animal(self, animal: Animal):
        self.animales.append(animal)

    def mostrar_animales(self):
        for animal in self.animales:
            print(animal.hacer_sonido())

    def alerta(self, depredador: Peligroso, victima: Animal):
        return "¡Nos atacan los animales!"
    
class Gavilan(Peligroso):

    def __init__(self):
        self.estomago: List = []

    def hacer_sonido(self):
        return "Aaaa"

    def comer(self, animal: Animal):
        self.estomago.append(animal)

    def atacar(self, animal: Animal) -> bool:
        self.comer(animal)
        return True

finca = Granja()

pollo = Pollo()
pez = Pez()
gavilan = Gavilan()

finca.agregar_animal(pollo)
finca.agregar_animal(pez)

finca.mostrar_animales()

gavilan.comer(pollo)
gavilan.comer(pez)
