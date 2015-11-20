//@Version 0.1

var main = function() {
	$.ajax({
		url: "/geninfo",
		type: "GET",
    	dataType: "json",

    	success: function(data){
    		$('.username').innerHTML =data.username;
	     	$('.age').innerHTML =data.age;
	     	$('.occupation').innerHTML =data.occupation;
	     	$('.gender').innerHTML =data.gender;
	    },
	    error: function(){
	      console.log("direction error");
	    }
	});

	$('.ReVote').click(function() {
		window.location.href = "survey.html";
	});
}


$(document).ready(main);