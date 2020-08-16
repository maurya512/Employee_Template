// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(id,name,email,school) {
        super(id, name, email);
        this.id = "Intern";
        this.school = school;
    }

    // create a method to get the intern's role at the company
    getRole() {
        return this.id;
    }

    // create a method to get the intern's school 
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;