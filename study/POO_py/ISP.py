from abc import ABC, abstractmethod

class Trabajador(ABC):

    @abstractmethod
    def comer(self):
        pass

    @abstractmethod
    def trabajar(self):
        pass

    @abstractmethod
    def dormir(self):
        pass

