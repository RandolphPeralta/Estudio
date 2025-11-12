class Estudiante:
    identificacion: str
    nombre: str
    edad: int
    semestre: int
    notas: list

    def __init__(self, att_identificacion, att_nombre, att_edad, att_semestre, att_notas):
        self.identificacion: str = att_identificacion
        self.nombre: str = att_nombre
        self.edad: int = att_edad
        self.semestre: int = att_semestre
        self.notas: list = att_notas

    def obtener_promedio(self):
        if not self.notas:
            return 0 
        return sum(self.notas)/len(self.notas)

    def ver_info(self):
        promedio = self.obtener_promedio()
        print( (f"Identificacion: {self.identificacion} \n Nombre: {self.nombre}\n Edad: {self.edad}\n Semestre: {self.semestre}\n Promedio de Notas: {promedio}\n"))

estudiantes: list[Estudiante] = []

while True:

    op = int(input(
        """Escoge
        1. Ingresas datos
        2. Ver promedio de un estudainte
        3. Ver informacion de un estudiante
        0. Salir
        : """
    ))

    if op == 0:
        break

    if op == 1:
        identificacion = input("Ingrese su ID: ")
        nombre = input("ingrese nombre: ")
        edad = int(input("Edad: "))
        semestre = float(input("Semestre: "))

        notas = []
        for i in range(3):
            notas.append(float(input(f"Ingrese la nota {i+1}: ")))

        estudiante = Estudiante(identificacion, nombre, edad, semestre, notas)

        estudiantes.append(estudiante)

    elif op == 2 or op == 3:
        identificacion = input("Ingrese ID: ")

        for estudiante in estudiantes:
            if estudiante.identificacion == identificacion and op == 2:
                estudiante.obtener_promedio()

            elif estudiante.identificacion == identificacion and op == 3:
                estudiante.ver_info()

    else:
        print("Opcion incorrecta")
