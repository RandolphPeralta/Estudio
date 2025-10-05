// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

//string libro = "El progamador pragmatico";
//int entero = 100;
//float numDECIMAL = 1.9864567865;
//bool autorizado = true;
//bool seleccionado = false;

//Console.WriteLine(libro);

//int[] numeros = {23, 45, 11, 156, 99 };
//Console.WriteLine(numeros[0]);

//List<int> numeros = new List<int>{ 23, 45, 16, 37, 3, 99, 22 };
//Console.WriteLine(numeros[0]);
//Console.WriteLine(string.Join(",", numeros));

using System;

class Employee
{
    public Employee(string firstName, string lastName,
                    int age, double payRate)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.payRate = payRate;
    }

    protected string firstName;
    protected string lastName;
    protected int age;
    protected double payRate;

    public virtual double CalculatePay(int hoursWorked)
    {
        Console.WriteLine("Employee.CalculatePay");
        return 42; // Valor imaginario
    }
}

class SalariedEmployee : Employee
{
    public SalariedEmployee(string firstName, string lastName,
                            int age, double payRate)
        : base(firstName, lastName, age, payRate) {}

    public override double CalculatePay(int hoursWorked)
    {
        Console.WriteLine("SalariedEmployee.CalculatePay");
        return 42; // Valor imaginario
    }
}

class ContractorEmployee : Employee
{
    public ContractorEmployee(string firstName, string lastName,
                              int age, double payRate)
        : base(firstName, lastName, age, payRate) {}

    public override double CalculatePay(int hoursWorked)
    {
        Console.WriteLine("ContractorEmployee.CalculatePay");
        return 42; // Valor imaginario
    }
}


class Program
{
    static void Main()
    {
        Employee e1 = new SalariedEmployee("Juan", "Pérez", 30, 5000);
        Employee e2 = new ContractorEmployee("Ana", "Gómez", 25, 200);

        // Aunque las variables son del tipo base Employee,
        // en ejecución se llama al método correcto
        e1.CalculatePay(40);  // Imprime: SalariedEmployee.CalculatePay
        e2.CalculatePay(40);  // Imprime: ContractorEmployee.CalculatePay
    }
}


