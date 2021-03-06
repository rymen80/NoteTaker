// dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');

// setting up express
const app = express();
const PORT = process.env.PORT || 3003;


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//html routes starting

// displays the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
// displays the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

//api routes

// sends the notes to the jb.json file
app.get('/api/notes',(req, res) => {
    // console.log(req);
    const note = JSON.parse(fs.readFileSync( './db/db.json', 'utf8'))
    res.json(note);
});

// app.post that
app.post('/api/notes', (req, res) => {

    const newNote = req.body;
    const dbNote = JSON.parse(fs.readFileSync( './db/db.json', 'utf8'));
    const noteLength = dbNote.length > 0 ? dbNote[dbNote.length -1] : null;
    const id = noteLength !== null ? noteLength.id+1 : 1;
    // add it to array then return to client
    const newDb = [...dbNote, {...newNote,id }];
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
    res.send(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    // console.log("hit this");
    const id = parseInt(req.params.id);
    console.log(id);
    let notes = JSON.parse(fs.readFileSync( './db/db.json', 'utf8'));
    console.log(notes);
    const newNotes = notes.filter(note => note.id !== id);
     console.log(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    res.send(newNotes);

});


app.listen(PORT, () => console.log(`hear you on port ${PORT}`));



