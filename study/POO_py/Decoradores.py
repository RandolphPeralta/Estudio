def decorador(funcion):
    def funcion_modificada():
        print("Antes de llamar la funcion")
        funcion()
        print("Despues de llamar a la funcion")
    return funcion_modificada

# def saludo():
#     print("Hola mundo")

# saludo_modificado = decorador(saludo)
# saludo_modificado()

@decorador
def saludo():
    print("Hola, como estan?")

saludo()