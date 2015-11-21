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
    		$(".username p").html(data.username);
	     	$(".age p").html(data.age);
	     	$(".occupation p").html(data.occupation);
	     	$(".gender p").html(data.gender);
	    },
	    error: function(){
	      console.log("direction error");
	    }
	});
}

$(document).ready(main);