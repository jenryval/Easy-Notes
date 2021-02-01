const express = require("express");
const path = require("path");
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = 3000


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.get('/', (req , res) => {
//     res.send('hello bitches')
// });


app.get('/notes', (req , res) => {
   res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('*', (req , res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
 });



app.listen(PORT, () => {
    console.log("App listening on PORT" + PORT);
  });

