var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//---------------------------
var InMemory = /** @class */ (function () {
    function InMemory() {
        this.memory = [];
    }
    InMemory.prototype.save = function (item) {
        this.memory.push(item);
        return true;
    };
    InMemory.prototype.findAll = function () {
        return __spreadArray([], this.memory, true);
    };
    return InMemory;
}());
var Employee = /** @class */ (function () {
    function Employee(policy) {
        this.policy = policy;
    }
    Employee.prototype.calculateSalary = function () {
        return this.policy.calculate();
    };
    return Employee;
}());
var EmployeeService = /** @class */ (function () {
    function EmployeeService(repository) {
        this.repository = repository;
    }
    EmployeeService.prototype.register = function (employee) {
        return this.repository.save(employee);
    };
    EmployeeService.prototype.calculatePayroll = function () {
        return this.repository.findAll().map(function (employe) { return employe.calculateSalary(); });
    };
    return EmployeeService;
}());
//----------------
var FullTimePolicy = /** @class */ (function () {
    function FullTimePolicy(monthlySalary) {
        this.monthlySalary = monthlySalary;
    }
    FullTimePolicy.prototype.calculate = function () {
        return this.monthlySalary;
    };
    return FullTimePolicy;
}());
var HourlyPolicy = /** @class */ (function () {
    function HourlyPolicy(hours, rate) {
        this.hours = hours;
        this.rate = rate;
    }
    HourlyPolicy.prototype.calculate = function () {
        return this.hours * this.rate;
    };
    return HourlyPolicy;
}());
var ContractorPolicy = /** @class */ (function () {
    function ContractorPolicy(projectAmount) {
        this.projectAmount = projectAmount;
    }
    ContractorPolicy.prototype.calculate = function () {
        return this.projectAmount;
    };
    return ContractorPolicy;
}());
var repository = new InMemory();
var service = new EmployeeService(repository);
// composición externa (Ley de Demeter + DIP)
var fullTime = new Employee(new FullTimePolicy(3000));
var hourly = new Employee(new HourlyPolicy(160, 20));
var contractor = new Employee(new ContractorPolicy(5000));
service.register(fullTime);
service.register(hourly);
service.register(contractor);
var salaries = service.calculatePayroll();
console.log("Salarios calculados:");
salaries.forEach(function (salario) { return console.log(salario); });
