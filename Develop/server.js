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
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

//api routes
// sends the notes to the jb.json file
app.get('api/notes',(req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, notes) => {
        if (err) throw err;
        res.send(JSON.parse(notes))
    });
});



app.listen(PORT, () => console.log(`hear you on port ${PORT}`));



