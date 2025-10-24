class Calculadora:
    def __init__(self):
        pass

    def sumar(self, num1: float, num2: float) -> float:
        return num1 + num2
    
    def restar(self, num1: float, num2: float) -> float:
        return num1 - num2

    def operacion(self, numero1, numero2):
        operacion = input("Que operacion desea: '+' ó '-' : ")
        if operacion == '+':
            return self.sumar(numero1, numero2)
        elif operacion == '-':
            return self.restar(numero1, numero2)
        else:
            return "La operacion no es ni suma ni resta"
       
calculadora = Calculadora()

numero1 = float(input("Ingrese su primer numero: "))
numero2 = float(input("Ingrese su segundo numero: "))
print(calculadora.operacion(numero1, numero2))



