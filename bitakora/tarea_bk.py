#clase de diseño
class Calculadora:
    def __init__(self):
        pass

    def sumar(self, num1: float, num2: float) -> float:
        return num1 + num2
    
    def restar(self, num1: float, num2: float) -> float:
        return num1 - num2
    
#Instancia concreta
calculadora = Calculadora()

#Ejemplo de uso
numero1 = float(input("Ingrese su primer numero: "))
numero2 = float(input("Ingrese su segundo numero: "))
  
print(calculadora.sumar(numero1, numero2))