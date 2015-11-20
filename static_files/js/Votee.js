//@Version 0.1

var main = function() {
	infoquery();

	$('.ReVote').click(function() {
		window.location.href = "survey.html";
	});
}

function infoquery(){
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
}

$(document).ready(main);