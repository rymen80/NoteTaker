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
app.get('api/notes',(req, res) => {
    const note = JSON.parse(fs.readFileSync( './db/db.json', 'utf8'))
    res.JSON(note)
});


app.post('api/notes', (req, res) => {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    const newNote = req.body;
    const dbNote = JSON.parse(fs.readFileSync( './db/db.json', 'utf8'));
    const noteLength = dbNote.length > 0 ? dbNote[dbNote.length -1] : null;
    const id = noteLength !== null ? noteLength.id+1 : 1;
    // add it to array then return to client
    const newDb = dbNote.push(...newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
    return res.send(true);
})

app.delete('api/notes/:id', (req, res) => {
    // Should receive a query parameter containing the id of a note to delete. T
    // his means you'll need to find a way to give each note a unique `id` when it's saved.
    // In order to delete a note, you'll need to read all notes from the `db.json` file,
    // remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
})


app.listen(PORT, () => console.log(`hear you on port ${PORT}`));



