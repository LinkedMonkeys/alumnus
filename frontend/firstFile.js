const express = require('express');
const { name } = require('ejs');
const app = express();

// const sqlite = require('node:sqlite'); // Indicating which library you need
// const db = new sqlite.Database('./database/Alumni.db'); // Connecting to the database

// import { Database } from 'node:sqlite';
// const db = new Database('./database/Alumni.db');
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./database/Alumni.db'); // Our last attempt
//const db = new DatabaseSync('C:\Users\shane\Documents\Senior-Capstone-Project\database\Alumni.db'); // My own attempt
const getVar = db.prepare('SELECT * FROM People');

const getUserStmt = db.prepare('SELECT * FROM People WHERE FirstName=?');

// Set up for .ejs
app.set('view engine', 'ejs');

// New Router for DB
app.get('/db', (req, res) => {
    const results = getVar.get();

    // db.get('SELECT * FROM People', (err, row) => {
    //     console.log(row);
    // });
    res.render('mvc', {data: results});
});

// app.get('/db/:first_name',(req,res)=>){ // NEW - 11/13 attempt at calaccessing different nlast names
//     const user = getUserStmt.get(req.params.first_name);
// }


// Router option 1
app.get('/', (req, res) => {
    console.log("Someone just visited."); // Will return this message when you run 
    res.render('index', {name: 'Jeff', age: '43'}) // When someone comes to this website, we want to render this particular webpage (GO FIND INDEX AND PASS IT THESE VALUES)
}) 
// GO BACK LATER - I think I accidentally renamed my index to fredindex

// Router Option 2
app.get('/fred/', (req, res) => {
    console.log("Someone just visited."); // Will return this message when you run 
    res.render('fredindex') // When someone comes to this website, we want to render this particular webpage
})

app.get('/transcript/:name', (req, res) => {
    console.log("Someone just visited."); // Will return this message when you run 
    res.render('transcriptindex') // When someone comes to this website, we want to render this particular webpage
}) // WILL NEED TO CREATE transcriptindex file

// With this, you can pass in /edit/1234 (or any code) to the end of the URL
app.get('/edit/:code', (req, res) => {
    console.log("Someone just visited.");

    if(req.params.code[0] == 'a'){
        type = 'alumnus';
    } else {
        type = 'admin';
    }

    res.render('edit', {code: req.params.code})
});




// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})










// This file passes in data to "index.ejs", which displays that data.