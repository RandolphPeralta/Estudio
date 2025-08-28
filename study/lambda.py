def deposit(balance, amount=0):
    return balance + amount

def withdraw(balance, amount=0):
    if amount > balance:
        return None
    
    return balance - amount

def default(*args, **kwargs):
    print('Lo sentimos, opcion NO es valido')

"""
options = {
    'a':deposit,
    'b': withdraw
}

option = input('Ingresa una opcion (a/b): ')
balance = int(input("Ingresa tu balance: "))
amount = int(input("Ingresa tu cantidad: "))

funtion = options.get(option, default)
total = function(balance, amount)
print(total)
"""


"""
lambda <parametros>: <body> #Siempre retornan un valor. 
"""

add = lambda number1, number2=0: number1 + number2 #return

print(add(10))
#print(add(number1=10, number2=20))