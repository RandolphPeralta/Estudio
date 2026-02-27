interface SalaryPolicy {
  calculate(): number
}

interface EmployeeRepository<T> {
  save(employee: T): boolean
  findAll(): T[]
}

//---------------------------

class Employee {
  constructor(private policy: SalaryPolicy) {}

  calculateSalary(): number {
    return this.policy.calculate()
  }
}

class EmployeeService<T extends Employee> {

  constructor(
    private repository: EmployeeRepository<T>
  ) {}

  register(employee: T): boolean {
    return this.repository.save(employee)
  }

  calculatePayroll(): number[] {
    return this.repository.findAll().map(employe => employe.calculateSalary())
  }
}

class InMemory<T> implements EmployeeRepository<T> {

  private memory: T[] = []

  save(item: T): boolean {
    this.memory.push(item)
    return true
  }

  findAll(): T[] {
    return [...this.memory]
  }
}

//----------------

class FullTimePolicy implements SalaryPolicy {

  constructor(private monthlySalary: number) {}

  calculate(): number {
    return this.monthlySalary
  }
}

class HourlyPolicy implements SalaryPolicy {

  constructor(
    private hours: number,
    private rate: number
  ) {}

  calculate(): number {
    return this.hours * this.rate
  }
}

class ContractorPolicy implements SalaryPolicy {

  constructor(private projectAmount: number) {}

  calculate(): number {
    return this.projectAmount
  }
}

class App {

}


const repository = new InMemory<Employee>()
const service = new EmployeeService(repository)

    // composición externa (Ley de Demeter + DIP)
const fullTime = new Employee(new FullTimePolicy(3000))
const hourly = new Employee(new HourlyPolicy(160, 20))
const contractor = new Employee(new ContractorPolicy(5000))

service.register(fullTime)
service.register(hourly)
service.register(contractor)

const salaries = service.calculatePayroll()

console.log("Salarios calculados:")
salaries.forEach(s => console.log(s))
