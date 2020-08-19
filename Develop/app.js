const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const emailValidate = require("email-validator");

// an empty array that will be used to store the employees
const team = [];

// create a function that asks the user to enter what type of employee they want to add, how many employees they want to add and if they want to add any more employees
function buildTeam () {
    // inquire the user with questions and gather their response by prompting them
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is employee's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's employee id?"
        },
        {
            type: "list",
            name: "role",
            message: "What type of employee are they?",
            choices: ["manager", "engineer", "intern"]
        }
    ]).then(function(empDetail){
        // assigning properties to employees
        this.name = empDetail.name;
        this.id = empDetail.id;
        this.role = empDetail.role;
    }).then(function() {
        email();
        // a function to gather and validate the employee's email
        function email() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "email",
                    message: "What is the employee's email id?"
                }
            ]).then(function(empEmail) {
                // assigning employee's email a property
                this.email = empEmail.email;

                // check the type of employee
                if(this.role === "manager"){
                    // if employee type is manager then gather their office number
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "What is the manager's office number?"
                        }
                    ]).then(function(managerOfficeNumber){
                        // adding manager's office number property 
                        this.officeNummber = managerOfficeNumber.officeNummber;

                        // create a new manager with all of "manager's" properties
                        const manager = new Manager(this.name, this.id, this.email, this.officeNummber);
                        // logging manager to see if we were able to create a new manager successfully
                        console.log(manager);

                        // push this manager into our empty team array
                        team.push(Manager);
                    })
                }
                
            })
        }
    })
}


