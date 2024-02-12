//imports
const fs = require('fs'); // to manage file system
const { userInfo } = require('os');
const readline = require( 'readline' ); // to read user input
let path = 'E:/Web/DBMS/databases/databases'

const  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//function to list the contents of a particular folder
function list(path){
    fs.readdir(path, (err, files) => {
        if (err) throw err;
        else {
            files.forEach((file) => console.log(file));
        }
    })
}

//Function to ask any question to the user
function askQuestion(questionstatement){
    rl.question(questionstatement,(userInput)=>{
        return parseInt(userInput);
    })
}


module.exports = {list,askQuestion}