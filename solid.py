# SRP - Una clase o modulo debe tener 
# una y solo una razon para cambiar

class User:
    def __init__(self, name: str):
        self.name = name
    

user = User()