class Employee
{
    public Employee(string firstName, string lastName, int age, double payRate)
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

    public double CalculatePay(int hoursWorked)
    {
        // Calcular el pago aquí.
        return (payRate * (double)hoursWorked);
    }
}
