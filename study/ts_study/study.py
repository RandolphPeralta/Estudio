# Clase persona
class Persona:
    nombre = ""
    edad = 0
    altura = 0
    genero = ""

    def __init__(self, att_nombre, att_edad, att_altura, att_genero):
        self.nombre = att_nombre
        self.edad = att_edad
        self.altura = att_altura
        self.genero = att_genero

    def caminar(self):
        return f"Hola soy {self.nombre} y me encuentro caminando"


# persona1 -> Objeto     Persona() -> Clase
persona1 = Persona()
persona2 = Persona()

persona1.nombre = "Jesus"
persona2.nombre = "Juan"

print(persona1.nombre)
print(persona2.nombre)
print(persona1.caminar())