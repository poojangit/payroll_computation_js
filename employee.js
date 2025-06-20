// Employee Payroll Application
class EmployeePayroll {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0; // UC3 - Adding working hours property
    // UC4 - Monthly Wage Tracking
    this.totalWage = 0; // Total wage for the month
    this.totalWorkingHours = 0; // Total working hours for the month
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
    this.totalWage += this.dailyWage; //UC4- Update total wage for the month
    this.totalWorkingHours += this.workingHours; //UC4- Update total working hours for the month
  }
  // method to display employee details
  displayDetails(day) {
    console.log(
      `Day ${day} - Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ${this.dailyWage}` // UC3 - Displaying working hours
    );
  }
    // UC4 - Display monthly summary
    displayMonthlySummary() {
        console.log(`\n Monthly Summary for ${this.empName} (ID: ${this.empId}):`);
        console.log(`Total Working Hours: ${this.totalWorkingHours}`);
        console.log(`Total Wage for the Month: ₹${this.totalWage}`);
        console.log(`----------------------------------------------`);
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
const Working_Days = 20; // Assuming 20 working days in a month

// Mark attendance for each employee and display their details
empDetails.forEach((employee) => {
    console.log(`Daily details of Employee : ${employee.empName}`);
    for (let day = 1; day <= Working_Days; day++) {
        employee.markAttendance(); // UC1 - Mark attendance randomly
        employee.calculateWage(); // UC2 - Calculate daily wage based on attendance
        employee.displayDetails(day); // UC3 - Display daily details
    }
    employee.displayMonthlySummary(); // UC4 - Display monthly summary
    console.log("--------------------------------------------------");
    
});
 