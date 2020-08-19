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
    ])
}


