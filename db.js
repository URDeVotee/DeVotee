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

	// updateUserData: function(oldname, newname, newpwd)
	// {
	// 	var updateQuery = "UPDATE users SET username = ?, password = ? WHERE username = ?";
	// 	connection.query(updateQuery, [newname, newpwd, oldname], function (error, results, fields){

	// 	});
	// }
};