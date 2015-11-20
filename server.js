//version 0.1.1
//var mysql = require("mysql");
var express = require("express");
var db = require("./db");
var app = express();
var sessions = require("client-sessions");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
  cookieName: 'mySession',
  secret: 'blargadeeblargblarg',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}));

app.use(express.static('static_files'));

app.get('/', function(req, res){
  res.redirect('/DeVotee.html');
});

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
    if (notExist) {
      db.insertUser(username, password);
      req.mySession.username = username;
      res.send(msg);
    } else {
      res.send(msg);
    }
  });
});

app.post('/users/checklogin', function (req, res){
  var postbody = req.body;
  var username = postbody.username;
  var password = postbody.password;
  //var username = req.params.username;
  //var password = req.params.password;
  if (!username){
    res.send({error:'Null username'});
    return;
  }
  if (!password){
    res.send({error:'Null password'});
    return;
  }

  var data = {};
  db.checkLogin(username, password, function(match, results){
    if (match){
      data = {username:results[0].username, password:results[0].password};
      req.mySession.username = username;
      //console.log(data);
      res.send(data);
    } else {
      //console.log(results);
      res.send({error:'Login failed. Check username or password.'});
    }
  });
});

//if the user is logged in, check whether the user has filled out the general survey
app.get('/users/login', function (req, res){
  //if the user logged in
  var username = req.mySession.username;
  if (req.mySession && username){
    db.checkGenInfo(username, function(msg){
      if (msg == "exists"){
        //send the third page
        console.log("send geninfo page");
        res.send({redirect: '/Votee.html'});
      }else {
        console.log("send survey page");
        res.send({redirect:'/survey.html'});
      }
    });
  }
});

app.get('/users/logout', function(req, res){
  console.log(req.mySession.username);
  delete req.mySession;
  res.send({redirect:'DeVotee.html'});
});

//POST user's basic information into the database
app.post('/submit', function (req, res){
  var postbody = req.body;
  var username = req.mySession.username;
  var age = postbody.age;
  var occupation = postbody.occupation;
  var gender = postbody.gender;

  db.checkGenInfo(username, function(msg){
    if (msg == "exists"){
      db.updateGeninfo(username, age, gender, occupation);
    }else {
      db.insertGenInfo(username, age, gender, occupation);
    }
  });
  res.send("OK");
});

app.get('/geninfo', function (req, res){
  var postbody = req.body;
  var username = req.mySession.username;

  var data = {};
  db.getGeninfo(username, function(results){
    if (results == "error" || results == "notExists")
      res.send({error: results});
    else
    {
      data = {username: results[0].username,
              age: results[0].age,
              gender: results[0].gender,
              occupation: results[0].occupation};
      res.send(data);
    }
  });
});



var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});