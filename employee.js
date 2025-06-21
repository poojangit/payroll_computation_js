// Employee Payroll Application
import readline from "readline";
class EmployeePayroll {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0; // UC3 - Adding working hours property
    this.totalWage = 0; // Total wage for the month
    this.totalWorkingHours = 0; // Total working hours for the month
    this.totalWorkingDays = 0; // Total working days for the month
  }

  static displayMessage() {
    console.log("Welcome to Employee Payroll Application\n");
  }
  // Method to mark attendance randomly
  markAttendance() {
    let attendanceType = Math.floor(Math.random() * 3); //calculating random attendance and checking for full time
    switch (attendanceType) {
      case 0:
        this.attendance = "Absent"; // UC1 - Marking attendance as Absent
        this.workingHours = 0; // No working hours if absent
        break;
      case 1:
        this.attendance = "Part-Time"; // UC1 - Marking attendance as Part-Time
        this.workingHours = 4; // Assuming part-time is 4 hours
        break;
      case 2:
        this.attendance = "Full-Time"; // UC1 - Marking attendance as Full-Time
        this.workingHours = 8; // Assuming full-time is 8 hours
        break;
      default:
        break;
    }
  }
  //UC2 - For calculating daily wage based on attendance
  calculateWage(wagePerHour) {
    this.dailyWage = wagePerHour * this.workingHours; // Calculate daily wage based on working hours
    this.totalWage += this.dailyWage; //UC4- Update total wage for the month
    this.totalWorkingHours += this.workingHours; //UC4- Update total working hours for the month
    if (this.attendance !== "Absent") {
      this.totalWorkingDays++; //UC4- Increment total working days if not absent
    }
  }
  // method to display employee details
  displayDetails(day) {
    console.log(
      `Day ${day} - Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ${this.dailyWage}` // UC3 - Displaying working hours
    );
  }
  // UC4 - Display monthly summary
  displayMonthlySummary(companyName) {
    console.log(`----------------------------------------------`);
    console.log(
      `\n Monthly Summary for ${this.empName} (ID: ${this.empId}) at ${companyName} Company:`
    );
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Working Days: ${this.totalWorkingDays}`);
    console.log(`Total Wage: ₹${this.totalWage}`);
    console.log();
  }
}
class EmpWageBuilder {
  constructor(companyName, wagePerHour, maxWorkingDays, maxWorkingHours) {
    this.companyName = companyName;
    this.wagePerHour = wagePerHour;
    this.maxWorkingDays = maxWorkingDays;
    this.maxWorkingHours = maxWorkingHours;
    this.employeeeDetailsList = []; // List to store employee details
    this.totalCompanyWage = 0; // Total wage for the company
  }
  // Method to add employee details
  addEmployee(empId, empName) {
    const employee = new EmployeePayroll(empId, empName);
    this.employeeeDetailsList.push(employee);
  }
  // UC7 - Static method to compute wages for all employees
  computeWagesForCompany() {
    console.log(`\nCalculated wages for company:  ${this.companyName}\n `);

    // Mark attendance for each employee and display their details
    this.employeeeDetailsList.forEach((employee) => {
      console.log(`\n----------------------------------------------`);
      console.log(
        `Daily details of Employee : ${employee.empName} with ID: ${employee.empId}`
      );
      console.log(`----------------------------------------------`);
      let day = 1;
      while (
        day <= this.maxWorkingDays &&
        employee.totalWorkingHours < this.maxWorkingHours
      ) {
        // Loop until max working hours or days
        employee.markAttendance(); // UC1 - Mark attendance randomly
        employee.calculateWage(this.wagePerHour); //UC8 - implementing calculateWage method
        employee.displayDetails(day); // UC3 - Display daily details
        day++; // Increment day counter
      }

      employee.displayMonthlySummary(this.companyName); // UC4 - Display monthly summary
      this.totalCompanyWage += employee.totalWage; // Update total company wage
    });
    console.log(
      `Total wage for company ${this.companyName} is: ₹${this.totalCompanyWage}`
    );
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let companyList = []; // List to store company details
let totalCompanies = 0;
let currentCompany = 0;
let currentBuilder = null;
let numberOfEmployees = 0
let employeeIndex = 0;

function askTotalCompanies() {
  rl.question("How many companies you want to add?: ", (count) => {
      totalCompanies = parseInt(count);
      askCompanyDetails();
    })

  function askCompanyDetails() {
    if (currentCompany < totalCompanies) {
      console.log( `\n ---Entering details of company ${currentCompany + 1}---\n`);
      rl.question("Enter Company Name: ", (name) => {
        rl.question("Enter wage per hour: ", (wage) => {
          rl.question("Enter Max Working Days: ", (days) => {
            rl.question("Enter Max Working Hours: ", (hours) => {
              currentBuilder = new EmpWageBuilder(
                name,
                parseInt(wage),
                parseInt(days),
                parseInt(hours)
              );
              askEmployeeCount();
            });
          });
        });
      });
    } else {
      rl.close(); // Close readline interface after collecting all employee details
      startApplication(); // Start the application after collecting employee details
    }
  }

  function askEmployeeCount() {
    rl.question("How many employees you want to add?: ", (count) => {
      numberOfEmployees = parseInt(count);
      employeeIndex = 0;
      askEmployeeDetails();
    });
  }

  function askEmployeeDetails() {
    if (employeeIndex < numberOfEmployees) {
      rl.question(
        `Enter Employee ID for Employee ${employeeIndex + 1}: `,
        (empId) => {
          rl.question(
            `Enter Employee Name for Employee ${employeeIndex + 1}: `,
            (empName) => {
              currentBuilder.addEmployee(parseInt(empId), empName);
              employeeIndex++;
              askEmployeeDetails(); // Ask for next employee details
            });
        });
    } else {
      companyList.push(currentBuilder); // Add company details to the list
      currentCompany++; // Move to the next company
      askCompanyDetails(); // Ask for next company details
    }
  }
  function startApplication() {
    EmployeePayroll.displayMessage(); // Display welcome message
    companyList.forEach((builder) => {
      builder.computeWagesForCompany() // Compute wages for each company
    });
  }
}
//Entry point of the application
EmployeePayroll.displayMessage();
askTotalCompanies(); // Start asking for company details
