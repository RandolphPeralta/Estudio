# Crea una función llamada find_occurrences que:

# Reciba dos argumentos de tipo cadena: text y pattern
# Cuente cuántas veces aparece pattern en text, incluidas las apariciones superpuestas
# Devuelva una tupla que contenga:
# Un valor booleano que indique si se encontró el patrón (True/False)
# El número de apariciones del patrón
# Una lista de las posiciones iniciales donde se encontró el patrón
# Por ejemplo, si text es "abababab" y pattern es "aba", tu función debería devolver (True, 3, [0, 2, 4]), 
# ya que "aba" aparece en las posiciones 0, 2 y 4.

# Si no se encuentra el patrón, devuelve (False, 0, []).

# La entrada se lee y se llama a tu función automáticamente.

# Acerca de la palabra clave pass: Verás pass en el código predeterminado. 
# Es una palabra clave de Python que significa "no hacer nada" y se usa como marcador 
# de posición cuando Python requiere un bloque de código con sangría (como dentro de una función). 
# Debes reemplazar pass por el código de tu función.

# código:

def find_occurrences(text: str, pattern: str):
    count = 0
    positions = []
    
    if pattern == "":
        return (False, 0, [])

    star = 0

    while True:
        index = text.find(pattern, star)
        
        if index == -1:
            break
        
        count += 1
        positions.append(index)

        star = index + 1

    return(count >0, count, positions)

try:
	text = input()
	pattern = input()
except EOFError:
	pass
else:
	result = find_occurrences(text, pattern)
	print(result)