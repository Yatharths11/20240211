// Imports
const fs = require('fs'); // File system module to manage file operations
const readline = require('readline'); // Readline module to read user input
const utilities = require('./utilities'); // Custom utilities module

let database_path; // Variable to store the path of the database

// Function to initialize the database
function initialize(path) {
    // Set the database path
    database_path = path;

    // Ask the user for options until they choose to exit
    let choice = utilities.askQuestion(`What do you want to do in this database?
    1. Create new table\t2. Read database\t3. Open table\t4. Delete table`);

    while (choice !== "0") {
        switch (choice) {
            case "1":
                createTable();
                break;
            case "2":
                readDataBase();
                break;
            case "3":
                openTable();
                break;
            case "4":
                deletTable();
                break;
            default:
                console.log("Invalid Option");
        }

        // Ask the user to continue or exit
        choice = utilities.askQuestion("\nPress enter to continue or type 0 to exit the program: ");
    }
}

// Function to create a new table
function createTable() {
    // Ask the user for a table name
    let name = utilities.askQuestion("\nEnter a name for your table: ");
    
    // Create the table directory
    fs.mkdir(`${database_path}/${name}.json`, (err) => {
        if (err) {
            console.log("Error creating Table", err);
        } else {
            console.log(`Table "${name}" created successfully`);
        }
    });
}

// Function to open a table
function openTable() {
    // TODO: Implement logic to open a table
}

// Function to delete a table
function deletTable() {
    // Ask the user for the name of the table to delete
    let name = utilities.askQuestion('\nType the name of the table that you want to delete: ');
    
    // Delete the table file
    fs.unlinkSync(`${database_path}/${name}.json`);
    
    console.log(`The table "${name}" has been deleted`);
}

// Export the functions for external use
module.exports = { createTable, openTable, deletTable };
