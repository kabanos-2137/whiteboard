"use strict";

var express = require('express');

var cookieParser = require("cookie-parser");

var bodyParser = require('body-parser');

var mysql = require('mysql');

require('dotenv').config();

var app = express();
var port = process.env.PORT;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.json());
var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: '',
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  multipleStatements: true
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
app.post('/api/get_theme', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  con.query('SELECT theme FROM theme WHERE id = (SELECT id FROM users WHERE BINARY username = BINARY ? AND BINARY password = BINARY ?)', [username, password], function (err, result) {
    if (err) throw err;

    if (result[0] != undefined) {
      res.send(result[0].theme);
    }
  });
});
app.post('/api/set_theme', function (req, res) {
  var theme = req.body.theme;
  var username = req.body.username;
  var password = req.body.password;
  con.query('UPDATE theme SET theme = ? WHERE id = (SELECT id FROM users WHERE BINARY username = BINARY ? AND password = ?)', [theme, username, password], function (err, result) {
    if (err) throw err;
    res.send('Success!');
  });
});
app.post('/api/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password);
  con.query('SELECT id FROM users WHERE BINARY username = BINARY ? AND BINARY password = BINARY ?', [username, password], function (err, result) {
    if (err) throw err;
    console.log(result[0]);

    if (result[0] == undefined) {
      console.log(false);
      res.send(false);
    } else {
      console.log(true);
      res.send(true);
    }
  });
});
app.post('/api/get_profpic', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  con.query('SELECT location FROM profpic WHERE id = (SELECT id FROM users WHERE BINARY username = BINARY ? AND BINARY password = BINARY ?);', [username, password], function (err, result) {
    if (err) throw err;

    if (result[0] != undefined) {
      console.log('./' + result[0].location);
      res.send('./' + result[0].location);
    }
  });
});
app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});