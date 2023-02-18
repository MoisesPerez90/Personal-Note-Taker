const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express ();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/api/notes', async function(req, res) {
    const notes = await fs.readFile(db);
    return res.json(notes);
});

app.post('/api/notes', (req, res) =>{
    
});

app.listen(PORT, () => {
     console.log(`App listening at http://localhost:${PORT} 🚀`)
});