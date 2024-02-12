/**
 * Problem statment is to create a database management system 
 * where folder is a database, json file is a table and 
 * record is a row
 */

//imports
const fs = require('fs'); // to manage file system
const readline = require( 'readline' ); // to read user input
const  utilities = require('./utilities')

let path = 'E:/Web/DBMS/databases/databases'


//driver function
function startDatabases(path){


    //showing all the available databases
    utilities.list(path)
    
    //asking user what does he want to do 
    let response= utilities.askQuestion(`What do you want to do ?
    1. Create Database\t2. Open Database\t3. Delete Database\n`)
    
    //continupusly ask for input until exit 
    while(response){
        switch(response) {
            case 1:
                createDatabase()// Creating a database
            case 2:
                openDatabase()//Open and pass control flow to database
            case 3:
                deleteDatabase()//delete a database
        }
        response = utilities.askQuestion(`Do you want to continue ?
            If yes select again, if no select 0: `)
    }
}


startDatabases(path)