// Imports
const fs = require('fs'); // File system module to manage file operations
const readline = require('readline'); // Readline module to read user input
const utilities = require('./utilities'); // Custom utilities module
const tablemanager = require('./tablesmanager'); // Custom tables manager module

// Path to the databases folder
let path = 'E:/Web/DBMS/databases/databases';

// Function to create a new database
function createDatabase() {
    // Ask the user for the name of the database
    let name = utilities.askQuestion("Enter the name of the database: ");

    // Creating a new database by creating a new folder
    fs.mkdir(path, (err) => {
        if (!err) {
            console.log('Database created successfully!');
        }
    });

    return;
}

// Function to open an existing database
function openDatabase() {
    // List all databases
    utilities.list(path);

    // Ask the user which database to open
    let databaseToOpen = utilities.askQuestion('Which database do you want to open? ');

    // Initialize the tables manager with the path of the selected database
    tablemanager.initialize(`${path}/${databaseToOpen}`);

    return;
}

// Function to delete an existing database
function deleteDatabase() {
    // List all databases
    utilities.list(path);

    // Ask the user which database to delete
    let databaseToDelete = utilities.askQuestion('Which database do you want to delete? ');

    // Delete the database file
    fs.unlink(`${path}/${databaseToDelete}.json`, (err) => {
        if (!err) {
            console.log('Database deleted successfully!');
        } else {
            console.log('Error deleting database: ', err);
        }
    });

    return;
}

// Export the functions for external use
module.exports = { createDatabase, openDatabase, deleteDatabase };
