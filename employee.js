// Employee Payroll Application
import { log } from "console";
import readline from "readline";
class EmployeePayroll {
  //UC7 - Refactor the code to write class variables and methods
  static MAX_WORKING_DAYS = 20 ; 
  static MAX_WORKING_HOURS = 100;
  static WAGE_PER_HOUR = 20;

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
  calculateWage() {
    this.dailyWage = EmployeePayroll.WAGE_PER_HOUR * this.workingHours; // Calculate daily wage based on working hours
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
  displayMonthlySummary() {
    console.log(`----------------------------------------------`);
    console.log(`\n Monthly Summary for ${this.empName} (ID: ${this.empId}):`);
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Working Days: ${this.totalWorkingDays}`);
    console.log(`Total Wage for the Month: ₹${this.totalWage}`);
    console.log();
  }
  // UC7 - Static method to compute wages for all employees
  static computeWagesForAll(employeeeDetailsList) {
    // Mark attendance for each employee and display their details
    employeeeDetailsList.forEach((employee) => {
      console.log(`----------------------------------------------`);
      console.log(
        `Daily details of Employee : ${employee.empName} with ID: ${employee.empId}`
      );
      console.log(`----------------------------------------------`);
      let day = 1; // Initialize day counter

      while (
        day <= EmployeePayroll.MAX_WORKING_DAYS &&
        employee.totalWorkingHours < EmployeePayroll.MAX_WORKING_HOURS
      ) {
        // Loop until max working hours or days
        employee.markAttendance(); // UC1 - Mark attendance randomly
        employee.calculateWage(); // UC2 - Calculate daily wage based on attendance
        employee.displayDetails(day); // UC3 - Display daily details
        day++; // Increment day counter
      }

      employee.displayMonthlySummary(); // UC4 - Display monthly summary
    });
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//create employee objects
let empDetails = [];
let numberOfEmployees = 0;
let count = 0;

function askEmployeeCount() {
  rl.question("How many employees you want to add?: ", (answer) => {
    numberOfEmployees = parseInt(answer);
    askEmployeeDetails();
  });
}
function askEmployeeDetails() {
  if (count < numberOfEmployees) {
    rl.question(`Enter Employee ID for Employee ${count + 1}: `, (empId) => {
      rl.question(
        `Enter Employee Name for Employee ${count + 1}: `,
        (empName) => {
          empDetails.push(new EmployeePayroll(parseInt(empId), empName)); // Create new employee object and add to array
          count++;
          askEmployeeDetails(); // Ask for next employee details
        }
      );
    });
  } else {
    rl.close(); // Close readline interface after collecting all employee details
    startApplication(); // Start the application after collecting employee details
  }
}
function startApplication() {
    EmployeePayroll.computeWagesForAll(empDetails); // Compute wages for all employees
}
EmployeePayroll.displayMessage();
askEmployeeCount(); // Start asking for employee count
