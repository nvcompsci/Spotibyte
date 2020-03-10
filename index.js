//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/data.db');
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/items", (req, res) => {
    let sql = `SELECT * FROM items`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("GET /items - items sent to user");
        res.send(rows);
    });
})

app.post("/login", (req, res) => {
    const user = req.body.user
    const sql = `SELECT userid FROM users WHERE password = ? AND email = ?`
    const values = [user.first, user.last, user.email, user.password]
    let userID
    db.all(sql, values, (err, rows) => {
        //rows is an array of records from SQL query
        if (err) {
            throw err;
        }
        //rows.forEach((row) => {
          //nothing for each row
        //});
        //if there is no user
        if (rows.length == 0) {
            res.status(404)
            res.json({
                message: 'No such user',
                userID: null
            })
        }
        else {
            res.status(200)
            res.json({
                message: 'User logged in!',
                userID: rows[0].userID
            })
        }
    });
    
    
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )