
class TanqueCombustible:
    def __init__(self):
        self.combustible = 100

    def agregar_combustible(self, cantidad):
        self.combustible += cantidad

    def obtener_combustible(self):
        return self.combustible
    
    def usar_combustible(self, cantidad):
        self.combustible -= cantidad

class Auto():
    def __init__(self, tanque):
        self.posicion = 0
        self.tanque = tanque

    def mover(self, distancia):
        if self.tanque.obtener_combustible() >= distancia / 2:
            self.posicion += distancia
            self.tanque.usar_combustible(distancia/2)
            return f"Haz movido el auto exitosamente"
        else:
            return f"No hay suficiente combustible"

    def obtener_posicion(self):
        return self.posicion

tanque = TanqueCombustible()
autito = Auto(tanque)

print(autito.obtener_posicion())
print(autito.mover(10))
print(autito.obtener_posicion())
print(autito.mover(20))
print(autito.obtener_posicion())
print(autito.mover(30))
print(autito.obtener_posicion())