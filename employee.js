// Employee Payroll Application
class EmployeePayroll {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
  }
  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
  }
  // Method to mark attendance randomly
  markAttendance() {
    let isPresent = Math.floor(Math.random() * 2);
    this.attendance = isPresent ? "Present" : "Absent";
  }
  // method to display employee details
  displayDetails() {
    console.log(
      `Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}`
    );
  }
}
const employeePayroll = new EmployeePayroll();
employeePayroll.displayMessage();
//create employee objects
let empDetails = [
  new EmployeePayroll(11, "Pooja"),
  new EmployeePayroll(41, "Deepika"),
  new EmployeePayroll(12, "Lakshmi"),
];
// Mark attendance for each employee and display their details
empDetails.forEach((employee) => {
  employee.markAttendance();
  employee.displayDetails();
});
