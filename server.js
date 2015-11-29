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

//temparary database
var candidates = [
  ["jeb_bush", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -20], ["god", 40], ["obamacare", -20], ["social_security", 0], ["education", 40], ["epa_regulation", -40], ["crime", 40], ["gun", 20], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", 20], ["american_exceptionalism", -20], ["military", 40], ["easier_vote", -40], ["foreign_entanglements", -20], ["green_energy", -20], ["marijuana", 40], ["stimulus", -20]]],
  ["ben_carson", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -20], ["god", 40], ["obamacare", -20], ["social_security", 0], ["education", 40], ["epa_regulation", -20], ["crime", -20], ["gun", 20], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", -40], ["american_exceptionalism", 40], ["military", 20], ["easier_vote", 0], ["foreign_entanglements", 0], ["green_energy", -20], ["marijuana", -20], ["stimulus", 40]]],
  ["chris_christie", [["abortion", -20], ["female_employee", 20], ["same_sex_marriage", 20], ["god", -20], ["obamacare", 20], ["social_security", 20], ["education", 40], ["epa_regulation", 0], ["crime", 20], ["gun", -20], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", 20], ["american_exceptionalism", 0], ["military", 40], ["easier_vote", 20], ["foreign_entanglements", -20], ["green_energy", 40], ["marijuana", -20], ["stimulus", -40]]],
  ["ted_cruz", [["abortion", -40], ["female_employee", 0], ["same_sex_marriage", -40], ["god", 40], ["obamacare", -40], ["social_security", 40], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 40], ["wealthy_tax", -20], ["illegal_aliens", -40], ["free_trade", 40], ["american_exceptionalism", 40], ["military", 40], ["easier_vote", 0], ["foreign_entanglements", -20], ["green_energy", -40], ["marijuana", -20], ["stimulus", -40]]],
  ["carly_florina", [["abortion", -20], ["female_employee", 40], ["same_sex_marriage", -20], ["god", 0], ["obamacare", -40], ["social_security", 0], ["education", 20], ["epa_regulation", 20], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", -20], ["american_exceptionalism", 20], ["military", 40], ["easier_vote", 20], ["foreign_entanglements", -40], ["green_energy", -20], ["marijuana", 20], ["stimulus", -40]]],
  ["jim_glimore", [["abortion", 20], ["female_employee", 20], ["same_sex_marriage", -40], ["god", 40], ["obamacare", 20], ["social_security", 20], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 20], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", 20], ["american_exceptionalism", -20], ["military", 40], ["easier_vote", 0], ["foreign_entanglements", -40], ["green_energy", -20], ["marijuana", 20], ["stimulus", 20]]],
  ["lindsey_graham", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -40], ["god", 40], ["obamacare", -20], ["social_security", 20], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", -20], ["american_exceptionalism", 40], ["military", 40], ["easier_vote", 20], ["foreign_entanglements", -40], ["green_energy", -40], ["marijuana", 40], ["stimulus", -20]]],
  ["mike_huckabee", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -40], ["god", 40], ["obamacare", -20], ["social_security", 20], ["education", 20], ["epa_regulation", -20], ["crime", 20], ["gun", 40], ["wealthy_tax", -20], ["illegal_aliens", -20], ["free_trade", -20], ["american_exceptionalism", 40], ["military", 20], ["easier_vote", -40], ["foreign_entanglements", -40], ["green_energy", -20], ["marijuana", 20], ["stimulus", -20]]],
  ["bobby_jindal", [["abortion", -40], ["female_employee", -40], ["same_sex_marriage", -40], ["god", 20], ["obamacare", -40], ["social_security", 0], ["education", 40], ["epa_regulation", 0], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", -40], ["free_trade", -40], ["american_exceptionalism", 40], ["military", 20], ["easier_vote", 20], ["foreign_entanglements", -40], ["green_energy", -40], ["marijuana", 20], ["stimulus", -20]]],
  ["john_kasich", [["abortion", -20], ["female_employee", 20], ["same_sex_marriage", -40], ["god", 40], ["obamacare", 20], ["social_security", 40], ["education", 20], ["epa_regulation", 0], ["crime", -40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", 40], ["american_exceptionalism", 0], ["military", -20], ["easier_vote", 20], ["foreign_entanglements", -20], ["green_energy", 0], ["marijuana", 20], ["stimulus", 0]]],
  ["sarah_palin", [["abortion", -20], ["female_employee", 20], ["same_sex_marriage", -20], ["god", 40], ["obamacare", -20], ["social_security", -20], ["education", 20], ["epa_regulation", 40], ["crime", 40], ["gun", 40], ["wealthy_tax", -20], ["illegal_aliens", 20], ["free_trade", 20], ["american_exceptionalism", 0], ["military", 40], ["easier_vote", 40], ["foreign_entanglements", -20], ["green_energy", -20], ["marijuana", 20], ["stimulus", 40]]],
  ["george_pataki", [["abortion", 0], ["female_employee", 20], ["same_sex_marriage", 40], ["god", 20], ["obamacare", -20], ["social_security", 20], ["education", 40], ["epa_regulation", -20], ["crime", 40], ["gun", -40], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", 20], ["american_exceptionalism", 20], ["military", 40], ["easier_vote", 20], ["foreign_entanglements", -40], ["green_energy", 20], ["marijuana", -20], ["stimulus", -40]]],
  ["rand_paul", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -20], ["god", 20], ["obamacare", -40], ["social_security", 20], ["education", 40], ["epa_regulation", 40], ["crime", -40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", 20], ["free_trade", 40], ["american_exceptionalism", -20], ["military", -20], ["easier_vote", 20], ["foreign_entanglements", 20], ["green_energy", -40], ["marijuana", -40], ["stimulus", -20]]],
  ["rick_perry", [["abortion", -40], ["female_employee", 0], ["same_sex_marriage", -40], ["god", 40], ["obamacare", -40], ["social_security", 20], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", 20], ["american_exceptionalism", -20], ["military", 40], ["easier_vote", -20], ["foreign_entanglements", -40], ["green_energy", -20], ["marijuana", 20], ["stimulus", -40]]],
  ["marco_rubio", [["abortion", -40], ["female_employee", -20], ["same_sex_marriage", -20], ["god", 40], ["obamacare", -20], ["social_security", -20], ["education", 40], ["epa_regulation", 40], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", 40], ["american_exceptionalism", 20], ["military", 40], ["easier_vote", 20], ["foreign_entanglements", 40], ["green_energy", -20], ["marijuana", 40], ["stimulus", -40]]],
  ["rick_santorum", [["abortion", -40], ["female_employee", 20], ["same_sex_marriage", -40], ["god", 40], ["obamacare", -40], ["social_security", 40], ["education", 40], ["epa_regulation", 40], ["crime", 20], ["gun", 20], ["wealthy_tax", -40], ["illegal_aliens", -40], ["free_trade", 40], ["american_exceptionalism", 40], ["military", 40], ["easier_vote", -20], ["foreign_entanglements", -40], ["green_energy", -20], ["marijuana", 40], ["stimulus", -40]]],
  ["donald_trump", [["abortion", -20], ["female_employee", -40], ["same_sex_marriage", -20], ["god", 40], ["obamacare", -20], ["social_security", 20], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 20], ["wealthy_tax", 20], ["illegal_aliens", -40], ["free_trade", -20], ["american_exceptionalism", 20], ["military", 40], ["easier_vote", -20], ["foreign_entanglements", 20], ["green_energy", -40], ["marijuana", 0], ["stimulus", -40]]],
  ["scott_walker", [["abortion", -40], ["female_employee", 20], ["same_sex_marriage", -20], ["god", 20], ["obamacare", -40], ["social_security", -20], ["education", 40], ["epa_regulation", 20], ["crime", 40], ["gun", 40], ["wealthy_tax", -40], ["illegal_aliens", -20], ["free_trade", 20], ["american_exceptionalism", 20], ["military", 40], ["easier_vote", -40], ["foreign_entanglements", -40], ["green_energy", -40], ["marijuana", 40], ["stimulus", -40]]],
  ["joe_biden", [["abortion", 20], ["female_employee", 20], ["same_sex_marriage", 40], ["god", -20], ["obamacare", 40], ["social_security", -20], ["education", -20], ["epa_regulation", -40], ["crime", -20], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 20], ["free_trade", -20], ["american_exceptionalism", -40], ["military", -20], ["easier_vote", 40], ["foreign_entanglements", 20], ["green_energy", 40], ["marijuana", 20], ["stimulus", 40]]],
  ["lincoln_chafee", [["abortion", 40], ["female_employee", 40], ["same_sex_marriage", 40], ["god", 0], ["obamacare", 40], ["social_security", 20], ["education", 20], ["epa_regulation", -40], ["crime", -20], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 40], ["free_trade", 40], ["american_exceptionalism", -40], ["military", 20], ["easier_vote",20], ["foreign_entanglements", 40], ["green_energy", 40], ["marijuana", -20], ["stimulus", 40]]],
  ["hillary_clinton", [["abortion", 40], ["female_employee", 40], ["same_sex_marriage", 40], ["god", -20], ["obamacare", 40], ["social_security", -40], ["education", -40], ["epa_regulation", -40], ["crime", -20], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 20], ["free_trade", -20], ["american_exceptionalism", -20], ["military", 20], ["easier_vote", 40], ["foreign_entanglements", -20], ["green_energy", 40], ["marijuana", -20], ["stimulus", 40]]],
  ["martin_OMalley", [["abortion", 40], ["female_employee", 20], ["same_sex_marriage", 40], ["god", 0], ["obamacare", 40], ["social_security", -20], ["education", -20], ["epa_regulation", -40], ["crime", -20], ["gun", -40], ["wealthy_tax", 0], ["illegal_aliens", 40], ["free_trade", 0], ["american_exceptionalism", 40], ["military", 20], ["easier_vote", 40], ["foreign_entanglements", 20], ["green_energy", 20], ["marijuana", 40], ["stimulus", 20]]],
  ["bernie_sanders", [["abortion", 40], ["female_employee", 40], ["same_sex_marriage", 40], ["god", -40], ["obamacare", 40], ["social_security", -40], ["education", -40], ["epa_regulation", -40], ["crime", -40], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 20], ["free_trade", -40], ["american_exceptionalism", -40], ["military", -40], ["easier_vote", 40], ["foreign_entanglements", 40], ["green_energy", 40], ["marijuana", -40], ["stimulus", 40]]],
  ["jill_stein", [["abortion", 40], ["female_employee", 40], ["same_sex_marriage", 40], ["god", -40], ["obamacare", 40], ["social_security", -40], ["education", -40], ["epa_regulation", -40], ["crime", -40], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 40], ["free_trade", -40], ["american_exceptionalism", -40], ["military", -40], ["easier_vote", 40], ["foreign_entanglements", 40], ["green_energy", 40], ["marijuana", -40], ["stimulus", 40]]],
  ["elizabeth_warren", [["abortion", 40], ["female_employee", 40], ["same_sex_marriage", 40], ["god", -40], ["obamacare", 40], ["social_security", -40], ["education", -20], ["epa_regulation", -40], ["crime", -20], ["gun", -40], ["wealthy_tax", 40], ["illegal_aliens", 40], ["free_trade", -20], ["american_exceptionalism", 0], ["military", -20], ["easier_vote", 40], ["foreign_entanglements", 20], ["green_energy", 40], ["marijuana", 20], ["stimulus", 40]]],
  ["james_webb", [["abortion", 40], ["female_employee", 20], ["same_sex_marriage", 20], ["god", 0], ["obamacare", 40], ["social_security", -20], ["education", -20], ["epa_regulation", -20], ["crime", 20], ["gun", 40], ["wealthy_tax", 40], ["illegal_aliens", -20], ["free_trade", -20], ["american_exceptionalism", 0], ["military", 20], ["easier_vote", 20], ["foreign_entanglements", 40], ["green_energy", 20], ["marijuana", 40], ["stimulus", 40]]],
];
/*
helper function: calculate the similarity between the candidate and the user
*/
function distance(candidate, user)
{
  var sum = 0;
  for (var i = 0; i <= user.length; ++i) {
    for (var j = 0; j <= candidate.length; ++j) {
      //if issue names are the same
      if (user[i][0] == candidate[j][0])
      {
        sum += (user[i][1]-candidate[j][1]) * (user[i][1]-candidate[j][1]);
        break;
      }
    }
  }
  return Math.sqrt(sum);
}

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