const util = require('util');
const fs = require('fs');

const readFromFile = util.promisify(fs.readFile);

function writeToFile (destination, content){
    fs.writeFile(destination, JSON.stringify(content), (err) => {
        err ? console.error(err) : console.info(`\nData written to ${destination}`);
    })
}

function readAndAppend(content, file){
    fs.readFile(file, 'utf-8', (err, data) =>{
        if (err){
            console.error(err);
        }
        else{
            let JSONobj = JSON.parse(data);
            JSONobj.push(content);
            writeToFile(file, JSONobj);
        }
    })
}


module.exports = {
    readFromFile,
    readAndAppend
}