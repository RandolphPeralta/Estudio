class Persona:
    def __init__(self,nombre,edad):
        self.__nombre = nombre
        self.__edad = edad

    @property
    def nombre(self):
        return self.__nombre

dato = Persona("Lucas", 21)

nombre = dato.nombre
print(nombre)