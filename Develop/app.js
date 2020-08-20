const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const emailValidate = require("email-validator");

// an empty array that will be used to store the employees
const team = [];

// create a function that asks the user to enter what type of employee they want to add, how many employees they want to add and if they want to add any more employees
function buildTeam() {
    // inquire the user with questions and gather their response by prompting them
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?",
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
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then(function (empDetail) {
        // assigning properties to employees
        this.name = empDetail.name;
        this.id = empDetail.id;
        this.role = empDetail.role;
    }).then(function () {
        email();
        // a function to gather and validate the employee's email
        function email() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "email",
                    message: "What is the employee's email id?"
                }
            ]).then(function (empEmail) {
                // assigning employee's email a property
                this.email = empEmail.email;

                if (emailValidate.validate(this.email)) {
                    this.email = empEmail.email;

                    // check the type of employee
                    if (this.role === "Manager") {
                        // if employee type is manager then gather their office number
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "officeNumber",
                                message: "What is the manager's office number?"
                            }
                        ]).then(function (managerOfficeNumber) {
                            // adding manager's office number property 
                            this.officeNumber = managerOfficeNumber.officeNumber;

                            // create a new manager with all of "manager's" properties
                            const manager = new Manager(this.name, this.id, this.email, this.officeNumber);

                            // logging manager to see if we were able to create a new manager successfully
                            console.log(manager);
                            console.log(this.name);
                            console.log(this.id);
                            console.log(this.email);
                            console.log(this.role);
                            console.log(this.officeNumber);

                            // push this manager into our empty team array
                            team.push(manager);
                        }).then(function () {
                            addMoreEmp();
                        })
                    }
                    // check if the employee type is an engineer
                    else if (this.role === "Engineer") {
                        // inquire and prompt the user for the employee's github username
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "github",
                                message: "What is the employee's github username?"
                            }
                        ]).then(function (engGithub) {
                            this.github = engGithub.github;

                            // create a new engineer with all of engineer's properties
                            const engineer = new Engineer(this.name, this.id, this.email, this.github);
                            // loggin the new engineer
                            console.log(this.name);
                            console.log(this.id);
                            console.log(this.email);
                            console.log(this.role);
                            console.log(this.github);
                            // pushing the newly created engineer inside of the empty array
                            team.push(engineer);
                        }).then(function () {
                            addMoreEmp();
                        })
                    }

                    // else the last type of employee is going to be an intern
                    else {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "school",
                                message: "What school does the intern go to?"
                            }
                        ]).then(function (internSchool) {
                            // assigning properties to intern's school
                            this.school = internSchool.school;

                            // logging the school
                            console.log(this.school);

                            // creating a new intern with intern's gathered properties
                            const intern = new Intern(this.name, this.id, this.email, this.school);

                            // pushing the intern to the school
                            team.push(intern);
                        }).then(function () {
                            addMoreEmp();
                        })
                    }
                }
                // else let the user know to enter a proper email format
                else {
                    console.log("Enter a proper email format.");
                    // call the function
                    email();
                }
            })
        }
    })
}

// create a new function to add more emp addMoreEmp
function addMoreEmp() {
    // ask the user if they want to add more employees
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Would you like to add more employees to the team?",
            choices: ["yes",'no']
        }
        // if the user agrees to add more employee we ask them to 
    ]).then(function (addEmp){
        if(addEmp.continue === "yes"){
            buildTeam();
        }
        else {
            buildTeamPortfolio();
            return "The team consists of: " + JSON.stringify(team);
        }
    })
}

// create a function that will create the team's portfolio for us to view
function buildTeamPortfolio() {
    // check if the output directory exists or not
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    // create a file and if a file exists override it
    fs.writeFile(outputPath, render(team), "utf8", function(error) {
        if(error){
            console.log(error);
            return;
        }
        console.log("Successfully created a file");
    })

}

// call the function
buildTeam();

