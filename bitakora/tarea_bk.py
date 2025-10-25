class Calculadora:
    def __init__(self, num1, num2):
        self.num1 = num1
        self.num2 = num2

    def sumar(self, num1: float, num2: float) -> float:
        return num1 + num2
    
    def restar(self, num1: float, num2: float) -> float:
        return num1 - num2

    def operacion(self, num1, num2):
        operacion = input("Que operacion desea: '+' ó '-' : ")
        if operacion == '+':
            return self.sumar(num1, num2)
        elif operacion == '-':
            return self.restar(num1, num2)
        else:
            return "La operacion no es ni suma ni resta"
       
numero1 = float(input("Ingrese su primer numero: "))
numero2 = float(input("Ingrese su segundo numero: "))

calculadora = Calculadora(numero1, numero2)

print(calculadora.operacion(numero1, numero2))



