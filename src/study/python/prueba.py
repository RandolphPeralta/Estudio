def combine_and_filter(lst, threshold):
    # Escribe el código aquí
    lst_correct = []
    for element in lst:
        if element > threshold:
            lst_correct.append(element)
    lst_correct.sort()
    return lst_correct

print(combine_and_filter([1, 5, 3, 2, 7, 4], 3))

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
    

