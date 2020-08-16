// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name,id,email,github) {
        super(id,name,email);
        this.id = "Engineer";
        this.github = github;
    }
    // create a method to set the employee's role as an engineer
    getRole() {
        return this.id;
    }
    // create a method to get the employer's github user name
    getGithub() {
        return this.github;
    }
}

// export the modules
module.exports = Engineer;