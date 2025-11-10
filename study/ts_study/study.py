class Perro():
    """Modelo sencillo de un perro"""
    def __init__(self, nombre, raza, edad):
        self.nombre = nombre
        self.raza = raza
        self.edad = edad

    def sentarse(self):
        """Simula sentarse"""
        print(self.nombre.title() + "rodo al piso")

class Persona():
    persona: str = ""