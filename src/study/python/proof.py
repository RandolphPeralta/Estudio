def check_inventory(inventory, item):
    # Escribe el código aquí
    value = inventory[f"{item}"]
    if item in inventory:
        value = inventory[f"{item}"]
        return f"{item} is in stock. Quantity: {value}"
    else:
        return f"{item} is not in stock"

print(check_inventory({"apple":10,"banana":5,"orange":7}, 'banana'))

# my_dict = {}
# age = my_dict.get('age')
# print(age)

# recipe_book = {
#     "Pancakes": ["flour", "milk", "eggs", "sugar"],
#     "Salad": ["lettuce", "tomato", "cucumber", "olive oil"]
# }

# print(recipe_book["Pancakes"])

# recipe_book["Smoothie"] = ["banana", "milk", "honey"]

# recipe_book["Smoothie"].append("blueberries")

# print(recipe_book)

# def update_inventory(inventory_dict, item, quantity):
#     # Escribe el código aquí
#     if item in inventory_dict:
#         inventory_dict[item] += quantity
#     else:
#         inventory_dict[item] = quantity
#     return inventory_dict

# def update_employee_info(employee_dict, key, value):
#     # Escribe el código aquí
#     employee_dict[key] = value
#     return employee_dict

# info = {"city": "Paris"}
# info["city"] = "London"
# info["country"] = "UK"
# print(len(info))

# scores = {"math": 95, "science": 88}
# print(scores["history"])
# print(list((10,20,30)))
# print(list("python"))
# print(list(range(1,6)))

# def calculate_discount(price, discount_percentage):
#     # Escribe el código aquí
#     amount = price*(discount_percentage/100)
#     final_price = price - amount

#     return round(final_price, 2)

# print(calculate_discount(75.5, 10))

# print(round(4.5))
# print(round(7.892, 1))
# print(round(456.78, -1))

# for _ in range(3):
#     print(_)

# prices = input().split(",")
# for i in range(len(prices)):
#     prices[i] = int(prices[i])

# items = input().split(",")
# budget_per_item = int(input())

# affordable_items = []
# cant_afford = 0
# total_needed = 0

# for i in range(len(prices)):
#     if prices[i] <= budget_per_item:
#         affordable_items.append(items[i])
#         total_needed += prices[i]
#     else:
#         cant_afford += 1

# print("Can buy:", affordable_items)
# print("Total budget needed:", total_needed)
# print("Can't afford:", cant_afford)
#----------------------------
# def find_occurrences(text: str, pattern: str):
#     count = 0
#     positions = []

#     if pattern == "":
#         return (False, 0, [])

#     start = 0

#     while True:
#         index = text.find(pattern, start)

#         if index == -1:
#             break

#         count += 1
#         positions.append(index)

#         start = index + 1

#     return (count > 0, count, positions)

# try:
#     text = input()
#     pattern = input()
# except EOFError:
#     pass
# else:
#     result = find_occurrences(text, pattern)
#     print(result)

#-------------------------

# n = int(input())
# for i in range(1, n+1 ,2):
#     print(i*"*")

# print("Welcome to the Daily Expense Tracker!")
# print()
# print("Menu: ")
# menu = ["Add a new expense", "View all expenses", "Calculate total and average expense", "Clear all expenses", "Exit"]
# for index, element in enumerate(menu, start=1):
#     print(f"{index}. {element}")

# expenses = []
# while True:
#     option = int(input())
#     if option == 1:
#         value = float(input())
#         expenses += [value]
#         print("Expense added successfully!")
#     elif option == 2:
#         lenght_expenses = len(expenses)
#         if lenght_expenses == 0:
#             print("No expenses recorded yet.")
#         else:
#             print("Your expenses: ")
#             for index, item in enumerate(expenses, start=1):
#                 print(f"{index}. {item}")
#     elif option == 3:
#         total = 0
#         for item in expenses:
#                 total += item
#         lenght_expenses = len(expenses)
#         if lenght_expenses == 0:
#             print("No expenses recorded yet.")
#         else:
#             print(f"Total expense: {total}")
#             average = total/lenght_expenses
#             print(f"Average expense: {average}")
#     elif option == 4:
#         expenses.clear()
#         expenses == []
#         print("All expenses cleared.")
#     elif option == 5:
#         print("Exiting the Daily Expense Tracker. Goodbye!")
#         break
#     else:
#         print("Invalid choice. Please try again.")

# print("Welcome to the Daily Expense Tracker!")
# print()
# print("Menu: ")
# menu = ["Add a new expense", "View all expenses", "Calculate total and average expense", "Clear all expenses", "Exit"]
# for index, element in enumerate(menu, start=1):
#     print(f"{index}. {element}")

# expenses = []
# while True:
#     option = int(input())
#     if option == 1:
#         value = float(input())
#         expenses += [value]
#         print("Expense added successfully!")
#     elif option == 2:
#         lenght_expenses = len(expenses)
#         if lenght_expenses == 0:
#             print("No expenses recorded yet.")
#         else:
#             print("Your expenses: ")
#             for index, item in enumerate(expenses, start=1):
#                 print(f"{index}. {item}")
#     elif option == 3:
#         total = 0
#         for item in expenses:
#                 total += item
#         lenght_expenses = len(expenses)
#         average = total/lenght_expenses
#         if lenght_expenses == 0:
#             print("No expenses recorded yet.")
#         else:
#             print(f"Total expense: {total}")
#             print(f"Average expense: {average}")
#     elif option == 5:
#         print("Exiting the Daily Expense Tracker. Goodbye!")
#         break

# def not_mutual_friends(list1, list2):
#     # Escribe tu código debajo
#     lst3 = []
#     for element in list1:
#         if element not in list2:
#             lst3 += [element]
#     for element in list2:
#         if element not in list1:
#             lst3 += [element]
    
#     return lst3

# print(not_mutual_friends(["John", "Emma", "Mike", "Sarah"], ["Emma", "Tom", "Sarah", "Peter"]))

# # Divide cada cadena de entrada en una lista, usando comas como separadores
# lst1 = input().split(",")
# lst2 = input().split(",")
# # Escribe tu código a continuación
# lst3 = []
# for element in lst1:
#     if element not in lst2:
#         lst3 += [element]

# print(lst3)

# numbers = input().split()
# # Escribe tu código debajo
# new_numbers = [numbers[0]] + numbers + numbers[::-1] + [numbers[-1]]
# new_numbers = new_numbers*2
# print(new_numbers)

# #Sliging
# original_list = input().split(',')
# # Escribe tu código debajo
# list1 = original_list[2::4]
# list2 = original_list[2:-2:1]
# list3 = original_list[-1::-2]
# list4 = original_list[:3] + original_list[-3:]


# # No cambies nada debajo de esta línea
# print("List 1:", list1)
# print("List 2:", list2)
# print("List 3:", list3)
# print("List 4:", list4)

# lst = input().split(",")
# # Escribe tu código a continuación
# middle = len(lst)//2
# print(lst[1::3])
# print(lst[5::-1])
# print(lst[middle::2])

# input_list = input().split(', ')
# # Escribe tu código a continuación
# lenght = len(input_list)
# new_input_list = []
# if lenght >= 5:
#     new_input_list = input_list[:2] + input_list[-2:]
# else:
#     new_input_list.append(input_list[0])
#     new_input_list.append(input_list[-1])

# print(new_input_list)

# lst = input().split(",")
# # Escribe tu código a continuación
# new_lst = []
# length = len(lst)
# middle = length//2
# if len(lst) % 2 == 0:
#     new_lst = lst[middle-1:middle+1]
# elif len(lst) %2 != 0:
#     new_lst = lst[middle-1: middle+2]
#     new_lst.sort()
# else:
#     new_lst.append(lst[middle]) 

# print(new_lst)

# numbers = input()
# prefix = input()

# list_numbers = numbers.split()
# new_numbers = " ".join([prefix + num for num in list_numbers])
# print(new_numbers)

# text = input()
# delimiter = input()
# # Escribe tu código debajo
# list_text = text.split()
# new_text = delimiter.join(list_text)
# print(new_text)

# text = input()
# # Escribe tu código debajo
# count = 0
# for char in text:
#     char_lower = char.lower()
#     if char_lower == "s":
#         count += 1

# print(count)

# text = input()
# # Escribe tu código a continuación
# # Pista: Para ignorar las diferencias entre mayúsculas y minúsculas, puedes convertir los caracteres a minúsculas con el método .lower().
# # Ejemplo: char.lower()
# count = 0
# for char in text:
#     char_lower = char.lower()
#     if char_lower == "p":
#         count += 1
# print(count)

# lst = input().split()
# # Escribe tu código debajo
# new_lst = []
# for index, word in enumerate(lst):
#     numword = len(word)
#     if numword>3 or word.startswith("a"):
#         new_lst.append(index)
# print(new_lst)

# lst = list(map(int, input().split(",")))
# # Escribe tu código debajo
# new_lst = []
# for index, num in enumerate(lst):
#     if num % 5 == 0 or num < 50:
#         new_lst.append(index)
    
# print(new_lst)

# numbers = input().split(',')
# sum = 0
# for number in numbers:
#     if int(number) % 2 == 0:
#         sum += int(number)

# print(sum)

# def reverse(lst):
#     # Escribe el código aquí
#     lst_reverse = []
#     for i in range(len(lst)):
#         lst_reverse.append(lst[len(lst)-i-1])
#     return lst_reverse

# print(reverse([1,2,3]))

# def combine_and_filter(lst, threshold):
#     # Escribe el código aquí
#     lst_correct = []
#     for element in lst:
#         if element > threshold:
#             lst_correct.append(element)
#     lst_correct.sort()
#     return lst_correct

# print(combine_and_filter([1, 5, 3, 2, 7, 4], 3))

# def merge(lst1, lst2):
#     # Escribe el código aquí
#     lstmerge = []
#     for element1 in lst1:
#         lstmerge.append(element1)
#     for element2 in lst2:
#         lstmerge.append(element2)
#     lstmerge.sort()
#     return lstmerge

# print(merge([1], [2]))

# lst = [1,2,3,4]

# def sum_elements(lst):
#     # Escribe el código aquí
#     sum = 0
#     for i in range(len(lst)):
#         sum += lst[i]
#     print(sum)

# sum_elements(lst)

# def values(lst):
#     # Escribe el código aquí
#     for i in range(len(lst)):
#         print(lst[i])

# values(lst)

# print("Welcome to FizzBuzz!")
# n = int(input())

# def fizzbuzz(num: int):
#     for i in range(1, num + 1):
#         if i % 3 == 0 and i % 7 == 0:
#             print("FizzBuzz")
#         elif i % 3 == 0:
#             print("Fizz")
#         elif i % 7 == 0:
#             print("Buzz")
#         else:
#             print(i)

# fizzbuzz(n)


# n = int(input())

# def sigma(n: int) -> int:
#     total = 0

#     for i in range(1, n + 1):
#         total += i

#     return total

# print(sigma(n))

# result = 0
# for i in range(1,n+1):
#     a = int(input())
#     result += a
# print(result)

# numb = int(input())
# result = 1

# for i in range(1, numb+1):
#     result *= i

# print(result)

# num1 = int(input())
# num2 = int(input())

# for i in range(num1, num2):
#     if i >= 5 and i % 2 == 0:
#         print(f"First even number greater than 5: {i}")
#         break
    

# for j in range(num1, num2):
#     if j % 7 == 0:
#         print(f"First number divisible by 7: {j}")
#         break

# for i in range(5, 10):
#     if i == 7:
#         continue
#     print(i)
#     x=i*2
    

