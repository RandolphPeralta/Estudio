def make_class(x):
    class Dog:
        def __init__(self, name):
            self.name = name 

        def print_value(self):
            print(x)
    
    return Dog

cls = make_class(10)
print(cls)
