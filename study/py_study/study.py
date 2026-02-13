# Abstract class: A class that cannot be instantiated
#                 on its own; Meant to be subclassed.
#                 They can contain abstract methods, which
#                 declared but have no implementation.
#                 Abstract classes benefits:
#                 1. Prevents insantiation of the class itself
#                 2. Requires children to use inherited 
#                    abstract methods

from abc import ABC, abstractmethod

class Vehicle(ABC):

    @abstractmethod
    def go(self):
        pass
    
    @abstractmethod
    def stop(self):
        pass

vehicle = Vehicle()
