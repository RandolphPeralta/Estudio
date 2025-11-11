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

personas_encuestadas = []

while True:

    op = int(input(
        """Escoge
        1. Ingresas datos
        2. Ver listado d pesonas
        0. Salir
        : """
    ))

    if op == 0:
        break

    elif op == 1:
        nombre = input("ingrese nombre: ")
        edad = int(input("Edad: "))
        altura = float(input("Altura: "))
        genero = input("Genero: ")

        persona = Persona(nombre, edad, altura, genero)

        personas_encuestadas.append(persona)

    elif op == 2:
        for persona in personas_encuestadas:
            print(persona.nombre)