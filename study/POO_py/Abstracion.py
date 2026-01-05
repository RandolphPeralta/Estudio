# class Auto():
#     def __init__(self):
#         self._estado = "apagado"
    
#     def encender(self):
#         self._estado = "encendido"
#         print("El auto esta encendido")

#     def conducir(self):
#         if self._estado == "apagado":
#             self.encender()
#         print("Conuciendo el auto")

# mi_auto = Auto()
# mi_auto.conducir()

# Clases abstractas
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def hablar(self):
        pass

class Perro(Animal):
    def hablar(self):
        return "woolf!"

perro = Perro()
perro.hablar()
