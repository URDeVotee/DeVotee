var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "valentine940",
  database : "DeVotee"
});
//connection should be handled better!!
//http://stackoverflow.com/questions/14087924/cannot-enqueue-handshake-after-invoking-quit
//connection.connect();

module.exports = {
	userExistInDB: function(name, callback)
	{
		//connection.connect();
		//var errorMsg = "OK";
		var searchQuery = "select * from users WHERE username = '"+name+"'";
		connection.query(searchQuery, function (error, results, fields) {
			//console.log("query executed");
		if (error) {
		    //console.log("error1");
		    var errorMsg = "Error: internal error";
		    callback(false, errorMsg);
		}
		if (results.length  > 0) {
		    //console.log('error2');
		    var errorMsg = "Error: user exists";
		    callback(false, errorMsg);
		}
		else{
			//console.log("OK2");
			var msg = "OK";
			callback(true, msg);
		}
		
		//connection.end();
		});
	},

	insertUser: function(name, pwd, profilepic)
	{
		//connection.connect();
		var insertQuery = "INSERT INTO users (username, password, profilePic) VALUES (?, ?, ?)";
		connection.query(insertQuery, [name, pwd, profilepic], function(error, results, fields){
			if (!error)
				console.log("OK");
			else
				console.log(error);
		});
		//connection.end();
	},

	//check if the login username matches the password. If match, return the user data.
	checkLogin: function(name, pwd, callback)
	{
		var checkQuery = "SELECT * FROM users WHERE username = ? and password = ?";
		connection.query(checkQuery, [name, pwd], function (error, results, fields){
			if (error){
				console.log("connection error");
				callback(false, "Error");
			}
			if (results.length > 0){
				var successMsg = "OK";
				callback(true, results);
				console.log(successMsg);
			} else {
				console.log("Error");
				callback(false, "Error");
			}
		});
	},

	insertGenInfo: function(name, age, gender, occupation)
	{

		var query = "INSERT INTO gen_info (username, age, gender, occupation) VALUE (?, ?, ?, ?)";
		connection.query(query, [name, age, gender, occupation], function (error, results, fields){
			if (error) 
			{
				console.log(error);
			}

		});
	},

	checkGenInfo: function(name, callback)
	{
		var query = "SELECT username FROM gen_info WHERE username = ?";
		connection.query(query, [name], function (error, results, fields){
			if (error){
				console.log(error);
			}
			if (results.length > 0){
				callback("exists");
			} else{
				callback("notExists");
			}
		});
	},

	updateGeninfo: function(name, age, gender, occupation)
	{

		var query = "UPDATE gen_info SET age=?, gender=?, occupation=? WHERE username=?";
		connection.query(query, [age, gender, occupation, name], function (error, results, fields){
			if (error) 
			{
				console.log(error);
			}

		});
	},

	getGeninfo: function(name, callback)
	{
		var query = "SELECT * FROM gen_info WHERE username=?";
		connection.query(query, [name], function (error, results, fields){
			if (error){
				console.log(error);
				callback("error");
			}
			if (results.length > 0){
				callback(results);
			}
			else {
				callback("notExists");
			}
		});
	},

	insertUserScore: function(name, score)
	{
		var query = "INSERT INTO userScore (username, score) VALUE (?, ?)";
		connection.query(query, [name, score], function (error, results, fields){
			if (error){
				console.log(error);
			}
		});
	},

	getUserScore: function(name, callback)
	{
		var query = "SELECT score FROM userScore WHERE username = ?";
		connection.query(query, [name], function(error, results, fields){
			if (error){
				console.log(error);
				callback("error");
			}
			if (results.length > 0){
				console.log(results[0]);
				callback(results[0]);
			}
			else {
				callback("notExists");
			}
		});
	},

	updateUserScore: function(name, score)
	{
		var query = "UPDATE userScore SET score = ? WHERE username = ?";
		connection.query(query, [score, name], function (error, results, fields){
			if (error){
				console.log(error);
			}
		});
	}
	// updateUserData: function(oldname, newname, newpwd)
	// {
	// 	var updateQuery = "UPDATE users SET username = ?, password = ? WHERE username = ?";
	// 	connection.query(updateQuery, [newname, newpwd, oldname], function (error, results, fields){

	// 	});
	// }
};