"use strict";

var express = require('express');

var cookieParser = require("cookie-parser");

var bodyParser = require('body-parser');

var mysql = require('mysql');

var Str = require('@supercharge/strings');

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
  var id = req.body.id;
  con.query('SELECT theme FROM theme WHERE id = ?', [id], function (err, result) {
    if (err) throw err;

    if (result[0] != undefined) {
      res.send(result[0].theme);
    }
  });
});
app.post('/api/set_theme', function (req, res) {
  var theme = req.body.theme;
  var id = req.body.id;
  con.query('UPDATE theme SET theme = ? WHERE id = ?', [theme, id], function (err, result) {
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
      res.send({
        valid: false
      });
    } else {
      console.log(true);
      res.send({
        valid: true,
        id: result[0].id
      });
    }
  });
});
app.post('/api/get_profpic', function (req, res) {
  con.query('SELECT location FROM profpic WHERE id = ?;', [req.body.id], function (err, result) {
    if (err) throw err;

    if (result[0] != undefined) {
      console.log('./' + result[0].location);
      res.send('./' + result[0].location);
    }

    res.end();
  });
});
app.post('/api/get_username', function (req, res) {
  con.query('SELECT username FROM users WHERE id = ?;', [req.body.id], function (err, result) {
    if (err) throw err;

    if (result[0] != undefined) {
      res.send(result[0].username);
    }

    res.end();
  });
});
app.post('/api/articles', function (req, res) {
  con.query('SELECT * FROM mainpagearticles', function (err, result) {
    if (err) throw err;
    res.send(result.reverse());
  });
});
app.post('/api/get_whiteboards', function (req, res) {
  con.query('SELECT * FROM dots_themes WHERE id = ?', [req.body.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/api/delete_whtbrd', function (req, res) {
  con.query('DELETE FROM dots_themes WHERE ID = ? AND ID_OF_WHITEBOARD = ?', [req.body.id, req.body.whtbrdid], function (err, result) {
    if (err) throw err;
    res.end();
  });
});
app.post('/api/create_whiteboard', function (req, res) {
  console.log(req.body);

  if (req.body.name != undefined) {
    con.query('INSERT INTO dots_themes (ID, ID_OF_WHITEBOARD, DOT_1, DOT_2, DOT_3, DOT_4, INSIDE_DOT_1, INSIDE_DOT_2, INSIDE_DOT_3, INSIDE_DOT_4, WHITEBOARD_NAME, PROFPIC) VALUES (?, ?, "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", ?, ?)', [req.body.id, Str.random(64), req.body.name, '../whtbrdprofpic/default.png'], function (err, result) {
      if (err) {
        res.end();
        throw err;
      }

      res.end();
    });
  }
});
app.post('/api/get_dots', function (req, res) {
  var whiteboardId = req.body.whiteboardId; //id of whiteboard

  var id = req.body.id; // user's id

  var query = "SELECT DOT_1, DOT_2, DOT_3, DOT_4, INSIDE_DOT_1, INSIDE_DOT_2, INSIDE_DOT_3, INSIDE_DOT_4 FROM dots_themes WHERE ID = ? AND BINARY ID_OF_WHITEBOARD = BINARY ?"; // Get info 'bout dots from db

  con.query(query, [id, whiteboardId], function (err, result) {
    // execute the query
    if (err) throw err;
    res.send(result[0]);
  });
});
app.post('/api/change_dot_theme', function (req, res) {
  var user_id = req.body.id;
  var whtbrd_id = req.body.whtbrd_id;
  var dot_number = req.body.dot_number;
  var dot_target_type = req.body.dot_target_type;
  var query = "UPDATE dots_themes SET DOT_".concat(dot_number, " = ? WHERE ID = ? AND BINARY ID_OF_WHITEBOARD = BINARY ?");
  con.query(query, [dot_target_type, user_id, whtbrd_id], function (err, result) {
    if (err) throw err;
    console.log(result[0]);
    res.end();
  });
});
app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});