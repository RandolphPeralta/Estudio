from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from abc import ABC, abstractmethod
from typing import Generic, TypeVar
from dataclasses import fields

# from dataclasses import dataclass

@dataclass
class Student:
    id: str
    name: str
    identification: str
    schoolgrade: str

# from dataclasses import dataclass

@dataclass
class Book:
    id: str
    title: str
    author: str
    available: bool

# from dataclasses import dataclass
# from datetime import datetime
# from typing import Optional

# from domain.entities.book import Book
# from domain.entities.student import Student

@dataclass
class Loan:
    id: str
    book: Book
    student: Student
    loanDate: datetime
    returndate: Optional[datetime] = None

# from abc import ABC, abstractmethod
# from typing import Generic, TypeVar

T = TypeVar("T")

class ISave(ABC, Generic[T]):

    @abstractmethod
    def create(self, some: T) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

# from abc import abstractmethod

# from domain.interfaces.save import ISave

class IUpdate(ISave[T]):

    @abstractmethod
    def update(self, some: T) -> bool:
        pass

    @abstractmethod
    def read(self) -> list[T]:
        pass

# from abc import abstractmethod

# from domain.interfaces.update import IUpdate

class IAdditionalAction(IUpdate[T]):

    @abstractmethod
    def findbyid(self, id: str) -> list[T]:
        pass

# from abc import ABC, abstractmethod

class IView(ABC):

    @abstractmethod
    def execute(self):
        pass

# from abc import ABC, abstractmethod
# from typing import Generic, TypeVar

# T = TypeVar("T")

class IService(ABC, Generic[T]):

    @abstractmethod
    def create(self, item: T) -> bool:
        pass

    @abstractmethod
    def read(self) -> list[T]:
        pass

    @abstractmethod
    def update(self, item: T) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

# from abc import ABC, abstractmethod
# from typing import Generic, TypeVar

# T = TypeVar("T")

class IApprobation(ABC, Generic[T]):

    @abstractmethod
    def approve(self, item: T) -> bool:
        pass

# from typing import Generic, TypeVar

# from domain.interfaces.additional_action import IAdditionalAction

# T = TypeVar("T")

class MemoryRAM(IAdditionalAction[T], Generic[T]):

    def __init__(self):
        self.memory: list[T] = []

    def create(self, some: T) -> bool:

        for item in self.memory:
            if item.id == some.id:
                return False

        self.memory.append(some)

        return True

    def delete(self, id: str) -> bool:

        for index, item in enumerate(self.memory):

            if item.id == id:
                self.memory.pop(index)
                return True

        return False

    def update(self, some: T) -> bool:

        for index, item in enumerate(self.memory):

            if item.id == some.id:
                self.memory[index] = some
                return True

        return False

    def read(self) -> list[T]:
        return self.memory

    def findbyid(self, id: str) -> list[T]:

        return [
            item
            for item in self.memory
            if item.id == id
        ]
# from dataclasses import fields

# from domain.interfaces.approbation import IApprobation

class Approbation(IApprobation):

    def approve(self, item) -> bool:

        for field in fields(item):

            value = getattr(item, field.name)

            if value is None:
                return False

            if isinstance(value, str) and value == "":
                return False

        return True

# from typing import Generic, TypeVar

# from domain.interfaces.additional_action import IAdditionalAction
# from domain.interfaces.approbation import IApprobation
# from domain.interfaces.service import IService


# T = TypeVar("T")


class Service(IService[T], Generic[T]):

    def __init__(
        self,
        repository: IAdditionalAction[T],
        approbator: IApprobation[T]
    ):
        self.repository = repository
        self.approbator = approbator

    def create(self, item: T) -> bool:

        if not self.approbator.approve(item):
            return False

        return self.repository.create(item)

    def read(self) -> list[T]:

        return self.repository.read()

    def update(self, item: T) -> bool:

        if not self.approbator.approve(item):
            return False

        return self.repository.update(item)

    def delete(self, id: str) -> bool:

        return self.repository.delete(id)


class StudentConsole(IView):

    def __init__(
        self,
        studentservice: IService[Student],
        loanservice: IService[Loan]
    ):
        self.studentservice = studentservice
        self.loanservice = loanservice

    def execute(self):

        run = True

        while run:

            self.read_menu()
            option = int(input("Seleccione: "))

            match option:

                case 1:
                    self.create_student()

                case 2:
                    self.delete_student()

                case 3:
                    self.update_student()

                case 4:
                    self.read_students()

                case 0:
                    run = False

    def read_menu(self):
        options = [
            "1. Registrar estudiante",
            "2. Borrar estudiante",
            "3. Actualizar estudiante",
            "4. Mostrar estudiantes",
            "0. Salir"
        ]
        for option in options:
            print(option)

    def create_student(self):
        
            student = self.input_student()
            result = self.studentservice.create(student)
        
            print("Estudiante registrado" if result else "No se pudo registrar")

    def delete_student(self):
            
                student_id = self.input_id()
                result = self.studentservice.delete(student_id)

                active_loans = self.loanservice.read()
                student_active_loan = [loan for loan in active_loans 
                               if loan.student.id == student_id and not loan.returndate]
        
                if student_active_loan:
                    print("El estudiante está realizando préstamo, no puede ser eliminado")
                    return
            
                print("Estudiante eliminado" if result else "No se pudo eliminar")

    def update_student(self):
            
                student = self.input_student()
                result = self.studentservice.update(student)
            
                if result:
                    print("Estudiante actualizado")
                else:
                    print("No se pudo actualizar")

    def read_students(self) -> None:
        print(self.studentservice.read())

    def input_student(self) -> Student:

        id = input("ID: ")
        name = input("Nombre: ")
        identification = input("Identificación: ")
        schoolgrade = input("Grado Escolar: ")

        return Student(
            id=id,
            name=name,
            identification=identification,
            schoolgrade=schoolgrade
        )

    def input_id(self) -> id:
            id = input("ID: ")
            return id

