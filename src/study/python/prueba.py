n = int(input())

def sigma(n: int) -> int:
    total = 0

    for i in range(1, n + 1):
        total += i

    return total

print(sigma(n))

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
    

