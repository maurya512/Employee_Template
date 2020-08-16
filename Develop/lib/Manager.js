// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// inherited from employee class 
const Employee = require("./Employee");

// create a class that extends from employee class
class Manager extends Employee {
    // create a constructor that takes the manager's arguments
    constructor(name,id,email,officeNumber) {
        super(name, id, email);
        this.id = "Manager";
        this.officeNumber = officeNumber;
    }
    // create a method that returns the manager's job title
    getRole () {
        return this.id;
    }
    // create a method that returns the manager's office number
    getOfficeNumber() {
        return this.officeNumber;
    }
}

// export the class Manager to be used at different locations
module.exports = Manager;