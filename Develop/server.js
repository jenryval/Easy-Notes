const express = require("express");
const path = require("path");
const http = require('http');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000
const { v4: uuidv4 } = require('uuid');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req , res) => {
   res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
 });

 app.get('/api/notes', (req , res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
 });

app.post('/api/notes' , (req, res) => {
   const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
   const newNote = req.body
   newNote.id = uuidv4()
   notes.push(newNote);
   fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notes));
   res.sendStatus(200);
});


app.delete('/api/notes/:id' , (req, res) => {
   const noteId = req.params.id
   let Notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
   Notes = Notes.filter(note => note.id != noteId)
   fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(Notes));
   res.status(200).send(Notes)
})


app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
  });

