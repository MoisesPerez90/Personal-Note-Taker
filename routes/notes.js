const express = require('express');
const router = express.Router();
const uuid = require('../helpers/uuid');
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data => res.json(JSON.parse(data))));
});

router.post('/', (req, res) =>{
    console.info(`${req.method} request received for post notes`);
    const {title, text} = req.body;
    
    if (title && text){
        var inputNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(inputNote,'./db/db.json');

        var serverOutput = {
            status: 'success',
            body: inputNote
        }

        res.json(serverOutput);
    }
    else{
        res.json('Error in posting a note, check your input values');
    }
});

// router.delete('/', (req, res) =>{

// })

module.exports = router;