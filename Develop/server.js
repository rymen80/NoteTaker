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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

//api routes

app.get('api/notes',(req, res) => {
    let rawData =
    res.send('notes')
});

app.listen(PORT, () => console.log(`hear you on port ${PORT}`));



