//var mysql = require("mysql");
var express = require("express");
var db = require("./db");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static_files'));

//CREATE user
app.post('/users', function(req, res){
  var postBody = req.body;
  var username = postBody.username;
  var password = postBody.password;

  if (!username){
    res.send('Null username\n');
    return;
  }
  if (!password){
    res.send('Null password\n');
    return;
  }

  db.userExistInDB(username, function(notExist, msg){
      //return msg;
    if (notExist) {
      db.insertUser(username, password);
      res.send(msg);
      return;
    } else {
      res.send(msg);
      return;
    }
  });
});

//READ user : check log in
app.get('/users/login/:username/:password', function (req, res){
  var username = req.params.username;
  var password = req.params.password;
  db.checkLogin(username, password, function(match, results){
    if (match){
      var data = {username:results[0].username, password:results[0].password};
      res.send(data);
      return;
    } else {
      res.send(results);
    }
  });
  // res.send(username);
  // console.log(username);
  // console.log(password);
});





var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});