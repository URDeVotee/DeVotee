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
  ["Jeb Bush", "Republican", "FL Governor", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -20], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", 0], ["education", 40], ["EPA REGULATION", -40], ["CRIME", 40], ["GUN OWNERSHIP", 20], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", -20], ["MILITARY", 40], ["easier_vote", -40], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", -20], ["MARIJUANA", 40], ["STIMULUS", -20]]],
  ["Ben Carson", "Republican", "", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -20], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", 0], ["education", 40], ["EPA REGULATION", -20], ["CRIME", -20], ["GUN OWNERSHIP", 20], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", -40], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 20], ["easier_vote", 0], ["FOREIGN ENTANGLE", 0], ["GREEN ENERGY", -20], ["MARIJUANA", -20], ["STIMULUS", 40]]],
  ["Chris Christie", "Republican", "", [["ABORTION", -20], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", 20], ["GOD", -20], ["OBAMACARE", 20], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 0], ["CRIME", 20], ["GUN OWNERSHIP", -20], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", 0], ["MILITARY", 40], ["easier_vote", 20], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", 40], ["MARIJUANA", -20], ["STIMULUS", -40]]],
  ["Ted Cruz", "Republican", "", [["ABORTION", -40], ["FEMALE EMPLOYEE", 0], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", -40], ["SOCIAL SECURITY", 40], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -20], ["ILLEGAL ALIENS", -40], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 40], ["easier_vote", 0], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", -40], ["MARIJUANA", -20], ["STIMULUS", -40]]],
  ["Carly Florina", "Republican", "", [["ABORTION", -20], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", -20], ["GOD", 0], ["OBAMACARE", -40], ["SOCIAL SECURITY", 0], ["education", 20], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 20], ["MILITARY", 40], ["easier_vote", 20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -20], ["MARIJUANA", 20], ["STIMULUS", -40]]],
  ["Jim Glimore", "Republican", "VA Governor", [["ABORTION", 20], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", 20], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 20], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", -20], ["MILITARY", 40], ["easier_vote", 0], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -20], ["MARIJUANA", 20], ["STIMULUS", 20]]],
  ["Lindsey Graham", "Republican", "Sr Senator", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 40], ["easier_vote", 20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -40], ["MARIJUANA", 40], ["STIMULUS", -20]]],
  ["Mike Huckabee", "Republican", "Former AR Governor", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", 20], ["education", 20], ["EPA REGULATION", -20], ["CRIME", 20], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -20], ["ILLEGAL ALIENS", -20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 20], ["easier_vote", -40], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -20], ["MARIJUANA", 20], ["STIMULUS", -20]]],
  ["Bobby Jindal", "Republican", "Governor", [["ABORTION", -40], ["FEMALE EMPLOYEE", -40], ["SAME-SEX MARRIAGE", -40], ["GOD", 20], ["OBAMACARE", -40], ["SOCIAL SECURITY", 0], ["education", 40], ["EPA REGULATION", 0], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -40], ["FREE TRADE", -40], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 20], ["easier_vote", 20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -40], ["MARIJUANA", 20], ["STIMULUS", -20]]],
  ["John Kasich", "Republican", "Governor", [["ABORTION", -20], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", 20], ["SOCIAL SECURITY", 40], ["education", 20], ["EPA REGULATION", 0], ["CRIME", -40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", 0], ["MILITARY", -20], ["easier_vote", 20], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", 0], ["MARIJUANA", 20], ["STIMULUS", 0]]],
  ["Sarah Palin", "Republican", "Former Nominee for Vice President", [["ABORTION", -20], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", -20], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", -20], ["education", 20], ["EPA REGULATION", 40], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -20], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", 0], ["MILITARY", 40], ["easier_vote", 40], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", -20], ["MARIJUANA", 20], ["STIMULUS", 40]]],
  ["George Pataki", "Republican", "NY Governor", [["ABORTION", 0], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", 40], ["GOD", 20], ["OBAMACARE", -20], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", -20], ["CRIME", 40], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", 20], ["MILITARY", 40], ["easier_vote", 20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", 20], ["MARIJUANA", -20], ["STIMULUS", -40]]],
  ["Rand Paul", "Republican", "", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -20], ["GOD", 20], ["OBAMACARE", -40], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 40], ["CRIME", -40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", -20], ["MILITARY", -20], ["easier_vote", 20], ["FOREIGN ENTANGLE", 20], ["GREEN ENERGY", -40], ["MARIJUANA", -40], ["STIMULUS", -20]]],
  ["Rick Perry", "Republican", "TX Governor", [["ABORTION", -40], ["FEMALE EMPLOYEE", 0], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", -40], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", -20], ["MILITARY", 40], ["easier_vote", -20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -20], ["MARIJUANA", 20], ["STIMULUS", -40]]],
  ["Marco Rubio", "Republican", "", [["ABORTION", -40], ["FEMALE EMPLOYEE", -20], ["SAME-SEX MARRIAGE", -20], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", -20], ["education", 40], ["EPA REGULATION", 40], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", 20], ["MILITARY", 40], ["easier_vote", 20], ["FOREIGN ENTANGLE", 40], ["GREEN ENERGY", -20], ["MARIJUANA", 40], ["STIMULUS", -40]]],
  ["Rick Santorum", "Republican", "Jr Senator (PA)", [["ABORTION", -40], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", -40], ["GOD", 40], ["OBAMACARE", -40], ["SOCIAL SECURITY", 40], ["education", 40], ["EPA REGULATION", 40], ["CRIME", 20], ["GUN OWNERSHIP", 20], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -40], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 40], ["easier_vote", -20], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -20], ["MARIJUANA", 40], ["STIMULUS", -40]]],
  ["Donald Trump", "Republican", "2000 Reform Primary Challenger for President", [["ABORTION", -20], ["FEMALE EMPLOYEE", -40], ["SAME-SEX MARRIAGE", -20], ["GOD", 40], ["OBAMACARE", -20], ["SOCIAL SECURITY", 20], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 20], ["WEALTHY TAX", 20], ["ILLEGAL ALIENS", -40], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 20], ["MILITARY", 40], ["easier_vote", -20], ["FOREIGN ENTANGLE", 20], ["GREEN ENERGY", -40], ["MARIJUANA", 0], ["STIMULUS", -40]]],
  ["Scott Walker", "Republican", "", [["ABORTION", -40], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", -20], ["GOD", 20], ["OBAMACARE", -40], ["SOCIAL SECURITY", -20], ["education", 40], ["EPA REGULATION", 20], ["CRIME", 40], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", -40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", 20], ["AMERICAN EXCEPTIONAL", 20], ["MILITARY", 40], ["easier_vote", -40], ["FOREIGN ENTANGLE", -40], ["GREEN ENERGY", -40], ["MARIJUANA", 40], ["STIMULUS", -40]]],
  ["Joe Biden", "Democratic", "Vice President", [["ABORTION", 20], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", 40], ["GOD", -20], ["OBAMACARE", 40], ["SOCIAL SECURITY", -20], ["education", -20], ["EPA REGULATION", -40], ["CRIME", -20], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", -40], ["MILITARY", -20], ["easier_vote", 40], ["FOREIGN ENTANGLE", 20], ["GREEN ENERGY", 40], ["MARIJUANA", 20], ["STIMULUS", 40]]],
  ["Lincoln Chafee", "Democratic", "Independent RI Governor", [["ABORTION", 40], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", 40], ["GOD", 0], ["OBAMACARE", 40], ["SOCIAL SECURITY", 20], ["education", 20], ["EPA REGULATION", -40], ["CRIME", -20], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 40], ["FREE TRADE", 40], ["AMERICAN EXCEPTIONAL", -40], ["MILITARY", 20], ["easier_vote",20], ["FOREIGN ENTANGLE", 40], ["GREEN ENERGY", 40], ["MARIJUANA", -20], ["STIMULUS", 40]]],
  ["Hillary Clinton", "Democratic", "Secretary of State", [["ABORTION", 40], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", 40], ["GOD", -20], ["OBAMACARE", 40], ["SOCIAL SECURITY", -40], ["education", -40], ["EPA REGULATION", -40], ["CRIME", -20], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", -20], ["MILITARY", 20], ["easier_vote", 40], ["FOREIGN ENTANGLE", -20], ["GREEN ENERGY", 40], ["MARIJUANA", -20], ["STIMULUS", 40]]],
  ["Martin O\'Malley", "Democratic", "", [["ABORTION", 40], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", 40], ["GOD", 0], ["OBAMACARE", 40], ["SOCIAL SECURITY", -20], ["education", -20], ["EPA REGULATION", -40], ["CRIME", -20], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 0], ["ILLEGAL ALIENS", 40], ["FREE TRADE", 0], ["AMERICAN EXCEPTIONAL", 40], ["MILITARY", 20], ["easier_vote", 40], ["FOREIGN ENTANGLE", 20], ["GREEN ENERGY", 20], ["MARIJUANA", 40], ["STIMULUS", 20]]],
  ["Bernie Sanders", "Democratic", "Socialist Jr Senator", [["ABORTION", 40], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", 40], ["GOD", -40], ["OBAMACARE", 40], ["SOCIAL SECURITY", -40], ["education", -40], ["EPA REGULATION", -40], ["CRIME", -40], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 20], ["FREE TRADE", -40], ["AMERICAN EXCEPTIONAL", -40], ["MILITARY", -40], ["easier_vote", 40], ["FOREIGN ENTANGLE", 40], ["GREEN ENERGY", 40], ["MARIJUANA", -40], ["STIMULUS", 40]]],
  ["Jill Stein", "Green Party", "Green Party presidential nominee", [["ABORTION", 40], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", 40], ["GOD", -40], ["OBAMACARE", 40], ["SOCIAL SECURITY", -40], ["education", -40], ["EPA REGULATION", -40], ["CRIME", -40], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 40], ["FREE TRADE", -40], ["AMERICAN EXCEPTIONAL", -40], ["MILITARY", -40], ["easier_vote", 40], ["FOREIGN ENTANGLE", 40], ["GREEN ENERGY", 40], ["MARIJUANA", -40], ["STIMULUS", 40]]],
  ["Elizabeth Warren", "Democratic", "", [["ABORTION", 40], ["FEMALE EMPLOYEE", 40], ["SAME-SEX MARRIAGE", 40], ["GOD", -40], ["OBAMACARE", 40], ["SOCIAL SECURITY", -40], ["education", -20], ["EPA REGULATION", -40], ["CRIME", -20], ["GUN OWNERSHIP", -40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", 40], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 0], ["MILITARY", -20], ["easier_vote", 40], ["FOREIGN ENTANGLE", 20], ["GREEN ENERGY", 40], ["MARIJUANA", 20], ["STIMULUS", 40]]],
  ["James Webb", "Democratic", "", [["ABORTION", 40], ["FEMALE EMPLOYEE", 20], ["SAME-SEX MARRIAGE", 20], ["GOD", 0], ["OBAMACARE", 40], ["SOCIAL SECURITY", -20], ["education", -20], ["EPA REGULATION", -20], ["CRIME", 20], ["GUN OWNERSHIP", 40], ["WEALTHY TAX", 40], ["ILLEGAL ALIENS", -20], ["FREE TRADE", -20], ["AMERICAN EXCEPTIONAL", 0], ["MILITARY", 20], ["easier_vote", 20], ["FOREIGN ENTANGLE", 40], ["GREEN ENERGY", 20], ["MARIJUANA", 40], ["STIMULUS", 40]]],
];
/*
helper function: calculate the similarity between the candidate and the user
*/
function distance(candidate, user)
{
  var sum = 0;
  //console.log(candidate[0][0]);
  for (var i = 0; i < user.length; ++i) {
    for (var j = 0; j < candidate.length; ++j) {
      //if issue names are the same
      //console.log(user[i][0]);
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

app.get('/getCandidate', function (req, res){
  var username = req.mySession.username;
  db.getUserScore(username, function(userScore){
    userScore = JSON.stringify(userScore);
    userScore = JSON.parse(userScore);
    //console.log(JSON.parse(userScore.score));
    userScore = JSON.parse(userScore.score);
    console.log(userScore[0][0]);
    var result = [];
  var min = [9999999, 0];

  for (var i = 0; i < candidates.length; ++i)
  {
    var tempDist = distance(candidates[i][3], userScore);
    if (tempDist < min){
      min[0] = tempDist;
      min[1] = i;
    }
  }
  var bestCandidates = min[1];
  var candidateScore = candidates[bestCandidates][3];
  //construct the result
  for (var i = 0; i < userScore.length; ++i)
  {
    for (var j = 0; j < candidateScore.length; ++j)
    {
      if (userScore[i][0] == candidateScore[j][0]){
        var temp = [userScore[i][0], candidateScore[j][1], userScore[i][1]];
        result.push(temp);
        break;
      }
    }
  }
  //sort the result by the difference of the score
  result.sort(function (tuple1, tuple2){
    var diff1 = Math.abs(tuple1[1]-tuple1[2]);
    var diff2 = Math.abs(tuple2[1]-tuple2[2]);
    if (diff1 > diff2)
      return 1;
    else if (diff1 == diff2)
      return 0;
    else if (diff1 < diff2)
      return -1;
  });

  result.slice(3, 2);

  var cand = {
    name:candidates[bestCandidates][0],
    party:candidates[bestCandidates][1],
    position:candidates[bestCandidates][2],
    score:result
  };

  console.log(cand);
  res.send(cand);
   });
});

app.post('/vote/submit', function (req, res){
  var postbody = req.body;
  console.log(postbody.data);
  var result = JSON.stringify(postbody.data);
  console.log(result);
  var username = req.mySession.username;

  db.insertUserScore(username, result);

  res.send({redirect: '/Votee.html'});
});
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});