const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: '',
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  multipleStatements: true
})

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
})

app.post('/api/get_theme', (req, res) => {
  var id = req.body.id;
  con.query('SELECT theme FROM theme WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if(result[0] != undefined){
      res.send(result[0].theme)
    }
  })
})

app.post('/api/set_theme', (req, res) => {
  var theme = req.body.theme;
  var id = req.body.id;
  con.query('UPDATE theme SET theme = ? WHERE id = ?', [theme, id], (err, result) => {
    if(err) throw err;
    res.send('Success!')
  })
})

app.post('/api/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password)
  con.query('SELECT id FROM users WHERE BINARY username = BINARY ? AND BINARY password = BINARY ?', [username, password], (err, result) => {
    if(err) throw err;
    console.log(result[0])
    if(result[0] == undefined){
      console.log(false)
      res.send({
        valid: false
      });
    }else{
      console.log(true)
      res.send({
        valid: true,
        id: result[0].id
      });
    }
  })
})

app.post('/api/get_profpic', (req, res) => {
  con.query('SELECT location FROM profpic WHERE id = ?;', [req.body.id], (err, result) => {
    if (err) throw err;
    if (result[0] != undefined){
      console.log('./' + result[0].location)
      res.send('./' + result[0].location);
    }
    res.end();
  })
})

app.post('/api/get_username', (req, res) => {
  con.query('SELECT username FROM users WHERE id = ?;', [req.body.id], (err, result) => {
    if (err) throw err;
    if (result[0] != undefined){
      res.send(result[0].username);
    }
    res.end();
  })
})

app.post('/api/articles', (req, res) => {
  con.query('SELECT * FROM mainpagearticles', (err, result) => {
    if (err) throw err;
    res.send(result.reverse())
  })
})

app.post('/api/get_whiteboards', (req, res) => {
  con.query('SELECT * FROM dots_themes WHERE id = ?', [req.body.id], (err, result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.post('/api/delete_whtbrd', (req, res) => {
  con.query('DELETE FROM dots_themes WHERE ID = ? AND ID_OF_WHITEBOARD = ?', [req.body.id, req.body.whtbrdid], (err, result) => {
    if (err) throw err;
    res.end()
  })
})

app.post('/api/create_whiteboard', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});