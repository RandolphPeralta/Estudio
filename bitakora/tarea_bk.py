class Calculadora:
    def __init__(self):
        pass

    def sumar(self, num1: float, num2: float) -> float:
        return num1 + num2
    
    def restar(self, num1: float, num2: float) -> float:
        return num1 - num2
    
calculadora = Calculadora()

numero1 = float(input("Ingrese su primer numero: "))
numero2 = float(input("Ingrese su segundo numero: "))

operacion = input("Que operacion desea: '+' ó '-' : ")

if operacion == '+':
    print(calculadora.sumar(numero1, numero2))
elif operacion == '-':
    print(calculadora.restar(numero1, numero2))
else:
    print("La operacion no es ni suma ni resta")