// TODO: Write code to define and export the Employee class
// create a class called employee
class Employee {
    // create a constructor that will hold the atrributes of an employee
    constructor(name, id, email) {
        // instantiate the properties 
        this.name = name;
        this.id = id;
        this.email = email;
        this.title = "Employee"

    }

    // a method to return the employee's name
    getName() {
        return this.name;
    }

    // a method to return the employee's id
    getId() {
        return this.id;
    }

    // a method to return the employee's email
    getEmail() {
        return this.email;
    }

    // a method to return the employee's role
    getRole() {
        return this.title;
    }
}

// export the class Employee 
module.exports = Employee