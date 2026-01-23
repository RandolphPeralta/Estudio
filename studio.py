from abc import ABC, abstractmethod

class Enemigo(ABC):

    @abstractmethod
    def atacar(self):
        pass

class Mago(Enemigo):
    def atacar(self):
        return True

maguito = Mago()

print(maguito.atacar())