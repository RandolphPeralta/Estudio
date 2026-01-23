from abc import ABC, abstractmethod

class Enemigo():

    @abstractmethod
    def atacar():
        pass

class Mago(Enemigo):
    def atacar():
        return True