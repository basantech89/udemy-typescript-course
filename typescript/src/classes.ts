abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = []

  constructor(protected readonly id: string, public name: string) {}
  
  abstract describe(this: Department): void

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployees() {
    console.log(this.employees);    
  }

  static createEmployee(name: string) {
    return { name }
  } 
}

class ITDepartment extends Department {
  private admins: string[]

  constructor(id: string, admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

const it = new ITDepartment('3443', ['Max'])
it.describe()

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountingDepartment('Accounting - 1', [])
    }
    return this.instance
  }

  describe() {
    console.log(`Accounting Department: ID - ${this.id}`);
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No Report Found.')
  } 

  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(report)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports);
    
  }

  addEmployee(employee: string) {
    if (employee === 'Max') {
      return
    }
    this.employees.push(employee)
  }
}

const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()
console.log(accounting, accounting2);

console.log(Department.createEmployee('Max'), Department.fiscalYear)
accounting.addEmployee('Max')
accounting.addEmployee('Manu')
accounting.printEmployees()
accounting.mostRecentReport = 'Year end report'
accounting.addReport('A sample report.')
accounting.printReports()
console.log(accounting.mostRecentReport)
accounting.describe()