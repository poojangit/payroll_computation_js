// Employee Payroll Application
class EmployeePayroll {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0; // UC3 - Adding working hours property
  }
 
  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
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
    const WAGE_PER_HOUR = 20;
    this.dailyWage = WAGE_PER_HOUR * this.workingHours; // Calculate daily wage based on working hours
  }
  // method to display employee details
  displayDetails() {
    console.log(
      `Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ${this.dailyWage}` // UC3 - Displaying working hours
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
  employee.calculateWage(); //UC2+UC3 Implemented calculateWage method along with part-time wage
  employee.displayDetails();
});
 