const express = require('express');
const router = express.Router();
const uuid = require('../helpers/uuid');
const {readFromFile, readAndAppend, deleteNote} = require('../helpers/fsUtils');

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

        let serverOutput = {
            status: 'success',
            body: inputNote
        }

        res.json(serverOutput);
    }
    else{
        res.json('Error on posting a note, check your input values');
    }
});

router.delete('/:id', (req, res) =>{
    const noteToDelete = req.params.id;
    console.info(`${req.method} request received for delete a note`);
    

    if (noteToDelete){
        var inputID ={
            id: noteToDelete
        };

        deleteNote(inputID, './db/db.json');

        res.json(`Your note with the ${noteToDelete} has been deleted`);
    }
    else{
        res.json(`Error on deleting the note with the id: ${noteToDelete}`)
    }
})

module.exports = router;