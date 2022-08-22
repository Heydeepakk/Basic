const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const sequelize = require("sequelize");

app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123@',
    database: 'newschema'
});

db.connect((err) => {
    if (err) throw err;
    else
        (
            console.log("database Connection...")
        )
});
app.get('/api', (req, res) => {
    res.send("api working")
})

app.post('/api/create', (req, res) => {

    console.log(req.body);
    
/*req.body.id and req.body.name both are the date that you can upload means you can upload name with id */

    let sql = ` INSERT INTO newtable(id,name)
                VALUES('${req.body.id}','${req.body.name}')
               `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data chala gya');
    });


});
app.get('/api/read', (req, res) => {

    let sql = `SELECT * FROM newtable`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.put('/api/update/:id', (req, res) => {
    console.log(req.params.id);
    let sql = `UPDATE newtable SET 
                    name = '${req.body.name}'
                    WHERE id = '${req.body.id}'
                    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data badaldia');
    })
})



app.delete('/api/delete/:id', (req, res) => {
    console.log(req.params.id);

    let sql = `DELETE FROM newtable 
                WHERE id = '${req.params.id}'
                `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('data khtm');
    });
});

app.listen(3000, () => {
    console.log("server is running http://localhost:3000.")
})