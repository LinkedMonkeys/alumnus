const express = require('express');
const { name } = require('ejs');
const app = express();

const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./database/Alumni.db'); 

const getVar = db.prepare('SELECT * FROM People');
const getUserStmt = db.prepare('SELECT * FROM People WHERE FirstName=?');

app.set('view engine', 'ejs'); // Set up for .ejs

app.get('/db', (req, res) => { // New Router for DB
    const results = getVar.get();

    res.render('mvc', {data: results});
});

app.get('/db/:first_name',(req,res)=> { // NEW - 11/13 attempt at accessing different last names
    const user = getUserStmt.get(req.params.first_name);

    res.render('mvc', {user: user});
});



// BRAINSTORMING
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



