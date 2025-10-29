from abc import ABC, abstractclassmethod
class Persona(ABC):
    @abstractclassmethod
    def __init__(self, nombre, edad, sexo):
        self.nombre = nombre
        self.edad = edad
        self.sexo = sexo

    @abstractclassmethod
    def hacer_actividad(self):
        pass

    def presentarse(self):
        print(f"Hola me llamo: {self.nombre} y tengo {self.edad} años")

class Estudiante(Persona):
    def __init__(self, nombre, edad, sexo, actividad):
        super().__init__(nombre, edad, sexo, actividad)
    
    def trabajar(self):
        pass

#dalto = Persona("Lucas", 21, "Masculino", "Programador")

#dalto.hacer_actividad()