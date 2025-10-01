def deposit(balance, amount=0):
    return balance + amount

def withdraw(balance, amount=0):
    if amount > balance:
        return None
    
    return balance - amount

def default(*args, **kwargs):
    print('Lo sentimos, opcion No es valido')

options = {
    'a':deposit,
    'b': withdraw
}

option = input('Ingrese su opcion (a/b): ')
balance = int(input('Ingresa tu balance: '))
amount = int(input('Ingresa tu cantidad: '))

function = options.get(option, default)
total = function(balance, amount)
print(total)