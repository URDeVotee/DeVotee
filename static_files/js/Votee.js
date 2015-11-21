//@Version 0.1

var main = function() {
	infoquery();

	$('.ReVote').click(function() {
		window.location.href = "survey.html";
	});

	$('.Abstain').click(function() {
		$.ajax({
		    url: "users/logout",
		    type: "GET",
		    dataType: "json",

		    success: function(data){
		      if (typeof data.redirect == 'string'){
		      	document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
		        window.location = data.redirect;
		    }
		      else
		        console.log("not a string");
		    },
		    error: function(){
		      console.log("direction error");
		    }
		});
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