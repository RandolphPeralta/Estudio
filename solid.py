from abc import ABC, abstractmethod

class AutomovilBase(ABC):

    @abstractmethod
    def encender(self) -> bool:
        pass

    @abstractmethod
    def apagar(self) -> bool:
        pass

class Nissan(AutomovilBase):

    @abstractmethod
    def auto_estacionar(self) -> None:
        pass

class Toyota(AutomovilBase):

    @abstractmethod
    def auto_repararse(self) -> None:
        pass

class DisenioNissan(Nissan):

    def auto_estacionar(self) -> None:
        pass

    def encender(self) -> bool:
        return True

    def apagar(self) -> bool:
        return False

class DisenioToyota(Toyota):

    def auto_repararse(self) -> None:
        pass

    def encender(self) -> bool:
        return True

    def apagar(self) -> bool:
        return False

class Fabrica:

    def __init__(self, disenioauto: AutomovilBase):
        self.disenioauto = disenioauto

    def probar_auto(self) -> None:
        self.disenioauto.encender()
        self.disenioauto.apagar()

disenionissan = DisenioNissan()
otrodiseniotoyota: AutomovilBase = DisenioToyota()

primerauto = Fabrica(disenionissan)

