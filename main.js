#! \usr\bin\env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // initialize an empty array for course
        this.balance = 1000;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(chalk.yellow.bold(`Balance for ${chalk.cyanBright(this.name)} : $${chalk.cyanBright(this.balance)}`));
    }
    // Method to pay a student fee
    pay_fee(amount) {
        //if(this.balance >= amount){
        this.balance -= amount;
        console.log(chalk.magentaBright.bold(`$${chalk.yellowBright(amount)} Fees, Paid successfully for ${chalk.yellowBright(this.name)}.`));
        console.log(chalk.yellowBright.bold(`Remaining Balance is: $${chalk.cyanBright(this.balance)}`));
    }
    //else{
    //console.log(`Payment failed for ${this.name}. Insufficient balance.`);
    //}
    // Method to show a student's status
    show_status() {
        console.log(chalk.magentaBright.bold(`ID: ${chalk.yellow(this.id)}`));
        console.log(chalk.magentaBright.bold(`Name: ${chalk.greenBright(this.name)}`));
        console.log(chalk.magentaBright.bold(`Courses: ${chalk.redBright(this.courses)}`));
        console.log(chalk.magentaBright.bold(`Balance: ${chalk.blueBright(this.balance)}`));
    }
}
// Class to manage student data
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.greenBright.bold(`Student: ${chalk.magentaBright.bold(name)} added successfully with ID: ${chalk.magentaBright.bold(student.id)}`));
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.greenBright.bold(`${chalk.magentaBright.bold(student.name)} enrolled successfully for ${chalk.magentaBright.bold(course)} Course:`));
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.redBright(`Student not found. Please enter a valid ID.`));
        }
    }
    // Method to pay a student fee
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log(chalk.redBright(`Student not found. Please enter a valid ID.`));
        }
    }
    // Method to show a student's status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main function to run the program
async function main() {
    //Title Description
    console.log(chalk.bold.magentaBright.italic("\n \t\tStudent Management System Project"));
    console.log(chalk.yellowBright("*".repeat(60)));
    let student_manager = new Student_manager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Select an option:",
                choices: [
                    "Add Student",
                    "Enroll Student in Course",
                    "View Student Balance",
                    "Pay Student Fee",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        //using switch case statement to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: chalk.magentaBright("Enter a student name:")
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student in Course":
                let course_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.yellowBright("Enter student ID:")
                    },
                    {
                        type: "input",
                        name: "course",
                        message: chalk.cyanBright("Enter course name:")
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.green("Enter student ID:")
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Student Fee":
                let fee_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.yellow("Enter student ID:")
                    },
                    {
                        type: "number",
                        name: "amount",
                        message: chalk.red("Enter the amount to pay:")
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.yellow("Enter a student ID:")
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.bold.redBright("Exiting the program..."));
                process.exit(0);
                break;
        }
    }
}
//invoking function
main();
