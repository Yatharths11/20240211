/**
 * The task is to imitate a database in the local file system
 */


// Import required modules
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create Readline interface for handling user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to create a new database or display a message if it already exists
function startDatabase(databaseName) {
    const databasePath = path.join(__dirname, databaseName);

    if (!fs.existsSync(databasePath)) {
        fs.mkdirSync(databasePath);
        console.log(`Database '${databaseName}' created successfully.`);
    } else {
        console.log(`Database '${databaseName}' already exists.`);
    }
}

// Function to prompt user for database name and initiate the creation
function createDatabase() {
    rl.question("Enter the name of the database: ", (databaseName) => {
        startDatabase(databaseName);
    });
}

// Function to list the contents (tables) of a database
function listDatabaseContents(databaseName) {
    const databasePath = path.join(__dirname, databaseName);
    const databaseContents = fs.readdirSync(databasePath);

    console.log(`Tables in database '${databaseName}':`);
    databaseContents.forEach((table) => {
        console.log(`- ${table}`);
    });
}

// Function to update the name of a database
function updateDatabase(databaseName, updatedDatabase) {
    const databasePath = path.join(__dirname, databaseName);
    if (fs.existsSync(databasePath)) {
        fs.rename(databasePath, path.join(__dirname, updatedDatabase), (err) => {
            if (!err) {
                console.log(`Database '${databaseName}' updated successfully.`);
            } else {
                throw new Error(err);
            }
        });

    } else {
        console.log(`Database '${databaseName}' does not exist.`);
    }
}

// Function to delete a database
function deleteDatabase(databaseName) {
    const databasePath = path.join(__dirname, databaseName);

    if (fs.existsSync(databasePath)) {
        fs.rmdirSync(databasePath, { recursive: true });
        console.log(`Database '${databaseName}' deleted successfully.`);
    } else {
        console.log(`Database '${databaseName}' does not exist.`);
    }
}

// Function to create a new table in a database
function createTable(databaseName, tableName) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);

    if (!fs.existsSync(tablePath)) {
        fs.writeFileSync(tablePath, '[]');
        console.log(`Table '${tableName}' created successfully in database '${databaseName}'.`);
    } else {
        console.log(`Table '${tableName}' already exists in database '${databaseName}'.`);
    }
}

// Function to list the contents (records) of a table in a database
function listTableContents(databaseName, tableName) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);

    if (fs.existsSync(tablePath)) {
        const tableContents = JSON.parse(fs.readFileSync(tablePath, 'utf-8'));

        console.log(`Records in table '${tableName}' in database '${databaseName}':`);
        tableContents.forEach((record) => {
            console.log(record);
        });
    } else {
        console.log(`Table '${tableName}' does not exist in database '${databaseName}'.`);
    }
}

// Function to update the contents of a table in a database
function updateTable(databaseName, tableName, updatedTable) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);
    const newPath = path.join(__dirname,databaseName,updatedTable,'.json')
    fs.rename(tablePath)
}

// Function to delete a table from a database
function deleteTable(databaseName, tableName) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);

    if (fs.existsSync(tablePath)) {
        fs.unlinkSync(tablePath);
        console.log(`Table '${tableName}' deleted successfully from database '${databaseName}'.`);
    } else {
        console.log(`Table '${tableName}' does not exist in database '${databaseName}'.`);
    }
}

// Function to add a new record to a table in a database
function createRecord(databaseName, tableName, record) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);
    const tableData = JSON.parse(fs.readFileSync(tablePath, 'utf-8'));

    tableData.push(record);
    fs.writeFileSync(tablePath, JSON.stringify(tableData, null, 2));
    console.log(`Record added to table '${tableName}' in database '${databaseName}'.`);
}

// Function to list the contents of a specific record in a table
function listRecordContents(databaseName, tableName, recordId) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);
    const tableContents = JSON.parse(fs.readFileSync(tablePath, 'utf-8'));
    const record = tableContents.find((rec) => rec.id === recordId);

    if (record) {
        console.log(`Record with ID ${recordId} in table '${tableName}' in database '${databaseName}':`);
        console.log(record);
    } else {
        console.log(`Record with ID ${recordId} does not exist in table '${tableName}'.`);
    }
}

// Function to update a specific record in a table
function updateRecord(databaseName, tableName, recordId, updatedRecord) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);
    const tableData = JSON.parse(fs.readFileSync(tablePath, 'utf-8'));

    const updatedData = tableData.map((record) => {
        if (record.id === recordId) {
            return { ...record, ...updatedRecord };
        }
        return record;
    });

    fs.writeFileSync(tablePath, JSON.stringify(updatedData, null, 2));
    console.log(`Record updated in table '${tableName}' in database '${databaseName}'.`);
}

// Function to delete a specific record from a table
function deleteRecord(databaseName, tableName, recordId) {
    const tablePath = path.join(__dirname, databaseName, `${tableName}.json`);
    const tableData = JSON.parse(fs.readFileSync(tablePath, 'utf-8'));

    const updatedData = tableData.filter((record) => record.name !== recordId);
    fs.writeFileSync(tablePath, JSON.stringify(updatedData, null, 2));
    console.log(`Record deleted from table '${tableName}' in database '${databaseName}'.`);
}

// Function to display the menu and handle user choices
function askUser() {
    rl.question(`Choose CRUD operation:
    1. Create Database
    2. List Database Contents
    3. Update Database
    4. Delete Database
    5. Create Table
    6. List Table Contents
    7. Update Table
    8. Delete Table
    9. Create Record
    10. List Record Contents
    11. Update Record
    12. Delete Record
    13. Exit
    Enter your choice (1-13): `, (choice) => {
        switch (parseInt(choice)) {
            case 1:
                createDatabase();
                break;
            case 2:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    listDatabaseContents(databaseName);
                    askUser();
                });
                break;
            case 3:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter updated database name: ', (updatedDatabase) => {
                        updateDatabase(databaseName, updatedDatabase);
                        askUser();
                    });
                });
                break;
            case 4:
                rl.question("Enter the name of the database you want to delete: ", (databaseName) => {
                    deleteDatabase(databaseName);
                    askUser();
                });
                break;
            case 5:
                rl.question("Enter the name of the database:", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        createTable(databaseName, tableName);
                        askUser();
                    });
                });
                break;
            case 6:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        listTableContents(databaseName, tableName);
                        askUser();
                    });
                });
                break;
            case 7:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        rl.question('Enter updated table (JSON format): ', (updatedTable) => {
                            updateTable(databaseName, tableName, updatedTable);
                            askUser();
                        });
                    });
                });
                break;
            case 8:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        deleteTable(databaseName, tableName);
                        askUser();
                    });
                });
                break;
            case 9:
                rl.question("Enter the name of the database", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        rl.question('Enter record (JSON format): ', (record) => {
                            createRecord(databaseName, tableName, JSON.parse(record));
                            askUser();
                        });
                    });
                });
                break;
            case 10:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        rl.question('Enter record ID: ', (recordId) => {
                            listRecordContents(databaseName, tableName, parseInt(recordId));
                            askUser();
                        });
                    });
                });
                break;
            case 11:
                rl.question("Enter the name of the database", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        rl.question('Enter record ID to update: ', (recordId) => {
                            rl.question('Enter updated record (JSON format): ', (updatedRecord) => {
                                updateRecord(databaseName, tableName, parseInt(recordId), JSON.parse(updatedRecord));
                                askUser();
                            });
                        });
                    });
                });
                break;
            case 12:
                rl.question("Enter the name of the database: ", (databaseName) => {
                    rl.question('Enter table name: ', (tableName) => {
                        rl.question('Enter record name to delete: ', (recordname) => {
                            deleteRecord(databaseName, tableName,recordname);
                            askUser();
                        });
                    });
                });
                break;
            case 13:
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 13.');
                askUser();
        }
    });
}

// Driver function to start the database and provide CRUD operation choices
function startDatabaseDriver(dbname) {
    startDatabase(dbname);
    askUser();
}

// Example Usage:
startDatabaseDriver('example');

