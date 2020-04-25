console.log("this");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");
// ​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
// ​
const render = require("./lib/htmlRenderer");
const employees = [];
var idArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.




// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

// Team members is an empty array that we'll be pushing to
// function createTeam () - switch statement to push function to add engineer or add intern based on input answer for type of employee.

// function addEngineer() - inquirer prompt to ask engineer's name, id, email and github; pushing to team members array and saving id
// function addIntern() - same as addEngineer essentially
// console.log("Please build your team")

function appMenu() {
function createTeam () {
    createManager();
    function addTeamMember (){
        console.log("Please fill out the following information about the teammate you'd like to add.")
        inquirer.prompt(
        {
            type: "input",
            name: "confirmType",
            message: "Engineer or Intern?"
        }).then(answers => {
            console.log(answers.confirmType)
            if ((answers.confirmType === "Engineer") || answers.confirmType === "engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "engineerName",
                        message: "What is the team member's name?",
                        validate: answer => {
                            if (answer !== "") {
                                return true;
                            }
                            return "Please enter at least one character.";
                        }
                    },
                    {
                        type: "input",
                        name: "engineerId",
                        message: "What is the team member's id?",
                        validate: answer => {
                            const pass = answer.match(
                             /^[1-9]\d*$/
                            );
                            if (pass) {
                                return true;
                            }
                            return "Please enter a positive number greater than zero.";
                        }
                    },
                    {
                        type: "input",
                        name: "engineerEmail",
                        message: "What is the team member's email?",
                        validate: answer => {
                            const pass = answer.match(
                                /\S+@\S+\.\S+/
                            );
                            if (pass) {
                                return true;
                            }
                            return "Please enter a valid email address.";
                        }
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is the team member's github profile url?",
                        // validate: answer => {
                        //     const pass = answer.match(

                        //     if (pass) {
                        //         return true;
                        //     }
                        //     return "Please enter a valid url beginning with ";
                        // }
                    },
                     {
                        type: "confirm",
                        name: "addTeamMember",
                        message: "Would you like to add another team member?"

                    }
                     ]).then(answers => {
                    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github);
                    employees.push(engineer);
                    idArray.push(answers.engineerId);
                    if (answers.addTeamMember=== true) {
                        addTeamMember();
                    }
                    else {
                        console.log("Team created!")
                        const data = render(employees);
                        fs.writeFile(outputPath, data, function (err) {

                            if (err) {
                                return console.log(err);
                            }

                            console.log("Success!");

                        });
                        console.log(employees);
                    }
                });
            }
             else if (answers.confirmType === "Intern" || answer.confirmType === "intern") {
                inquirer.prompt ([
                    {
                        type: "input",
                        name: "internName",
                        message: "What is the team member's name?",
                        validate: answer => {
                            if (answer !== "") {
                                return true;
                            }
                            return "Please enter at least one character.";
                        }
                    },
                    {
                        type: "input",
                        name: "internId",
                        message: "What is the team member's id?",
                        validate: answer => {
                            const pass = answer.match(
                                /^[1-9]\d*$/
                            );
                            if (pass) {
                                return true;
                            }
                            return "Please enter a positive number greater than zero.";
                        }
                    },
                    {
                        type: "input",
                        name: "internEmail",
                        message: "What is the team member's email?",
                        validate: answer => {
                            const pass = answer.match(
                                /\S+@\S+\.\S+/
                            );
                            if (pass) {
                                return true;
                            }
                            return "Please enter a valid email address.";
                        }
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "Which school is the team-member currently attending?",
                        validate: answer => {
                            if (answer !== "") {
                                return true;
                            }
                            return "Please enter at least one character.";           
                        }
                    },
                    {
                        type: "confirm",
                        name: "addTeamMember",
                        message: "Would you like to add another team member?"

                    }
                ]).then(answers => {
                    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school);
                    employees.push(intern);
                    idArray.push(answers.internId);
                    if (answers.addTeamMember === true) {
                        addTeamMember();
                    }
                    else {
                        console.log("Team created!")
                        const data = render(employees);
                        fs.writeFile(outputPath, data, function (err) {

                            if (err) {
                                return console.log(err);
                            }

                            console.log("Success!");

                        });
                        console.log(employees);
                    }
                });
            }
        });
    }
    
    function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero.";
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a positive number greater than zero.";
            }
        }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
        employees.push(manager);
        idArray.push(answers.managerId);
        addTeamMember();
    });
    }
}   
createTeam();
//Functions left to create - CreateTeam, AddEngineer, AddIntern, BuildTeam

// render();

}

appMenu();
 

