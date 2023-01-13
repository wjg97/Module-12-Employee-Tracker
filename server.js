//const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const db = require('./db/connections');


const initialQuestion = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            validate: selectionInput => {
                if (selectionInput) {
                    return true;
                } else {
                    console.log('You need to make a selection!');
                    return false;
                }
            }
        }
    ])
    .then ((initialAnswer) => {
        switch(initialAnswer.selection) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
            break;
            case 'update an employee role':
                updateEmployeeRole();
            break;
            default: 
            initialQuestion();
        }
    }
    )
};

//if view departments is selected
const viewDepartments = () => {
let sql = `SELECT * FROM departments`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

//if view roles is selected
const viewRoles = () => {
let sql = `SELECT * FROM roles`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

//if view employees is selected
const viewEmployees = () => {
let sql = `SELECT * FROM employees`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

//if add a department is selected
function addDepartment() { 
inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What department would you like to add?"
    }

]).then(function(answers) {
    db.query('INSERT INTO departments SET ?',
        {
            name: answers.name
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New department added successfully!`);
            initialQuestion();
        }
    )
})
}

//if add a role is selected
function addRole() { 
inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "What role would you like to add?",
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for the new role?",
    },
    {
        name: "department_id",
        type: "input",
        message: "Please enter id of the department for this role",
    }

]).then(function(answers) {
    db.query('INSERT INTO roles SET ?',
        {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New role added successfully!`);
            initialQuestion();
        }
    )
})
}

//if add an employee is selected
function addEmployee() { 
inquirer.prompt([
    {
        name: "first_name",
        type: "input",
        message: "What's the employee's first name?",
    },
    {
        name: "last_name",
        type: "input",
        message: "What's the employee's last name?",
    },
    {
        name: "role_id",
        type: "input",
        message: "What's the employee's role id?",
    },
    {
        name: "manager_id",
        type: "input",
        message: "What's the employee manager's id?",
    }

]).then(function(answers) {
    db.query('INSERT INTO employees SET ?',
        {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New employee added successfully!`);
            initialQuestion();
        }
    )
})
}

//if update employee role is selected
function updateEmployeeRole() { 
inquirer.prompt([
    {
        name: "id",
        type: "input",
        message: "What is the employee's id?",
    },
    {
        name: "role_id",
        type: "input",
        message: "What is the employee's role id?",
    }

]).then(function(role_id, id) {
    let sql = 'UPDATE employees SET role_id = ? WHERE id = ?'
    let params = [role_id, id]

    db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log(`Employee's role updated successfully!`);
    })
    initialQuestion();
})
}

initialQuestion();